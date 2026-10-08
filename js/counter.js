/* Community counter: how many files Dubdeck has converted.
   One anonymous request to CounterAPI per finished file, and one to read the
   total. Nothing about the file or the user is sent. If the service is
   unreachable the badge simply stays hidden.

   Two quirks of the service shape this file:
   - Plain URLs are cached by its CDN for hours, so every request carries a
     ?_t= parameter to get a fresh answer.
   - The response to /up carries a stale pre-increment number, so after adding
     one we read the total again instead of trusting that body.
   The shown number only ever goes up, so a stale answer can never pull it
   back down. */
const BASE = 'https://api.counterapi.dev/v2/pixelabs/dubdeck';
const badge = document.getElementById('used');
const digits = document.getElementById('used-count');
let count = null;

function show(v) {
  if (typeof v !== 'number' || !badge || !digits) return;
  if (count == null || v > count) count = v;
  digits.textContent = count.toLocaleString('en-US');
  badge.hidden = false;
}

async function readTotal() {
  const res = await fetch(`${BASE}?_t=${Date.now()}`, { cache: 'no-store' });
  if (res.status === 404) return 0;     // the counter is created by the first conversion
  if (!res.ok) return null;
  const json = await res.json();
  return typeof json?.data?.up_count === 'number' ? json.data.up_count : null;
}

export async function initCounter() {
  try { show(await readTotal()); } catch { /* offline or blocked: badge stays hidden */ }
}

export async function bumpCounter() {
  if (count != null) show(count + 1);   // tick immediately
  try {
    await fetch(`${BASE}/up?_t=${Date.now()}`, { cache: 'no-store' });
    show(await readTotal());
  } catch { /* offline: the local tick still shows */ }
}
