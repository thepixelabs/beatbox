# Dubdeck

WAV, AIFF and OGG to MP3, in the browser.

320 kbps MP3 (the format's maximum) converted entirely in the browser with [Mediabunny](https://mediabunny.dev) + its LAME WASM encoder. Static page, no server, no upload.

    npm install     # only needed to refresh vendor/ copies
    npm run serve   # http://localhost:8789

Vendored: `vendor/mediabunny.min.mjs`, `vendor/mediabunny-mp3-encoder.min.mjs` (import path rewritten to the local mediabunny).

## SEO

What exists:

- `index.html` head: title, meta description, canonical, robots (`index, follow, max-image-preview:large`), Open Graph and Twitter card tags, `color-scheme`, apple-touch-icon.
- Two JSON-LD blocks in the head: `WebApplication` and `FAQPage`. The FAQ question and answer text must match the visible `#faq` section word for word, so edit both together. There is no rating or review markup, on purpose.
- The `<h1>` is the cassette title plus a visually hidden ": free WAV to MP3 converter".
- `robots.txt` (allow all, points to the sitemap) and `sitemap.xml` (home page only). Update `lastmod` when the page changes in a way that matters.
- `assets/og-image.jpg` (1200x630) for link previews and `assets/apple-touch-icon.png` (180x180).
- `legal/*.md` is not served as pages and is deliberately left out of the sitemap and the structured data.

The production origin is assumed to be `https://dubdeck.pixelabs.net/`. It appears in `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, and the `url` and `image` fields of the `WebApplication` JSON-LD), `robots.txt` and `sitemap.xml`. To change it in one pass:

    sed -i '' 's#https://dubdeck.pixelabs.net/#https://NEW.ORIGIN/#g' index.html robots.txt sitemap.xml

(Note `robots.txt` also has `.../sitemap.xml`, which the same pattern covers.)

Validate once the domain is live:

1. Rich Results Test (https://search.google.com/test/rich-results) with the live URL: both blocks should parse with no errors. FAQ rich results are no longer shown for most sites, so valid markup is the goal, not a visible result.
2. Search Console: add the property, use URL Inspection on `/` and "Request indexing", check the canonical Google picked, then submit `https://<origin>/sitemap.xml` under Sitemaps.
3. Link previews: paste the URL into a chat app or the Facebook Sharing Debugger to confirm the image and text.
