// Public, CORS-enabled counter with no account: /hit adds one and returns the
// new total, /get only reads it. Values can come back as digit strings.
const COUNTER_API = 'https://countapi.mileshilliard.com/api/v1';

export const PROFILE_VISITS_KEY = 'lufria-tech-profile-visits';
export const PROFILE_VISITS_SESSION_KEY = 'lufria:profile-visit:v1';
export const PROFILE_VISITS_TIMEOUT_MS = 4000;

// Only the live site counts; localhost, previews and look-alikes only read.
const PRODUCTION_HOSTS = new Set(['lufria.tech', 'www.lufria.tech']);

export const isProductionVisitHost = (hostname) =>
  typeof hostname === 'string' && PRODUCTION_HOSTS.has(hostname.toLowerCase());

/** A non-negative safe integer, given as a number or a string of digits. */
function parseCount(value) {
  const count = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;
  if (!Number.isSafeInteger(count) || count < 0) throw new Error('invalid count');
  return count;
}

// sessionStorage can be missing, or throw on access (blocked storage, private modes).
function storage() {
  try {
    return globalThis.sessionStorage || null;
  } catch {
    return null;
  }
}

function isSessionCounted() {
  try {
    return storage()?.getItem(PROFILE_VISITS_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markSessionCounted() {
  try {
    storage()?.setItem(PROFILE_VISITS_SESSION_KEY, '1');
  } catch {
    // Blocked storage: the in-memory flag still stops a second hit on this page.
  }
}

function load(action) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  let timer;
  // The deadline covers the whole exchange, including a body that trickles in.
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`timed out after ${PROFILE_VISITS_TIMEOUT_MS} ms`));
      controller?.abort();
    }, PROFILE_VISITS_TIMEOUT_MS);
  });
  const url = `${COUNTER_API}/${action}/${encodeURIComponent(PROFILE_VISITS_KEY)}`;
  const init = { cache: 'no-store', ...(controller && { signal: controller.signal }) };
  // Wrapped so a fetch that throws synchronously still rejects (and clears the timer).
  const exchange = new Promise((resolve) => resolve(fetch(url, init)))
    .then(async (res) => {
      if (res.ok) return parseCount((await res.json())?.value);
      // A key nobody has hit yet reads as 404 "Key not found": genuinely zero visits.
      if (action === 'get' && res.status === 404) {
        const body = await res.json().catch(() => null);
        if (body?.error === 'Key not found') return 0;
      }
      throw new Error(`HTTP ${res.status}`);
    });
  return Promise.race([exchange, deadline]).finally(() => clearTimeout(timer));
}

// This page has already decided whether to count the visit; it never decides
// again, even if storage stops answering after a session marker was seen.
let attempted = false;
let request = null;

/**
 * The profile visit total. On the live site the first call of a browser
 * session counts the visit (/hit); every other call, and every other host,
 * only reads it (/get). Callers share one in-flight or successful request.
 *
 * The session is marked before the hit is sent, so a hit that times out or
 * fails, whose outcome is unknown, is never repeated: a later call after a
 * failure retries with a read. A count is visit sessions, not unique people.
 */
export function loadProfileVisits({ hostname = globalThis.location?.hostname } = {}) {
  if (!request) {
    let action = 'get';
    if (isProductionVisitHost(hostname) && !attempted) {
      attempted = true;
      if (!isSessionCounted()) {
        markSessionCounted();
        action = 'hit';
      }
    }
    request = load(action).catch((err) => {
      request = null;
      throw err;
    });
  }
  return request;
}
