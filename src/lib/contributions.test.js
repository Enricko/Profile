import test from 'node:test';
import assert from 'node:assert/strict';
import bundledSnapshot from '../data/contributions-snapshot.json' with { type: 'json' };

const SNAPSHOT_FETCHED_AT = bundledSnapshot.fetchedAt;

let caseNumber = 0;
const loadFresh = async () => import(`./contributions.js?case=${caseNumber += 1}`);
const response = (body, { ok = true, status = 200 } = {}) => ({
  ok,
  status,
  json: async () => body,
});

test('fetchContributions shares one in-flight request and resolves both calls to the same array', async () => {
  const originalFetch = globalThis.fetch;
  const contributions = [{ date: '2026-01-01', count: 3, level: 2 }];
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return response({ contributions });
  };

  try {
    const { fetchContributions } = await loadFresh();
    const [first, second] = await Promise.all([fetchContributions(), fetchContributions()]);
    assert.equal(fetchCount, 1);
    assert.strictEqual(first, contributions);
    assert.strictEqual(second, first);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('fetchContributions retries after a rejected request', async () => {
  const originalFetch = globalThis.fetch;
  const contributions = [{ date: '2026-01-02', count: 1, level: 1 }];
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    if (fetchCount === 1) throw new Error('network failure');
    return response({ contributions });
  };

  try {
    const { fetchContributions } = await loadFresh();
    await assert.rejects(fetchContributions(), /network failure/);
    assert.strictEqual(await fetchContributions(), contributions);
    assert.equal(fetchCount, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('fetchContributions rejects non-OK HTTP responses with their status', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => response({}, { ok: false, status: 500 });

  try {
    const { fetchContributions } = await loadFresh();
    await assert.rejects(fetchContributions(), /HTTP 500/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('fetchContributions rejects an empty contributions array', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => response({ contributions: [] });

  try {
    const { fetchContributions } = await loadFresh();
    await assert.rejects(fetchContributions(), /empty calendar/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

const withGlobals = async ({ fetch: fetchImpl, localStorage, now }, run) => {
  const oldFetch = globalThis.fetch;
  const hadStorage = Object.hasOwn(globalThis, 'localStorage');
  const oldStorage = globalThis.localStorage;
  const oldNow = Date.now;
  if (fetchImpl) globalThis.fetch = fetchImpl;
  if (localStorage !== undefined) {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: localStorage });
  }
  if (now !== undefined) Date.now = () => now;
  try {
    await run();
  } finally {
    globalThis.fetch = oldFetch;
    Date.now = oldNow;
    if (hadStorage) {
      Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: oldStorage });
    } else {
      delete globalThis.localStorage;
    }
  }
};

const makeStorage = (entries = {}) => {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    values,
  };
};

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
};

test('getContributionsSnapshot synchronously returns bundled days without fetching', async () => {
  let fetchCount = 0;
  await withGlobals({ fetch: async () => { fetchCount += 1; throw new Error('unexpected fetch'); }, localStorage: makeStorage() }, async () => {
    const { getContributionsSnapshot } = await loadFresh();
    const initial = getContributionsSnapshot();
    assert.equal(typeof initial?.then, 'undefined', 'initial snapshot should be available synchronously');
    assert.equal(initial.source, 'snapshot');
    assert.ok(Array.isArray(initial.days) && initial.days.length > 0);
    assert.equal(initial.updatedAt, SNAPSHOT_FETCHED_AT);
    assert.equal(fetchCount, 0);
  });
});

test('a fresh saved cache is returned immediately and is marked fresh without network access', async () => {
  const now = SNAPSHOT_FETCHED_AT + 86_400_000 + 1_000;
  const days = [{ date: '2026-01-01', count: 3, level: 2 }];
  let fetchCount = 0;
  await withGlobals({ now, localStorage: makeStorage(), fetch: async () => { fetchCount += 1; return response({ contributions: [] }); } }, async () => {
    const mod = await loadFresh();
    globalThis.localStorage.setItem(mod.CONTRIBUTIONS_CACHE_KEY, JSON.stringify({ username: 'Enricko', fetchedAt: now, contributions: days }));
    const initial = mod.getContributionsSnapshot();
    assert.equal(initial.source, 'cache');
    assert.deepEqual(initial.days, days);
    assert.equal(initial.updatedAt, now);
    assert.equal(mod.isContributionsFresh(initial, now), true);
    assert.equal(fetchCount, 0);
  });
});

test('stale saved data is served immediately while concurrent callers share one revalidation', async () => {
  const now = SNAPSHOT_FETCHED_AT + 86_400_000 + 21_600_000 + 1;
  const oldDays = [{ date: '2026-01-01', count: 1, level: 1 }];
  const freshDays = [{ date: '2026-01-02', count: 5, level: 3 }];
  const gate = deferred();
  let fetchCount = 0;
  await withGlobals({
    now,
    localStorage: makeStorage(),
    fetch: async () => { fetchCount += 1; return gate.promise; },
  }, async () => {
    const mod = await loadFresh();
    globalThis.localStorage.setItem(mod.CONTRIBUTIONS_CACHE_KEY, JSON.stringify({
      username: 'Enricko', fetchedAt: SNAPSHOT_FETCHED_AT + 86_400_000, contributions: oldDays,
    }));
    const initial = mod.getContributionsSnapshot();
    assert.equal(initial.source, 'cache');
    assert.deepEqual(initial.days, oldDays);
    assert.equal(initial.updatedAt, now - mod.CONTRIBUTIONS_CACHE_TTL_MS - 1);
    assert.equal(mod.isContributionsFresh(initial, now), false);
    const first = mod.fetchContributions();
    const second = mod.fetchContributions();
    assert.equal(fetchCount, 1);
    gate.resolve(response({ contributions: freshDays }));
    const [firstDays, secondDays] = await Promise.all([first, second]);
    assert.strictEqual(firstDays, secondDays);
    assert.deepEqual(firstDays, freshDays);
    assert.equal(mod.getContributionsSnapshot().source, 'live');
    assert.deepEqual(mod.getContributionsSnapshot().days, freshDays);
    assert.equal(mod.getContributionsSnapshot().updatedAt, now);
    assert.deepEqual(JSON.parse(globalThis.localStorage.getItem(mod.CONTRIBUTIONS_CACHE_KEY)), {
      username: 'Enricko', fetchedAt: now, contributions: freshDays,
    });
  });
});

test('a failed stale revalidation preserves fallback data and can be retried', async () => {
  const now = SNAPSHOT_FETCHED_AT + 86_400_000 + 21_600_000 + 1;
  const cachedDays = [{ date: '2026-01-01', count: 2, level: 1 }];
  const liveDays = [{ date: '2026-01-02', count: 4, level: 2 }];
  let fetchCount = 0;
  await withGlobals({
    now,
    localStorage: makeStorage(),
    fetch: async () => {
      fetchCount += 1;
      if (fetchCount === 1) throw new Error('network failure');
      return response({ contributions: liveDays });
    },
  }, async () => {
    const mod = await loadFresh();
    globalThis.localStorage.setItem(mod.CONTRIBUTIONS_CACHE_KEY, JSON.stringify({
      username: 'Enricko', fetchedAt: SNAPSHOT_FETCHED_AT + 86_400_000, contributions: cachedDays,
    }));
    await assert.rejects(mod.fetchContributions(), /network failure/);
    assert.deepEqual(mod.getContributionsSnapshot().days, cachedDays);
    assert.deepEqual(await mod.fetchContributions(), liveDays);
    assert.equal(fetchCount, 2);
    assert.equal(mod.getContributionsSnapshot().source, 'live');
  });
});

test('corrupt, wrong-user, or invalid-day cache data falls back to the bundled snapshot', async () => {
  const goodDays = [{ date: '2026-01-01', count: 1, level: 1 }];
  const cacheFetchedAt = SNAPSHOT_FETCHED_AT + 86_400_000;
  for (const raw of [
    '{',
    JSON.stringify({ username: 'someone-else', fetchedAt: cacheFetchedAt, contributions: goodDays }),
    JSON.stringify({ username: 'Enricko', fetchedAt: 1e20, contributions: goodDays }),
    JSON.stringify({ username: 'Enricko', fetchedAt: cacheFetchedAt, contributions: [{ date: '2026-02-30', count: 1, level: 1 }] }),
  ]) {
    let fetchCount = 0;
    await withGlobals({ localStorage: makeStorage(), fetch: async () => { fetchCount += 1; throw new Error('unexpected fetch'); } }, async () => {
      const mod = await loadFresh();
      globalThis.localStorage.setItem(mod.CONTRIBUTIONS_CACHE_KEY, raw);
      const initial = mod.getContributionsSnapshot();
      assert.equal(initial.source, 'snapshot');
      assert.ok(initial.days.length > 0);
      assert.equal(fetchCount, 0);
    });
  }
});

test('a cache older than the bundled snapshot is removed and the snapshot wins', async () => {
  const storage = makeStorage();
  await withGlobals({ localStorage: storage }, async () => {
    const mod = await loadFresh();
    storage.setItem(mod.CONTRIBUTIONS_CACHE_KEY, JSON.stringify({
      username: 'Enricko',
      fetchedAt: SNAPSHOT_FETCHED_AT - 1,
      contributions: [{ date: '2026-01-01', count: 1, level: 1 }],
    }));
    const current = mod.getContributionsSnapshot();
    assert.equal(current.source, 'snapshot');
    assert.equal(current.updatedAt, SNAPSHOT_FETCHED_AT);
    assert.equal(storage.getItem(mod.CONTRIBUTIONS_CACHE_KEY), null);
  });
});

test('invalid contribution payloads are rejected and failed requests remain retryable', async () => {
  const invalidPayloads = [
    [{ date: 'not-a-date', count: 1, level: 1 }],
    [{ date: '2026-02-30', count: 1, level: 1 }],
    [{ date: '2026-01-01', count: -1, level: 1 }],
    [{ date: '2026-01-01', count: 1.5, level: 1 }],
    [{ date: '2026-01-01', count: 1, level: 5 }],
    [{ date: '2026-01-02', count: 1, level: 1 }, { date: '2026-01-01', count: 1, level: 1 }],
    Array.from({ length: 1000 }, (_, index) => ({ date: new Date(Date.UTC(2024, 0, 1 + index)).toISOString().slice(0, 10), count: 1, level: 1 })),
  ];
  for (const badDays of invalidPayloads) {
    let fetchCount = 0;
    await withGlobals({ fetch: async () => {
      fetchCount += 1;
      return fetchCount === 1 ? response({ contributions: badDays }) : response({ contributions: [{ date: '2026-01-01', count: 1, level: 1 }] });
    }, localStorage: makeStorage() }, async () => {
      const mod = await loadFresh();
      await assert.rejects(mod.fetchContributions());
      assert.equal((await mod.fetchContributions()).length, 1);
      assert.equal(fetchCount, 2);
    });
  }
});

test('storage read and write failures do not prevent a successful live response', async () => {
  const days = [{ date: '2026-01-01', count: 1, level: 1 }];
  const unavailableStorage = {
    getItem() { throw new Error('storage denied'); },
    setItem() { throw new Error('quota exceeded'); },
  };
  await withGlobals({ localStorage: unavailableStorage, fetch: async () => response({ contributions: days }) }, async () => {
    const mod = await loadFresh();
    assert.equal(mod.getContributionsSnapshot().source, 'snapshot');
    assert.deepEqual(await mod.fetchContributions(), days);
    assert.equal(mod.getContributionsSnapshot().source, 'live');
  });
});

test('a slow response body is bounded by the whole-request timeout', async () => {
  const oldSetTimeout = globalThis.setTimeout;
  const oldClearTimeout = globalThis.clearTimeout;
  const oldNow = Date.now;
  const oldFetch = globalThis.fetch;
  const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  let now = 1_800_000_000_000;
  let nextId = 1;
  const timers = new Map();
  globalThis.setTimeout = (callback, delay = 0) => {
    const id = nextId++;
    timers.set(id, { callback, due: now + Number(delay) });
    return id;
  };
  globalThis.clearTimeout = (id) => timers.delete(id);
  Date.now = () => now;
  const advance = (ms) => {
    now += ms;
    for (const [id, timer] of [...timers]) {
      if (timer.due <= now) {
        timers.delete(id);
        timer.callback();
      }
    }
  };
  try {
    const body = deferred();
    let requestSignal;
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: makeStorage() });
    globalThis.fetch = async (_url, init) => {
      requestSignal = init.signal;
      return { ok: true, status: 200, json: () => body.promise };
    };
    const mod = await loadFresh();
    const pending = mod.fetchContributions();
    await Promise.resolve();
    await Promise.resolve();
    const observed = pending.then(
      () => ({ resolved: true }),
      (error) => ({ error }),
    );
    advance(mod.CONTRIBUTIONS_TIMEOUT_MS);
    let outcome;
    observed.then((result) => { outcome = result; });
    for (let turn = 0; turn < 10 && !outcome; turn += 1) await Promise.resolve();
    assert.ok(outcome?.error, !outcome ? 'request did not settle at the configured timeout' : 'request unexpectedly resolved');
    assert.match(outcome.error.message, /timed out|timeout/i);
    assert.equal(requestSignal.aborted, true);
  } finally {
    globalThis.setTimeout = oldSetTimeout;
    globalThis.clearTimeout = oldClearTimeout;
    Date.now = oldNow;
    globalThis.fetch = oldFetch;
    if (storageDescriptor) Object.defineProperty(globalThis, 'localStorage', storageDescriptor);
    else delete globalThis.localStorage;
  }
});
