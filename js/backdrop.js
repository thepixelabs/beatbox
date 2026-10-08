/* Dubdeck backdrop: a ridgeline plot. Rows of waveform stacked front to back,
   each row hiding the one behind it, drifting slowly like a waterfall. */
(() => {
  'use strict';

  const canvas = document.getElementById('ridge');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  // Colours come from the page's theme tokens, so the backdrop follows light/dark.
  let PAPER = '#E9E2D0', INK = '26,24,21', SIGNAL = '232,84,42';
  const rgbOf = (hex) => {
    const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
    return m ? `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}` : null;
  };
  function readTheme() {
    const cs = getComputedStyle(document.documentElement);
    PAPER = cs.getPropertyValue('--paper').trim() || PAPER;
    INK = rgbOf(cs.getPropertyValue('--ink')) || INK;
    SIGNAL = rgbOf(cs.getPropertyValue('--signal')) || SIGNAL;
  }
  readTheme();

  const hash = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };
  const vnoise = (x) => {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return hash(i) * (1 - u) + hash(i + 1) * u;
  };

  const pointer = { x: 0.5, tx: 0.5 };
  addEventListener('pointermove', (e) => { pointer.tx = e.clientX / innerWidth; }, { passive: true });

  let W = 0, H = 0, rows = 0, cols = 0;

  function resize() {
    W = innerWidth; H = innerHeight;
    const narrow = W < 640;
    rows = narrow ? 22 : 34;
    cols = narrow ? 70 : 140;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    draw(reduced ? 6 : performance.now() / 1000);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const top = H * 0.42, bottom = H * 0.97;
    const gap = (bottom - top) / rows;
    const peak = gap * 5.2;
    const focus = 0.5 + (pointer.x - 0.5) * 0.35;      // the twin peaks lean toward the pointer

    for (let r = 0; r < rows; r++) {
      const depth = r / (rows - 1);                    // 0 back, 1 front
      const baseY = top + r * gap;
      const drift = t * 0.35 - r * 0.42;               // rows trail the one in front
      const amp = peak * (0.55 + 0.45 * depth);

      ctx.beginPath();
      ctx.moveTo(-4, H + 4);
      for (let c = 0; c <= cols; c++) {
        const u = c / cols;
        const env = Math.max(Math.exp(-Math.pow((u - focus + 0.30) / 0.13, 2)), 0.85 * Math.exp(-Math.pow((u - focus - 0.31) / 0.12, 2)));
        const n = vnoise(u * 9 + drift) * 0.7 + vnoise(u * 23 - drift * 1.7) * 0.3;
        const spike = Math.pow(Math.max(0, n - 0.35), 1.4);
        ctx.lineTo(u * W, baseY - env * spike * amp * 1.6 - 0.5 * Math.sin(u * 40 + drift) * (1 - env));
      }
      ctx.lineTo(W + 4, H + 4);
      ctx.closePath();
      ctx.fillStyle = PAPER;
      ctx.fill();

      const front = r === rows - 1;
      ctx.lineWidth = front ? 2.5 : 1 + depth * 0.9;
      ctx.strokeStyle = front ? `rgb(${SIGNAL})` : `rgb(${INK})`;
      ctx.globalAlpha = front ? 0.9 : 0.08 + 0.32 * depth * depth;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  resize();
  addEventListener('resize', resize, { passive: true });
  addEventListener('themechange', () => { readTheme(); draw(reduced ? 6 : performance.now() / 1000); });
  if (reduced) return;

  let last = 0;
  const tick = (ts) => {
    requestAnimationFrame(tick);
    if (document.hidden || ts - last < 33) return;   // ~30 fps is plenty for a slow drift
    last = ts;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    draw(ts / 1000);
  };
  requestAnimationFrame(tick);
})();
