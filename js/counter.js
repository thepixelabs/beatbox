/* Community counter: how many files Dubdeck has converted.
   One anonymous request to CounterAPI per finished file, and one to read the
   total on load. Nothing about the file or the user is sent. If the service is
   unreachable the badge simply stays hidden. */
const BASE = 'https://api.counterapi.dev/v2/pixelabs/dubdeck';
const badge = document.getElementById('used');
const digits = document.getElementById('used-count');
let count = null;

function render() {
  if (count == null || !badge || !digits) return;
  digits.textContent = count.toLocaleString('en-US');
  badge.hidden = false;
}

const upCount = (json) => (typeof json?.data?.up_count === 'number' ? json.data.up_count : null);

export async function initCounter() {
  try {
    const res = await fetch(BASE, { cache: 'no-store' });
    if (res.ok) {
      const v = upCount(await res.json());
      if (v != null) { count = v; render(); }
    } else if (res.status === 404) {
      count = 0; render();           // the counter is created by the first conversion
    }
  } catch { /* offline or blocked: leave the badge hidden */ }
}

export async function bumpCounter() {
  if (count != null) { count++; render(); }
  try {
    const res = await fetch(`${BASE}/up`, { cache: 'no-store' });
    if (res.ok) {
      const v = upCount(await res.json());
      if (v != null && v >= (count ?? 0)) { count = v; render(); }
    }
  } catch { /* offline: the local count still ticked */ }
}
