# Third-party notices

Dubdeck redistributes the components below. Each is governed by its own
licence; nothing in Dubdeck's own MIT licence (`LICENSE`) overrides them. The
MIT licence does not apply to any file listed here.

---

## Mediabunny

- **Used for:** reading audio files, driving the encoder, and writing MP3 files.
- **Version redistributed:** 1.61.0
- **File in this repository:** `vendor/mediabunny.min.mjs`
  (SHA-256 `fa696c53494b6b09a8b310ec51e3c44a59e79513234fb832255a38c686162009`)
- **Licence:** Mozilla Public License 2.0, full text at `vendor/mediabunny.LICENSE`
- **Copyright:** (c) 2026-present, Vanilagy and contributors
- **Project home:** <https://mediabunny.dev>
- **Source code for this exact version:**
  <https://github.com/Vanilagy/mediabunny/tree/v1.61.0>
- **Modifications:** none. The file is byte-identical to
  `dist/bundles/mediabunny.min.mjs` in the npm package `mediabunny@1.61.0`.

---

## @mediabunny/mp3-encoder

- **Used for:** MP3 encoding, only when the browser has no MP3 encoder of its own
  (`js/app.js` checks `canEncodeAudio('mp3')` first).
- **Version redistributed:** 1.61.0
- **File in this repository:** `vendor/mediabunny-mp3-encoder.min.mjs`
  (SHA-256 `44f1dcccaa76600f981d85de605ab4dce7e5c25b764d11295a6ce8ee506906ee`)
- **Licence:** Mozilla Public License 2.0, full text at
  `vendor/mediabunny-mp3-encoder.LICENSE`. The modified file stays under MPL-2.0.
- **Copyright:** (c) 2026-present, Vanilagy and contributors
- **Project home:** <https://mediabunny.dev/guide/extensions/mp3-encoder>
- **Source code for this exact version:**
  <https://github.com/Vanilagy/mediabunny/tree/v1.61.0/packages/mp3-encoder>
  (TypeScript sources, the C bridge `src/lame-bridge.c`, LAME headers in `lib/`,
  and the build instructions in its `README.md`). Use the GitHub tag rather than
  the npm tarball: the tarball's `src/` imports `shared/mp3-misc`, which the
  tarball does not include.

### What this file contains

The file is a minified JavaScript bundle. It contains three things: the
encoder's JavaScript (MPL-2.0), the source of a Web Worker stored as a
string, and inside that string a SIMD WebAssembly build of LAME 3.100 stored
as base64. When encoding starts, the encoder makes a Blob from the worker
string, creates a Worker from a `blob:` URL, and the worker instantiates the
WebAssembly. Nothing is downloaded. The page's Content-Security-Policy
(`connect-src 'self'`) would block any request to another origin.

### Modifications

**One.** The bare module specifier `from"mediabunny"` was rewritten to
`from"./mediabunny.min.mjs"` so the file loads in a browser without a bundler
or import map. No other byte differs. To reproduce the file exactly from the npm
package:

```sh
npm pack @mediabunny/mp3-encoder@1.61.0 && tar -xzf mediabunny-mp3-encoder-1.61.0.tgz
sed 's#from"mediabunny"#from"./mediabunny.min.mjs"#' \
  package/dist/bundles/mediabunny-mp3-encoder.min.mjs > vendor/mediabunny-mp3-encoder.min.mjs
```

The same change in the Source Code Form is the import line in
`packages/mp3-encoder/src/index.ts`:
`from 'mediabunny'` becomes `from './mediabunny.min.mjs'`.

> This notice is provided to satisfy Mozilla Public License 2.0 section 3.2:
> recipients of the Executable Form are told about the licence and where to get
> the Source Code Form. Our one modification is described above.

---

## LAME MP3 encoder (inside `vendor/mediabunny-mp3-encoder.min.mjs`)

This site uses **LAME**: <https://lame.sourceforge.io/>.

- **Version:** 3.100, compiled to WebAssembly by the Mediabunny project
  (the version string `3.100` appears in the embedded binary)
- **Licence:** GNU Library General Public License, version 2, or (at your option)
  any later version. Licence text:
  <https://www.gnu.org/licenses/old-licenses/lgpl-2.0.txt>; LAME's own copy
  is `COPYING` in the source archive below. LAME's licensing page:
  <https://lame.sourceforge.io/license.txt>
