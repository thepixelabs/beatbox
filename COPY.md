# Beatbox page copy

Exact strings to paste, grouped in page order. Voice: warm, direct, a little wit, producer-literate. No em or en dashes, no exclamation marks. Unit rule: "MB" is what the page shows, and the target is always written "under 16 MB".

Implementer notes:
- Remove from the current `index.html`: "Client-Side Audio Engine", "WhatsApp-Ready", "one click to a size WhatsApp will take", "Under 16 MB, fits WhatsApp", and "share on WhatsApp" in the meta description. None survive in the copy below.
- `{name}`, `{kbps}`, `{size}` in the microcopy are placeholders for the job row.
- Mode names are fixed by the product owner: **Max quality** and **Convert to sharing size**.

---

## 0. Head

**Title**
```
Beatbox | Free In-Browser WAV and AIFF to MP3 Converter
```

**Meta description** (134 characters)
```
Free WAV and AIFF to MP3 converter that runs in your browser. Get 320 kbps or an MP3 under 16 MB to send. Your file is never uploaded.
```

---

## 1. Hero

**H1 / wordmark:** `Beatbox` (unchanged)

**Hero tag**
```
In-browser audio converter
```

**Sub**
```
Turn a big WAV or AIFF into an MP3 you can actually send.
```

**Lede**
```
Drop a WAV or AIFF, get back an MP3 small enough to send. It all happens in your browser, so your file never leaves your device.
```

**Trust chips (4)**
```
Free
Nothing uploaded
WAV and AIFF
Under 16 MB option
```

---

## 2. Tool section

**Console bar, left label**
```
Start here
```

**Console bar, right label**
```
Pick a mode, then drop files
```

**Mode button 1**
- Title: `Max quality`
- Subline: `320 kbps, the best an MP3 can be`

**Mode button 2**
- Title: `Convert to sharing size`
- Subline: `Best quality that fits under 16 MB`

**Drop zone**
- Title: `Drop WAV or AIFF files here`
- Sub: `or click to choose. Several at once is fine.`
- Formats line: `WAV · AIFF · AIF · AIFC`
- Optional small print under the formats line: `Uncompressed AIFC only`

**Drop zone aria-label**
```
Choose WAV or AIFF files to convert
```

---

## 3. Which mode?

**H2**
```
Which mode?
```

**Sub**
```
Same converter, two jobs.
```

**Card 1**
- Tag: `320 kbps`
- H3: `Max quality`
- Body:
```
The best an MP3 can be. Pick it when you want the top MP3 setting and size isn't the problem, like batch-converting a folder of bounces without opening your DAW. It doesn't promise a size: past roughly 6 to 7 minutes, expect more than 16 MB.
```

**Card 2**
- Tag: `Under 16 MB`
- H3: `Convert to sharing size`
- Body:
```
Pick it when the file has to get through chat, email or a client's inbox. It finds the best quality that still fits under 16 MB, then shows you the bitrate and size. A 12 minute stereo WAV would be about 27 MB at 320 kbps. Here it came out at 160 kbps and 13.7 MB.
```

---

## 4. How it works and privacy

**H2**
```
How it works
```

**Sub**
```
Three steps, no account.
```

**Step 01**
- H3: `Pick a mode`
- Body: `Max quality for 320 kbps, or Convert to sharing size for an MP3 under 16 MB.`

**Step 02**
- H3: `Drop your files`
- Body: `WAV or AIFF, one or several. The conversion runs on your device.`

**Step 03**
- H3: `Save the MP3s`
- Body: `Each file downloads automatically, and the page shows its bitrate and size.`

**Privacy block**
- H3: `Your file never leaves your device`
- Body:
```
No account, no upload, no cost. The conversion runs in your browser, so an unreleased bounce never lands on someone else's server.
```
- Proof line (styled as the "check it yourself" callout):
```
Check it yourself: open your browser's network tab, convert a file, and watch. The page's security policy blocks connections to other sites.
```

