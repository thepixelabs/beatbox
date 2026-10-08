# Dubdeck Privacy Notice

**Last updated: [DATE OF PUBLICATION]**

Dubdeck is a small tool that turns WAV, AIFF, OGG and MP3 files into MP3s inside
your browser. We don't collect anything about you or your files. Here's exactly
what happens when you use it.

## 1. Your audio stays on your device

When you drop a file into Dubdeck, your browser reads it and converts it on
your own device, in memory. The file, the MP3 we make from it, and details
like the file name, length or contents are never sent to us or to anyone
else. The finished MP3 is handed to your browser as a normal download.

You can check this yourself. Open your browser's network tab, convert a file,
and watch: no request carries your audio. The page's security policy also
only lets the page talk to this site and to the counter service described in section 3, so there is nowhere else for your audio to go.

## 2. What we don't use

- No account or sign-up.
- No cookies. The only thing saved in your browser is your light or dark
  theme choice, if you make one.
- No analytics, tracking pixels or ads.
- No third-party scripts or fonts. Everything the page needs comes from this
  site.

## 3. The anonymous counter

The cassette shows how many files Dubdeck has converted. That number lives on
[CounterAPI](https://counterapi.dev). When the page loads it asks for the
current total, and when a file finishes it sends one request that adds one.
These requests carry no file name, no file details and nothing you typed. As
with any request, CounterAPI's servers can see your IP address and browser
type, under [their own policy](https://counterapi.dev). If that service is
unreachable the counter just stays hidden and Dubdeck works the same.

## 4. Hosting

The site is a folder of static files served by GitHub Pages at
`[SITE URL]`. When your browser loads the page, GitHub's servers receive the
standard information any website gets, such as your IP address and browser
type. GitHub handles that under its own
[privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
We don't receive those logs.
[IF THE PIXELABS.NET DOMAIN IS PROXIED THROUGH A CDN OR DNS PROVIDER SUCH AS CLOUDFLARE, NAME IT HERE WITH A LINK TO ITS PRIVACY POLICY; OTHERWISE DELETE THIS SENTENCE.]

## 5. Links to other sites

The page links to other sites, like PixeLabs, Shrinkray, Mediabunny and LAME.
Nothing is loaded from them unless you click. If you click, that site can tell
you came from here, and its own privacy policy applies.

## 6. Changes

If Dubdeck ever starts collecting anything, we'll update this notice before
it does, and the date at the top will change.

## 7. Who we are and how to reach us

Dubdeck is built with 🧡 by [PixeLabs](https://pixelabs.net), operated by
[OPERATOR LEGAL NAME], [GEOGRAPHICAL ADDRESS]. Questions go to
[CONTACT EMAIL], or open an issue on our [GitHub repository]([REPO URL]).
