// Mediabunny has no AIFF demuxer, so AIFF/AIFC PCM is rewrapped as an in-memory WAV.

const tag = (v, o) => String.fromCharCode(v.getUint8(o), v.getUint8(o + 1), v.getUint8(o + 2), v.getUint8(o + 3));

export async function isAiff(file) {
  const v = new DataView(await file.slice(0, 12).arrayBuffer());
  return v.byteLength === 12 && tag(v, 0) === 'FORM' && ['AIFF', 'AIFC'].includes(tag(v, 8));
}

// 80-bit IEEE extended -> number (only used for the sample rate)
function readExtended(v, o) {
  const exp = v.getUint16(o) & 0x7fff;
  const hi = v.getUint32(o + 2), lo = v.getUint32(o + 6);
  return (hi * 2 ** 32 + lo) * 2 ** (exp - 16383 - 63);
}

export async function aiffToWav(file) {
  const buf = await file.arrayBuffer();
  const v = new DataView(buf);
  let ch = 0, frames = 0, bits = 0, rate = 0, comp = 'NONE', ssnd = null;

  for (let p = 12; p + 8 <= buf.byteLength;) {
    const id = tag(v, p), size = v.getUint32(p + 4), body = p + 8;
    if (id === 'COMM') {
      ch = v.getUint16(body); frames = v.getUint32(body + 2); bits = v.getUint16(body + 6);
      rate = Math.round(readExtended(v, body + 8));
      if (size >= 22) comp = tag(v, body + 18);
    } else if (id === 'SSND') {
      const start = body + 8 + v.getUint32(body);
      ssnd = { start, end: Math.min(body + size, buf.byteLength) };
    }
    p = body + size + (size & 1);
  }
  if (!ch || !ssnd) throw new Error('Not a valid AIFF file');

  const littleEndian = comp === 'sowt';
  const isFloat = comp === 'fl32' || comp === 'FL32';
  if (!['NONE', 'twos', 'sowt', 'in24', 'in32', 'fl32', 'FL32', 'raw '].includes(comp)) {
    throw new Error(`Compressed AIFC (${comp.trim()}) isn't supported`);
  }
  if (isFloat) bits = 32;
  if (![8, 16, 24, 32].includes(bits)) throw new Error(`${bits}-bit AIFF isn't supported`);

  const bps = bits / 8;
  const len = Math.min(frames * ch * bps, ssnd.end - ssnd.start);
  const src = new Uint8Array(buf, ssnd.start, len);
  const out = new Uint8Array(44 + len);
  const o = new DataView(out.buffer);
  const w = (off, s) => { for (let i = 0; i < 4; i++) out[off + i] = s.charCodeAt(i); };
  w(0, 'RIFF'); o.setUint32(4, 36 + len, true); w(8, 'WAVE'); w(12, 'fmt ');
  o.setUint32(16, 16, true); o.setUint16(20, isFloat ? 3 : 1, true); o.setUint16(22, ch, true);
  o.setUint32(24, rate, true); o.setUint32(28, rate * ch * bps, true);
  o.setUint16(32, ch * bps, true); o.setUint16(34, bits, true);
  w(36, 'data'); o.setUint32(40, len, true);

  const data = out.subarray(44);
  if (bps === 1) {
    for (let i = 0; i < len; i++) data[i] = src[i] ^ 0x80;       // signed -> unsigned
  } else if (littleEndian) {
    data.set(src);
  } else {
    const n = len - (len % bps);
    for (let i = 0; i < n; i += bps) for (let b = 0; b < bps; b++) data[i + b] = src[i + bps - 1 - b];
  }
  return new Blob([out], { type: 'audio/wav' });
}
