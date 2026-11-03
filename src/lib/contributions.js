import bundledSnapshot from '../data/contributions-snapshot.json' with { type: 'json' };

export const GITHUB_USERNAME = 'Enricko';
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

// Public, CORS-enabled mirror of the GitHub contribution calendar (GitHub's own
// endpoint needs an authenticated GraphQL call the browser can't make).
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

export const CONTRIBUTIONS_CACHE_KEY = 'lufria:github-contributions:v1';
export const CONTRIBUTIONS_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const CONTRIBUTIONS_TIMEOUT_MS = 6000;

const DAY_MS = 86400000;
const MAX_DAYS = 400;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Parses, and round-trips, only for real calendar dates: 2026-99-01 and 2026-02-30 are rejected.
const isRealDate = (date) => {
  const time = Date.parse(`${date}T00:00:00Z`);
  return !Number.isNaN(time) && new Date(time).toISOString().startsWith(date);
};

const isValidDay = (day) =>
  !!day &&
  typeof day.date === 'string' &&
  DATE_RE.test(day.date) &&
  isRealDate(day.date) &&
  Number.isInteger(day.count) && day.count >= 0 &&
  Number.isInteger(day.level) && day.level >= 0 && day.level <= 4;

/** Oldest first, one entry per date, and no bigger than a year needs to be. */
const isValidCalendar = (days) =>
  Array.isArray(days) &&
  days.length > 0 &&
  days.length <= MAX_DAYS &&
  days.every((day, i) => isValidDay(day) && (i === 0 || days[i - 1].date < day.date));

// A number Date can represent (within ±8.64e15 ms), so 1e20 is rejected.
const isTimestamp = (ms) => Number.isFinite(ms) && !Number.isNaN(new Date(ms).getTime());

/** A { username, fetchedAt, contributions } record, as saved or bundled. */
const isValidRecord = (record) =>
  !!record &&
  record.username === GITHUB_USERNAME &&
  isTimestamp(record.fetchedAt) &&
  isValidCalendar(record.contributions);

// Genuine data captured from the mirror at build time, shown until something newer loads.
const SNAPSHOT = isValidRecord(bundledSnapshot)
  ? { days: bundledSnapshot.contributions, source: 'snapshot', updatedAt: bundledSnapshot.fetchedAt }
  : { days: [], source: 'snapshot', updatedAt: null };

// localStorage can be missing, or throw on access (blocked storage, private modes).
function storage() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

function readCache() {
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(CONTRIBUTIONS_CACHE_KEY);
    if (raw == null) return null;
    const record = JSON.parse(raw);
    if (isValidRecord(record)) return record;
  } catch {
    // Corrupt JSON or a storage error: fall through and drop the entry.
  }
  forgetCache(store);
  return null;
}

function writeCache(contributions, fetchedAt) {
  try {
    storage()?.setItem(
      CONTRIBUTIONS_CACHE_KEY,
      JSON.stringify({ username: GITHUB_USERNAME, fetchedAt, contributions }),
    );
  } catch {
    // Quota or blocked storage: the live data still shows for this visit.
  }
}

function forgetCache(store) {
  try {
    store.removeItem(CONTRIBUTIONS_CACHE_KEY);
  } catch {
    // Nothing more to do.
  }
}

const isFreshAt = (updatedAt, now) => now - updatedAt >= 0 && now - updatedAt < CONTRIBUTIONS_CACHE_TTL_MS;

/** An expired save is still worth showing while its last day falls inside the current rolling year. */
function coversCurrentYear(days, now) {
  const today = new Date(now).toISOString().slice(0, 10);
  const yearAgo = new Date(Date.parse(`${today}T00:00:00Z`) - 365 * DAY_MS).toISOString().slice(0, 10);
  return days[days.length - 1].date >= yearAgo;
}

let live = null; // { days, fetchedAt } once this visit's request has succeeded
let request = null;

/**
 * The best genuine calendar available right now, without touching the network:
 * this visit's live data, else data saved by an earlier visit (unless the
 * bundled snapshot is newer), else the bundled snapshot.
 * Returns { days, source: 'live' | 'cache' | 'snapshot', updatedAt }.
 */
export function getContributionsSnapshot(now = Date.now()) {
  if (live) return { days: live.days, source: 'live', updatedAt: live.fetchedAt };

  const cached = readCache();
  if (cached) {
    const usable =
      cached.fetchedAt >= SNAPSHOT.updatedAt &&
      (isFreshAt(cached.fetchedAt, now) || coversCurrentYear(cached.contributions, now));
    if (usable) return { days: cached.contributions, source: 'cache', updatedAt: cached.fetchedAt };
    forgetCache(storage()); // superseded by a newer deploy, or no longer the current year
  }
  return SNAPSHOT;
}

/** True when `snapshot` is recent enough that there's no need to ask the network again. */
export function isContributionsFresh(snapshot = getContributionsSnapshot(), now = Date.now()) {
  if (snapshot.source === 'live') return true;
  return snapshot.source === 'cache' && isFreshAt(snapshot.updatedAt, now);
}

function load() {
  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  let timer;
  // The deadline covers the whole exchange, including a body that trickles in.
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`timed out after ${CONTRIBUTIONS_TIMEOUT_MS} ms`));
      controller?.abort();
    }, CONTRIBUTIONS_TIMEOUT_MS);
  });
  const init = controller ? { signal: controller.signal } : undefined;
  // Wrapped so a fetch that throws synchronously still rejects (and clears the timer).
  const exchange = new Promise((resolve) => resolve(fetch(CONTRIBUTIONS_URL, init)))
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    });
  return Promise.race([exchange, deadline]).finally(() => clearTimeout(timer));
}

/**
 * The last year of contribution days from the network, oldest first:
 * [{ date, count, level }]. The hero skyline and the Open Source section share
 * one request per visit; a success is saved for later visits, and a failed or
 * timed-out request is forgotten so a later call can retry.
 */
export function fetchContributions() {
  if (!request) {
    request = load()
      .then((data) => {
        const days = data?.contributions;
        if (!Array.isArray(days) || !days.length) throw new Error('empty calendar');
        if (!isValidCalendar(days)) throw new Error('invalid calendar');
        const fetchedAt = Date.now();
        live = { days, fetchedAt };
        writeCache(days, fetchedAt);
        return days;
      })
      .catch((err) => {
        request = null;
        throw err;
      });
  }
  return request;
}
