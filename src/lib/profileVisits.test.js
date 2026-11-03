import test from 'node:test';
import assert from 'node:assert/strict';

const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const VISITS_KEY = 'lufria-tech-profile-visits';
const SESSION_KEY = 'lufria:profile-visit:v1';

let importNumber = 0;
const loadFresh = async () => import(`./profileVisits.js?case=${importNumber += 1}`);

const response = (body, { ok = true, status = 200, json = async () => body } = {}) => ({
  ok,
  status,
  json,
});

const makeStorage = (entries = {}) => {
  const values = new Map(Object.entries(entries));
  return {
    values,
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
};

const withGlobals = async (overrides, run) => {
  const keys = ['fetch', 'location', 'localStorage', 'sessionStorage', 'setTimeout', 'clearTimeout'];
  const descriptors = new Map(keys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const key of Reflect.ownKeys(overrides)) {
    Object.defineProperty(globalThis, key, { ...Object.getOwnPropertyDescriptor(overrides, key), configurable: true });
  }
  try {
    await run();
  } finally {
    for (const key of keys) {
      const descriptor = descriptors.get(key);
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
};

const makeClock = () => {
  let nextId = 1;
  let now = 0;
  const timers = new Map();
  return {
    setTimeout(callback, delay = 0) {
      const id = nextId++;
      timers.set(id, { callback, due: now + Number(delay) });
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
    async advance(ms) {
      const target = now + ms;
      while (true) {
        const next = [...timers.entries()]
          .filter(([, timer]) => timer.due <= target)
          .sort((a, b) => a[1].due - b[1].due || a[0] - b[0])[0];
        if (!next) break;
        const [id, timer] = next;
        timers.delete(id);
        now = timer.due;
        timer.callback();
        await Promise.resolve();
      }
      now = target;
      await Promise.resolve();
    },
    pending: () => timers.size,
  };
};

const assertRequest = (call, kind) => {
  const [input, init = {}] = call;
  const url = new URL(input);
  assert.equal(url.origin + url.pathname, `${API_BASE}/${kind}/${VISITS_KEY}`);
  assert.equal(init.method ?? 'GET', 'GET');
  return init;
};

test('exports the profile visit key, session key, and request timeout', async () => {
  await withGlobals({ fetch: async () => response({ value: 0 }) }, async () => {
    const mod = await loadFresh();
    assert.equal(mod.PROFILE_VISITS_KEY, VISITS_KEY);
    assert.equal(mod.PROFILE_VISITS_SESSION_KEY, SESSION_KEY);
    assert.equal(mod.PROFILE_VISITS_TIMEOUT_MS, 4000);
  });
});

test('only the normalized production hostnames count profile visits', async () => {
  const { isProductionVisitHost } = await loadFresh();
  for (const hostname of ['lufria.tech', 'www.lufria.tech', 'LUFRIA.TECH', 'WWW.LUFRIA.TECH']) {
    assert.equal(isProductionVisitHost(hostname), true, hostname);
  }
  for (const hostname of [
    'localhost', '127.0.0.1', 'lufria.tech.localhost', 'preview.lufria.tech',
    'lufria-tech.vercel.app', 'notlufria.tech', 'lufria.tech.evil.example', '', undefined,
  ]) {
    assert.equal(isProductionVisitHost(hostname), false, String(hostname));
  }
});

test('a first production visitor records the session before hitting and shares the successful promise', async () => {
  const sessionStorage = makeStorage();
  const gate = deferred();
  const calls = [];
  await withGlobals({
    location: { hostname: 'lufria.tech' },
    localStorage: makeStorage(),
    sessionStorage,
    fetch: async (...args) => {
      calls.push(args);
      assert.equal(sessionStorage.getItem(SESSION_KEY), '1', 'session marker must be written before the request');
      return gate.promise;
    },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    const first = loadProfileVisits();
    const concurrent = loadProfileVisits();
    assert.strictEqual(concurrent, first);
    assert.equal(calls.length, 1);
    assertRequest(calls[0], 'hit');
    gate.resolve(response({ value: '17' }));
    assert.deepEqual(await Promise.all([first, concurrent]), [17, 17]);
    assert.strictEqual(loadProfileVisits(), first, 'resolved success stays shared for the module lifetime');
    assert.equal(calls.length, 1);
  });
});

test('a visitor with a session marker reads the current count without incrementing', async () => {
  const calls = [];
  await withGlobals({
    location: { hostname: 'www.lufria.tech' },
    localStorage: makeStorage(),
    sessionStorage: makeStorage({ [SESSION_KEY]: '1' }),
    fetch: async (...args) => { calls.push(args); return response({ value: 8 }); },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    assert.equal(await loadProfileVisits(), 8);
    assertRequest(calls[0], 'get');
    assert.equal(calls.length, 1);
  });
});

test('a failed read after an existing session marker retries with another read when storage becomes unavailable', async () => {
  const denied = { read: false };
  const storage = makeStorage({ [SESSION_KEY]: '1' });
  const sessionStorage = {
    getItem(key) {
      if (denied.read) throw new Error('storage access denied');
      return storage.getItem(key);
    },
    setItem: storage.setItem,
  };
  const calls = [];
  await withGlobals({
    location: { hostname: 'lufria.tech' },
    localStorage: makeStorage(),
    sessionStorage,
    fetch: async (...args) => {
      calls.push(args);
      if (calls.length === 1) throw new Error('temporary read failure');
      return response({ value: 9 });
    },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    await assert.rejects(loadProfileVisits(), /temporary read failure/);
    assertRequest(calls[0], 'get');
    denied.read = true;
    assert.equal(await loadProfileVisits(), 9);
    assertRequest(calls[1], 'get');
    assert.equal(calls.length, 2, 'a session already marked counted must never be incremented on retry');
  });
});

test('local and preview hosts read the count but never mark a production visit', async () => {
  for (const hostname of ['localhost', 'preview.lufria.tech', 'lufria-tech.vercel.app']) {
    const calls = [];
    const sessionStorage = makeStorage();
    await withGlobals({
      location: { hostname },
      localStorage: makeStorage(),
      sessionStorage,
      fetch: async (...args) => { calls.push(args); return response({ value: 4 }); },
    }, async () => {
      const { loadProfileVisits } = await loadFresh();
      assert.equal(await loadProfileVisits(), 4, hostname);
      assertRequest(calls[0], 'get');
      assert.equal(calls.length, 1);
      assert.equal(sessionStorage.getItem(SESSION_KEY), null);
    });
  }
});

test('storage getter, read, and write failures do not prevent live counts or duplicate a concurrent hit', async () => {
  const gate = deferred();
  const calls = [];
  const deniedStorage = { getItem() { throw new Error('denied read'); }, setItem() { throw new Error('denied write'); } };
  const overrides = {
    location: { hostname: 'lufria.tech' },
    fetch: async (...args) => { calls.push(args); return gate.promise; },
  };
  Object.defineProperty(overrides, 'localStorage', { enumerable: true, get() { throw new Error('denied getter'); } });
  Object.defineProperty(overrides, 'sessionStorage', { enumerable: true, get() { return deniedStorage; } });
  await withGlobals(overrides, async () => {
    const { loadProfileVisits } = await loadFresh();
    const first = loadProfileVisits();
    const second = loadProfileVisits();
    assert.strictEqual(second, first);
    assert.equal(calls.length, 1);
    assertRequest(calls[0], 'hit');
    gate.resolve(response({ value: 12 }));
    assert.deepEqual(await Promise.all([first, second]), [12, 12]);
    assert.strictEqual(loadProfileVisits(), first);
    assert.equal(calls.length, 1);
  });
});

test('storage getter denial still uses module memory to avoid another hit', async () => {
  let calls = 0;
  const overrides = {
    location: { hostname: 'lufria.tech' },
    localStorage: makeStorage(),
    fetch: async () => { calls += 1; return response({ value: 2 }); },
  };
  Object.defineProperty(overrides, 'sessionStorage', { enumerable: true, get() { throw new Error('storage disabled'); } });
  await withGlobals(overrides, async () => {
    const { loadProfileVisits } = await loadFresh();
    assert.equal(await loadProfileVisits(), 2);
    assert.equal(await loadProfileVisits(), 2);
    assert.equal(calls, 1);
  });
});

test('failed first hit is followed by a read retry and never a second increment', async () => {
  const calls = [];
  const sessionStorage = makeStorage();
  await withGlobals({
    location: { hostname: 'lufria.tech' },
    localStorage: makeStorage(),
    sessionStorage,
    fetch: async (...args) => {
      calls.push(args);
      if (calls.length === 1) throw new Error('connection lost after hit');
      return response({ value: 20 });
    },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    await assert.rejects(loadProfileVisits(), /connection lost after hit/);
    assert.equal(sessionStorage.getItem(SESSION_KEY), '1');
    assert.equal(await loadProfileVisits(), 20);
    assertRequest(calls[0], 'hit');
    assertRequest(calls[1], 'get');
    assert.equal(calls.length, 2);
  });
});

test('a request timeout aborts the request and makes future calls read instead of incrementing', async () => {
  const clock = makeClock();
  const calls = [];
  await withGlobals({
    location: { hostname: 'lufria.tech' },
    localStorage: makeStorage(),
    sessionStorage: makeStorage(),
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    fetch: async (...args) => {
      calls.push(args);
      if (calls.length === 1) return new Promise(() => {});
      return response({ value: 21 });
    },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    const pending = loadProfileVisits();
    const rejected = assert.rejects(pending, /timed? ?out|timeout|abort/i);
    assert.equal(calls.length, 1);
    assertRequest(calls[0], 'hit');
    const init = calls[0][1];
    assert.ok(init?.signal instanceof AbortSignal, 'fetch receives an AbortSignal');
    assert.equal(init.signal.aborted, false);
    await clock.advance(4000);
    await rejected;
    assert.equal(init.signal.aborted, true);
    assert.equal(await loadProfileVisits(), 21);
    assertRequest(calls[1], 'get');
    assert.equal(calls.length, 2);
  });
});

test('the deadline includes a response body that never finishes parsing', async () => {
  const clock = makeClock();
  const body = deferred();
  const calls = [];
  await withGlobals({
    location: { hostname: 'lufria.tech' },
    localStorage: makeStorage(),
    sessionStorage: makeStorage(),
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    fetch: async (...args) => {
      calls.push(args);
      if (calls.length === 1) return response(null, { json: () => body.promise });
      return response({ value: 22 });
    },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    const pending = loadProfileVisits();
    const rejected = assert.rejects(pending, /timed? ?out|timeout|abort/i);
    assert.equal(calls.length, 1);
    await clock.advance(4000);
    await rejected;
    assert.equal(calls[0][1].signal.aborted, true);
    assert.equal(await loadProfileVisits(), 22);
    assertRequest(calls[1], 'get');
    body.resolve({ value: 100 });
  });
});

test('a missing CountAPI key on a read resolves to zero', async () => {
  const calls = [];
  await withGlobals({
    location: { hostname: 'localhost' },
    localStorage: makeStorage(),
    sessionStorage: makeStorage(),
    fetch: async (...args) => {
      calls.push(args);
      return response({ error: 'Key not found' }, { ok: false, status: 404 });
    },
  }, async () => {
    const { loadProfileVisits } = await loadFresh();
    assert.equal(await loadProfileVisits(), 0);
    assertRequest(calls[0], 'get');
  });
});

test('a 404 for hit or any non-missing-key 404 rejects', async () => {
  for (const { hostname, body, kind } of [
    { hostname: 'lufria.tech', body: { error: 'Key not found' }, kind: 'hit' },
    { hostname: 'localhost', body: { error: 'Some other error' }, kind: 'get' },
  ]) {
    const calls = [];
    await withGlobals({
      location: { hostname },
      localStorage: makeStorage(),
      sessionStorage: makeStorage(),
      fetch: async (...args) => { calls.push(args); return response(body, { ok: false, status: 404 }); },
    }, async () => {
      const { loadProfileVisits } = await loadFresh();
      await assert.rejects(loadProfileVisits(), /404/);
      assertRequest(calls[0], kind);
    });
  }
});

test('HTTP errors and invalid JSON reject, and a failed read can be retried', async () => {
  for (const firstResponse of [
    response({}, { ok: false, status: 503 }),
    response(null, { json: async () => { throw new SyntaxError('invalid JSON'); } }),
  ]) {
    let calls = 0;
    await withGlobals({
      location: { hostname: 'localhost' },
      localStorage: makeStorage(),
      sessionStorage: makeStorage(),
      fetch: async () => { calls += 1; return calls === 1 ? firstResponse : response({ value: 6 }); },
    }, async () => {
      const { loadProfileVisits } = await loadFresh();
      await assert.rejects(loadProfileVisits());
      assert.equal(await loadProfileVisits(), 6);
      assert.equal(calls, 2);
    });
  }
});

test('only nonnegative safe integer values and digit strings are accepted', async () => {
  for (const value of [0, 3, Number.MAX_SAFE_INTEGER, '0', '003', '9007199254740991']) {
    await withGlobals({
      location: { hostname: 'localhost' },
      localStorage: makeStorage(),
      sessionStorage: makeStorage(),
      fetch: async () => response({ value }),
    }, async () => {
      const { loadProfileVisits } = await loadFresh();
      assert.equal(await loadProfileVisits(), Number(value), `accepted ${String(value)}`);
    });
  }
});

test('null, empty, fractional, negative, nonnumeric, and unsafe values reject', async () => {
  for (const value of [null, '', ' ', 1.5, '1.5', -1, '-1', NaN, Infinity, 'NaN', '1e3', '9007199254740992', Number.MAX_SAFE_INTEGER + 1, undefined]) {
    await withGlobals({
      location: { hostname: 'localhost' },
      localStorage: makeStorage(),
      sessionStorage: makeStorage(),
      fetch: async () => response({ value }),
    }, async () => {
      const { loadProfileVisits } = await loadFresh();
      await assert.rejects(loadProfileVisits(), undefined, `rejected ${String(value)}`);
    });
  }
});
