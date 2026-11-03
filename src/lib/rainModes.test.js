import test from 'node:test';
import assert from 'node:assert/strict';
import { access, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { rollRainMode } from './rainModes.js';

const knownModes = ['none', 'neon', 'calico', 'faces', 'skills', 'chibi'];
const withRandom = async (value, callback) => {
  const originalRandom = Math.random;
  Math.random = () => value;
  try {
    await callback();
  } finally {
    Math.random = originalRandom;
  }
};

test('rollRainMode returns only known mode ids, including chibi', async () => {
  const samples = [0, 0.1, 0.25, 0.4, 0.6, 0.9];
  for (const sample of samples) {
    await withRandom(sample, () => assert.ok(knownModes.includes(rollRainMode())));
  }

  await withRandom(0.9, () => assert.equal(rollRainMode(), 'chibi'));
});

test('rollRainMode never returns the excluded mode', async () => {
  for (const excluded of knownModes) {
    await withRandom(0.5, () => assert.notEqual(rollRainMode(excluded), excluded));
  }
});

test('chibi is reachable with and without excluding skills', async () => {
  await withRandom(0.9, () => assert.equal(rollRainMode(), 'chibi'));
  await withRandom(0.9, () => assert.equal(rollRainMode('skills'), 'chibi'));
});

test('skills is selected about twice as often as each weight-one mode', async () => {
  const counts = Object.fromEntries(knownModes.map((mode) => [mode, 0]));
  const samples = 6000;
  for (let i = 0; i < samples; i += 1) {
    await withRandom(i / samples, () => {
      counts[rollRainMode()] += 1;
    });
  }

  for (const mode of knownModes.filter((id) => id !== 'skills')) {
    assert.ok(Math.abs(counts.skills - 2 * counts[mode]) <= 2,
      `skills=${counts.skills}, ${mode}=${counts[mode]}`);
  }
});

test('a random value just below one still returns a valid mode id', async () => {
  await withRandom(1 - Number.EPSILON, () => {
    assert.ok(knownModes.includes(rollRainMode()));
  });
});

test('all twelve chibi rain sprite files exist and are non-empty', async () => {
  const rainDirectory = fileURLToPath(new URL('../../public/rain/', import.meta.url));
  for (let index = 1; index <= 12; index += 1) {
    const filename = `chibi-${String(index).padStart(2, '0')}.webp`;
    const filepath = new URL(filename, `file://${rainDirectory}/`);
    await access(filepath);
    const details = await stat(filepath);
    assert.ok(details.isFile(), `${filename} should be a file`);
    assert.ok(details.size > 0, `${filename} should be non-empty`);
  }
});
