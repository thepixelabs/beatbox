# Beatbox

WAV, AIFF and OGG to MP3, in the browser.

320 kbps MP3 (the format's maximum) converted entirely in the browser with [Mediabunny](https://mediabunny.dev) + its LAME WASM encoder. Static page, no server, no upload.

    npm install     # only needed to refresh vendor/ copies
    npm run serve   # http://localhost:8789

Vendored: `vendor/mediabunny.min.mjs`, `vendor/mediabunny-mp3-encoder.min.mjs` (import path rewritten to the local mediabunny).
