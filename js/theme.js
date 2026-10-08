/* Theme: system (default), light or dark. Runs in <head> so the saved choice is
   applied before first paint. "system" leaves data-theme unset and lets the
   prefers-color-scheme media query in the CSS decide. */
(() => {
  'use strict';
  const KEY = 'bb-theme';
  const ORDER = ['system', 'light', 'dark'];
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');

  const saved = () => {
    try { const v = localStorage.getItem(KEY); return ORDER.includes(v) ? v : 'system'; } catch (e) { return 'system'; }
  };

  let pref = saved();

  function apply() {
    root.dataset.themePref = pref;
    if (pref === 'system') delete root.dataset.theme; else root.dataset.theme = pref;
    if (meta) meta.content = getComputedStyle(root).getPropertyValue('--paper').trim() || meta.content;
    window.dispatchEvent(new Event('themechange'));
  }

  function label(btn) {
    const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    btn.setAttribute('aria-label', `Theme: ${pref}. Switch to ${next}.`);
    btn.title = `Theme: ${pref} (click for ${next})`;
  }

  apply();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (pref === 'system') apply(); });

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme');
    if (!btn) return;
    label(btn);
    btn.addEventListener('click', () => {
      pref = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
      try { if (pref === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, pref); } catch (e) { /* private mode */ }
      apply();
      label(btn);
    });
  });
})();