---

## 5. Good to know (trust block)

**H2**
```
Good to know
```

**Sub**
```
What this does well, and when to reach for something else.
```

**Items (render as a visible list, not collapsed)**

1. **MP3 is lossy.**
```
Great for sending and listening. Not a mastering, archival or stems format. If the other person will mix, master or process it, send the WAV or the stems.
```

2. **320 is the MP3 ceiling, not WAV quality.**
```
Keep your WAV as the master. Don't re-encode an MP3 you'll keep editing.
```

3. **Max quality doesn't promise a size.**
```
320 kbps is a lot of MP3 per minute. Past roughly 6 to 7 minutes it goes over 16 MB, so use Convert to sharing size when the limit matters.
```

4. **Sharing size has a ceiling too.**
```
Past roughly an hour of audio it stops and tells you why.
```

5. **Compressed AIFC isn't supported.**
```
Standard WAV and AIFF are fine.
```

6. **Tags and artwork.**
```
AIFF tags and artwork are dropped. We haven't verified what WAV tags carry over, so re-tag after converting.
```

7. **Browsers.**
```
We've tested in Chrome.
```

---

## 6. FAQ (7 questions)

**H2**
```
Questions
```

**Q1. Is my file uploaded?**
```
No. The conversion runs in your browser, on your device. There's no account and nothing is sent anywhere. Don't take our word for it: open your browser's network tab, convert a file, and watch. The page's security policy also blocks connections to other sites.
```

**Q2. How does sharing size work, and what is under 16 MB for?**
```
It looks for the best quality that still fits under 16 MB, then shows you the bitrate and size when each file is done. A 12 minute stereo WAV would be about 27 MB at 320 kbps. Here it came out at 160 kbps and 13.7 MB. If it has to go below 64 kbps, it switches to mono. The 16 MB target is for files you want to send: chat, email, a client's inbox. WhatsApp is one place people share files. We can't speak for any app's limit, so check yours.
```

**Q3. Is 320 kbps the same as my WAV?**
```
No. 320 kbps is the most an MP3 can offer, but MP3 is lossy: a smaller file made by discarding audio data, not a copy of your WAV. Keep the WAV as your master, and send it or the stems when someone needs to mix, master or process the track.
```

**Q4. What files work?**
```
WAV, AIFF, AIF and AIFC, as PCM at 8, 16, 24 or 32-bit, plus 32-bit float. No re-export needed. Compressed AIFC isn't supported. Sample rate and channels are handled for you: 44.1 and 48 kHz are kept, other rates like 96 kHz are resampled to 44.1, and anything over two channels is downmixed to stereo.
```

**Q5. What if it says the file is too long?**
```
In sharing size mode, past roughly an hour of audio it stops with an error instead of handing you something that won't fit. Split the track into parts and run them again. Max quality never promises a size, and at 320 kbps a track over roughly 6 to 7 minutes will be bigger than 16 MB. We haven't tested a maximum file size, so we won't quote one.
```

**Q6. Do tags and artwork survive?**
```
AIFF tags and artwork are dropped. We haven't verified what happens to WAV tags, so assume nothing and re-tag after converting.
```

**Q7. Which browsers does it work in?**
```
We've tested in Chrome. Other modern browsers may work, but we haven't verified them, so we won't say they do.
```

---

## 7. Mediabunny thanks (light edit)

**H2** (unchanged)
```
It's all thanks to Mediabunny
```

**Paragraph 1** (edit: "your WAV or AIFF" in place of "your audio")
```
Beatbox is built on top of Mediabunny, a free, open-source library by Vanilagy that handles the genuinely hard parts: reading your WAV or AIFF, driving the encoder, and writing a proper MP3 back out. The MP3 encoding itself is Mediabunny's LAME build, running as WebAssembly.
```