- **Copyright:** the LAME project authors (see `AUTHORS` in the source archive)
- **LAME source code, version 3.100:**
  <https://sourceforge.net/projects/lame/files/lame/3.100/lame-3.100.tar.gz/download>
- **How it was built (per the upstream README):** Emscripten,
  `CFLAGS="-DNDEBUG -DNO_STDIO -O3 -msimd128"`, with `--disable-shared`,
  `--disable-decoder`, `--disable-frontend` and `--disable-analyzer-hooks`. The
  decoder is disabled, so LAME's mpglib decoder, which is under the GPL, is not
  part of this build. Then `src/lame-bridge.c` is linked against `libmp3lame.a`.
- **Modifications to LAME by Dubdeck:** none. We did not rebuild or change the
  WebAssembly. We have not independently confirmed whether the upstream build
  patched LAME's source.

### Replacing the encoder (including with a modified LAME)

The LAME build is not compiled into Dubdeck's own code. It is one separate
file, `vendor/mediabunny-mp3-encoder.min.mjs`. The browser loads it at runtime,
and `js/app.js` imports exactly one function from it, `registerMp3Encoder()`.
To run Dubdeck with a different or modified LAME:

1. Get the LAME 3.100 source (link above) and make any changes you want.
2. Build `libmp3lame.a` with Emscripten using the flags above.
3. Check out <https://github.com/Vanilagy/mediabunny/tree/v1.61.0>, put the
   library at `packages/mp3-encoder/build/libmp3lame.a`, compile the bridge to
   `build/lame.js` with the `emcc` command in `packages/mp3-encoder/README.md`,
   then run `npm run build` in the repository root.
4. Apply the one-line import rewrite shown in **Modifications** above to the
   resulting `dist/bundles/mediabunny-mp3-encoder.min.mjs`.
5. Replace `vendor/mediabunny-mp3-encoder.min.mjs` with your file and serve the
   site locally (`npm run serve`). On the hosted site you can do the same with
   your browser's local-override feature for that one URL.

Your file must export `registerMp3Encoder()` and stay a single file: the page's
security policy allows `blob:` workers and WebAssembly compiled from
same-origin script, but it does not allow loading code from other origins.
The upstream build process works under this policy. Any encoder that registers
itself with Mediabunny 1.61.0's `registerEncoder` API can be used the same way.

---

## Archivo

- **Used for:** display, headings and interface typeface.
- **File:** `assets/fonts/archivo-latin-wdth.woff2`
- **Licence:** SIL Open Font License 1.1, full text at `assets/fonts/Archivo-OFL.txt`
- **Copyright:** 2020 The Archivo Project Authors
- **Source:** <https://github.com/Omnibus-Type/Archivo>

Latin-subset variable font (weight and width axes), served as distributed by
Fontsource. The glyph outlines are unmodified.

## IBM Plex Mono

- **Used for:** numeric readouts, labels and interface chrome.
- **File:** `assets/fonts/ibm-plex-mono-latin-500.woff2`
- **Licence:** SIL Open Font License 1.1, full text at `assets/fonts/IBMPlexMono-OFL.txt`
- **Copyright:** 2017 IBM Corp. with Reserved Font Name "Plex"
- **Source:** <https://github.com/IBM/plex>

Latin-subset Medium (500) weight, served as distributed by Fontsource. The
glyph outlines are unmodified.

---

## Shared with Shrinkray

`tools/serve.mjs` is adapted from
[Shrinkray](https://github.com/thepixelabs/shrinkray), which has the same
copyright holder (PixeLabs) and is also MIT-licensed. They are covered by this
repository's `LICENSE`.

---

## Build-time only, not redistributed

`node_modules/` (from `package.json`) is used only to refresh the files in
`vendor/`. It is not committed and not served.

---

## Codecs

- **MP3 encoding** uses the LAME build described above. It runs only in the
  visitor's browser. No patent licence of any kind is granted by Dubdeck, its
  MIT licence or the operator.
- **OGG (Vorbis) and Opus decoding** uses the browser's built-in WebCodecs
  decoders. Dubdeck does not contain, redistribute or implement a Vorbis or
  Opus decoder. Mediabunny only reads the Ogg container and passes the packets
  to the browser. The browser vendor supplies and licenses those decoders.
- **WAV and AIFF** are uncompressed PCM. AIFF is rewrapped as WAV in memory by
  Dubdeck's own code (`js/aiff.js`, MIT).
