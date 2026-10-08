import {
  ALL_FORMATS, BlobSource, BufferTarget, Conversion, Input, Mp3OutputFormat, Output, canEncodeAudio,
} from '../vendor/mediabunny.min.mjs';
import { aiffToWav, isAiff } from './aiff.js';
import { initCounter, bumpCounter } from './counter.js?v=3';
import { registerMp3Encoder } from '../vendor/mediabunny-mp3-encoder.min.mjs';

const MAX_BITRATE = 320_000;
const LIMIT_BYTES = 16_000_000 * 0.97;   // under 16 MB with headroom for tags/frame overhead
const MP3_BITRATES = [320, 256, 224, 192, 160, 128, 112, 96, 80, 64, 56, 48, 40, 32].map((k) => k * 1000);
let mode = 'max';

// Highest standard CBR bitrate (<= 320) whose output stays under the limit.
function fitBitrate(seconds) {
  const budget = (LIMIT_BYTES * 8) / seconds;
  return MP3_BITRATES.find((b) => b <= budget) ?? null;
}

for (const btn of document.querySelectorAll('#mode .mode')) {
  btn.onclick = () => {
    mode = btn.dataset.mode;
    for (const b of document.querySelectorAll('#mode .mode')) b.setAttribute('aria-checked', b === btn);
  };
}
const drop = document.getElementById('drop');
const file = document.getElementById('file');
const list = document.getElementById('list');
const stage = document.querySelector('.cassette');
initCounter();

// Browsers have no native MP3 encoder; fall back to the bundled LAME WASM.
const ready = canEncodeAudio('mp3').then((ok) => { if (!ok) registerMp3Encoder(); });

file.onchange = () => { run([...file.files]); file.value = ''; };
drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
drop.ondragleave = () => drop.classList.remove('over');
drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('over'); run([...e.dataTransfer.files]); };
// A file dropped anywhere on the page converts, instead of the browser opening it.
let depth = 0;
addEventListener('dragenter', (e) => { e.preventDefault(); depth++; drop.classList.add('over'); });
addEventListener('dragleave', () => { if (--depth <= 0) { depth = 0; drop.classList.remove('over'); } });
addEventListener('dragover', (e) => e.preventDefault());
addEventListener('drop', (e) => {
  e.preventDefault(); depth = 0; drop.classList.remove('over');
  if (e.target !== drop && !drop.contains(e.target) && e.dataTransfer?.files.length) run([...e.dataTransfer.files]);
});
drop.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); file.click(); } };

const METER_CELLS = 40;
const mb = (n) => (n / 1048576).toFixed(1) + ' MB';

async function run(files) {
  await ready;
  for (const f of files) await convert(f);
}

async function convert(f) {
  const shrink = mode === 'small';
  const li = document.createElement('li');
  li.className = 'job busy';
  li.innerHTML = '<div class="row"><span class="name"></span><span class="stat">0%</span></div>' +
    '<div class="meter" role="progressbar" aria-label="Converting" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
    '<i></i>'.repeat(METER_CELLS) + '</div>';
  li.querySelector('.name').textContent = f.name;
  const stat = li.querySelector('.stat'), meter = li.querySelector('.meter');
  const cells = [...meter.children];
  const setProgress = (p) => {
    const lit = Math.round(p * METER_CELLS);
    cells.forEach((c, i) => c.className = i < lit ? 'on' : i === lit ? 'head' : '');
    meter.setAttribute('aria-valuenow', String(Math.round(p * 100)));
    stat.textContent = Math.round(p * 100) + '%';
    stage.style.setProperty('--p', p);
  };
  setProgress(0);
  list.prepend(li);
  stage.classList.add('busy');
  li.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  try {
    if (/\.(mp3|mpga)$/i.test(f.name) || f.type === 'audio/mpeg') {
      throw new Error('Already an MP3. Re-encoding an MP3 only lowers its quality, so start from your WAV or AIFF.');
    }
    const input = new Input({ source: new BlobSource((await isAiff(f)) ? await aiffToWav(f) : f), formats: ALL_FORMATS });
    const track = await input.getPrimaryAudioTrack();
    if (!track) throw new Error("No audio found in this file. Check that it's the one you meant.");
    // MP3 only supports 32/44.1/48 kHz and at most 2 channels.
    const sampleRate = [44100, 48000].includes(track.sampleRate) ? track.sampleRate : 44100;

    let bitrate = MAX_BITRATE, channels = Math.min(track.numberOfChannels, 2);
    if (shrink) {
      const fit = fitBitrate(await input.computeDuration());
      if (!fit) throw new Error('Too long to fit. Sharing size stops past roughly an hour of audio. Split the track and try again.');
      bitrate = fit;
      if (bitrate < 64_000) channels = 1;   // mono sounds better than starved stereo
    }

    const output = new Output({ format: new Mp3OutputFormat(), target: new BufferTarget() });
    const conversion = await Conversion.init({
      input, output, video: { discard: true },
      audio: { codec: 'mp3', bitrate, sampleRate, numberOfChannels: channels },
    });
    if (!conversion.isValid) throw new Error('Could not encode this file as MP3');
    conversion.onProgress = setProgress;
    await conversion.execute();

    const blob = new Blob([output.target.buffer], { type: 'audio/mpeg' });
    const name = f.name.replace(/\.[^.]+$/, '') + '.mp3';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    a.click();
    li.className = 'job ok';
    stat.textContent = `Done: ${bitrate / 1000} kbps, ${mb(blob.size)}. Download started. `;
    a.textContent = 'Save again'; stat.append(a);
    bumpCounter();
  } catch (e) {
    li.className = 'job err';
    stat.textContent = 'Failed: ' + (e?.message ?? e);
  } finally {
    if (!list.querySelector('.busy')) stage.classList.remove('busy');
  }
}