**Paragraph 2** (unchanged)
```
We built the interface. Mediabunny does the heavy lifting. If this page just saved you a trip to a sketchy upload site, that's who you have to thank.
```

**Aside** (unchanged)
```
Also, and we say this with total sincerity, Mediabunny is a far better name than anything we came up with. We're a little bit jealous. 🐰
```

**Buttons** (unchanged): `Visit mediabunny.dev` / `Give it a star`

---

## 8. Footer

**Primary line**
```
Built with 💜 by PixeLabs. Got a video that's too big? Meet Shrinkray.
```
(Link "Shrinkray" to https://shrinkray.pixelabs.net.)

**Fallback if the sister-product line is not wanted**
```
Built with 💜 by PixeLabs. Free, in your browser, nothing uploaded.
```

---

## 9. Job-row microcopy (5 states)

| State | String |
|---|---|
| Converting | `Converting {name}…` |
| Done | `Done: {kbps} kbps, {size} MB. Download started.` |
| Too long to fit | `Too long to fit. Sharing size stops past roughly an hour of audio. Split the track and try again.` |
| No audio found | `No audio found in this file. Check that it's the one you meant.` |
| Unsupported file | `Can't read this file. WAV and AIFF work, compressed AIFC doesn't.` |

---

## Claims check

| Claim in the copy | Verified fact it rests on |
|---|---|
| Free | Product spine: no account, no upload, free |
| Nothing uploaded / file never leaves your device | Conversion runs in the browser; page CSP blocks connections to other sites (`connect-src 'self'`); checkable in the network tab |
| Check it yourself in the network tab | Same: CSP plus the network tab is the stated proof |
| WAV and AIFF; WAV, AIFF, AIF, AIFC; PCM 8/16/24/32-bit and 32-bit float | Input spec |
| Compressed AIFC isn't supported | Honest limit |
| Under 16 MB option; best quality that fits under 16 MB | Sharing mode picks the best bitrate under 16 MB (MB = page units, bytes / 1,048,576) |
| 12 minute stereo WAV: 27 MB at 320, came out 160 kbps / 13.7 MB | Proof point on the spine (27 MB is the 320 kbps MP3 size, not the WAV size) |
| Shows bitrate and size | Page shows both after each file |
| Switches to mono below 64 kbps | Spine constraint |
| 320 kbps, the best an MP3 can be | Max quality is 320 kbps CBR, the MP3 ceiling |
| Doesn't promise a size; over roughly 6 to 7 minutes exceeds 16 MB | Honest limit: 320 kbps is about 2.4 MB/min, about 6.5 min to 16 MB. Written as a range to hold in both decimal and page units (see handoff flag) |
| Past roughly an hour sharing mode stops with an error | Honest limit |
| Several files at once, each downloads automatically | Spine |
| 44.1/48 kHz kept; others resampled to 44.1; over 2 channels downmixed to stereo | Spine |
| MP3 is lossy, not mastering/archival/stems; send WAV or stems | Honest limit |
| 320 is the ceiling, not WAV quality; don't re-encode an MP3 you'll keep editing | Honest limit |
| AIFF tags and artwork dropped; WAV tags unverified, re-tag after converting | Honest limit; no metadata promise made |
| Tested in Chrome; no claim about other browsers; no max file size quoted | Only verified browser; no verified size ceiling |
| WhatsApp named only as an example, "check yours" | Claims-to-avoid rule: no unconditional WhatsApp claim |
| Built on Mediabunny by Vanilagy, LAME build as WebAssembly | Existing page copy, unchanged in substance |
| Shrinkray makes video smaller | Sister product (video compressor, shrinkray.pixelabs.net) |

Deliberately absent: "WhatsApp-Ready", "360 kbps", lossless, transparent, studio quality, "always under 16 MB", keeps metadata, works in every browser, any file size, instant or speed numbers, secure or encrypted, replaces your DAW export, mastering-grade, any listening-quality claim.
