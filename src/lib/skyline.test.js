import test from 'node:test';
import assert from 'node:assert/strict';
import { barFaces, buildSkyline, placeholderDays } from './skyline.js';

const pointList = (face) => face.split(' ').map((point) => point.split(',').map(Number));

test('buildSkyline returns a zero-size result for empty or undefined input', () => {
  for (const days of [undefined, []]) {
    const result = buildSkyline(days);
    assert.deepEqual(result.bars, []);
    assert.equal(result.width, 0);
    assert.equal(result.height, 0);
    assert.equal(result.total, 0);
    assert.equal(result.activeDays, 0);
    assert.equal(result.peak, 0);
  }
});

test('buildSkyline keeps the drawing frame fixed across loading, sparse, zero, and oldest-day spike data', () => {
  const placeholder = placeholderDays();
  const sparse = placeholder.map((day, index) => ({
    ...day,
    count: index % 37 === 0 ? (index % 5) + 1 : 0,
  }));
  const allZero = placeholder.map((day) => ({ ...day }));
  const oldestSpike = sparse.map((day) => ({ ...day }));
  oldestSpike[0].count = 100000;

  const results = [placeholder, sparse, allZero, oldestSpike].map((days) => buildSkyline(days));
  const cx = Math.cos(Math.PI / 6) * 7;
  const cy = Math.sin(Math.PI / 6) * 7;
  const expectedWidth = (53 + 7) * cx;
  const expectedHeight = (53 + 7) * cy + (7 * 0.25 + 7 * 12);

  for (const result of results) {
    assert.equal(result.width, expectedWidth);
    assert.equal(result.height, expectedHeight);
  }
  const dimensions = results.map(({ width, height }) => [width, height]);
  assert.ok(dimensions.slice(1).every(([width, height]) =>
    width === dimensions[0][0] && height === dimensions[0][1]));
});

test('buildSkyline draws only the latest weeks but totals every input day', () => {
  const start = Date.UTC(2026, 0, 4); // Sunday, so each group of seven is one column.
  const days = Array.from({ length: 60 * 7 }, (_, index) => ({
    date: new Date(start + index * 86400000).toISOString().slice(0, 10),
    count: index === 0 ? 500 : index >= 7 * 7 && index % 7 === 0 ? 1 : 0,
  }));
  const result = buildSkyline(days, { weeks: 53 });

  assert.equal(result.bars.length, 53 * 7);
  assert.equal(result.bars[0].date, days[7 * 7].date);
  assert.ok(result.bars.every((bar) => new Date(`${bar.date}T00:00:00Z`) >= new Date(`${days[7 * 7].date}T00:00:00Z`)));
  assert.equal(result.total, days.reduce((sum, day) => sum + day.count, 0));
  assert.equal(result.activeDays, days.filter((day) => day.count > 0).length);
  assert.equal(result.peak, 1, 'a dropped older spike does not set the drawn peak');
});

test('buildSkyline right-aligns a short calendar in the fixed week frame', () => {
  const days = Array.from({ length: 10 }, (_, index) => ({
    date: new Date(Date.UTC(2026, 0, 4 + index)).toISOString().slice(0, 10),
    count: index,
  }));
  const weeks = 53;
  const result = buildSkyline(days, { weeks });

  assert.equal(Math.max(...result.bars.map((bar) => bar.week)), weeks - 1);
  assert.equal(Math.min(...result.bars.map((bar) => bar.week)), weeks - 2);
  assert.ok(result.bars.every((bar) => bar.week >= weeks - 2));
});

test('buildSkyline places every day into a Sunday-first week column and sorts bars back to front', () => {
  const days = Array.from({ length: 16 }, (_, i) => ({
    date: new Date(Date.UTC(2026, 0, 4 + i)).toISOString().slice(0, 10),
    count: i + 1,
    level: 1,
  }));
  const result = buildSkyline(days);

  assert.equal(result.bars.length, days.length);
  assert.deepEqual(
    result.bars.map((bar) => bar.week + bar.weekday),
    [...result.bars].map((bar) => bar.week + bar.weekday).sort((a, b) => a - b),
  );

  const firstDay = result.bars.find((bar) => bar.date === days[0].date);
  assert.equal(firstDay.weekday, new Date(`${days[0].date}T00:00:00Z`).getUTCDay());
});

test('buildSkyline keeps every projected face inside its drawing bounds', () => {
  const days = Array.from({ length: 35 }, (_, i) => ({
    date: new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10),
    count: (i * 7) % 19,
    level: i % 5,
  }));
  const result = buildSkyline(days, { size: 8, maxHeight: 92, minHeight: 2 });

  for (const bar of result.bars) {
    for (const face of Object.values(barFaces(bar, result.cx, result.cy, bar.h))) {
      for (const [x, y] of pointList(face)) {
        assert.ok(x >= -0.01 && x <= result.width + 0.01, `x=${x} outside [0, ${result.width}]`);
        assert.ok(y >= -0.01 && y <= result.height + 0.01, `y=${y} outside [0, ${result.height}]`);
      }
    }
  }
});

test('buildSkyline scales heights with counts and reports totals and active days', () => {
  const days = [
    { date: '2026-01-04', count: 0, level: 0 },
    { date: '2026-01-05', count: 1, level: 1 },
    { date: '2026-01-06', count: 4, level: 2 },
    { date: '2026-01-07', count: 9, level: 3 },
  ];
  const result = buildSkyline(days, { size: 8, maxHeight: 80, minHeight: 2 });
  const byCount = [...result.bars].sort((a, b) => a.count - b.count);

  assert.equal(result.bars.length, days.length);
  assert.equal(byCount[0].h, result.minHeight);
  assert.equal(byCount.at(-1).h, result.minHeight + 80);
  for (let i = 1; i < byCount.length; i += 1) assert.ok(byCount[i].h >= byCount[i - 1].h);
  assert.equal(result.total, 14);
  assert.equal(result.activeDays, 3);
  assert.equal(result.peak, 9);
});

test('buildSkyline treats missing count and level as zero', () => {
  const result = buildSkyline([
    { date: '2026-01-04' },
    { date: '2026-01-05', count: 2 },
  ]);

  const missing = result.bars.find((bar) => bar.date === '2026-01-04');
  assert.equal(missing.count, 0);
  assert.equal(missing.level, 0);
  assert.equal(missing.h, result.minHeight);
  assert.equal(result.total, 2);
  assert.equal(result.activeDays, 1);
});

test('buildSkyline handles an all-zero calendar without NaN values', () => {
  const result = buildSkyline([
    { date: '2026-01-04', count: 0 },
    { date: '2026-01-05', count: 0 },
    { date: '2026-01-06', count: 0 },
  ]);

  assert.equal(result.peak, 0);
  assert.equal(result.total, 0);
  assert.equal(result.activeDays, 0);
  assert.ok(result.bars.every((bar) => bar.h === result.minHeight));
  const visit = (value) => {
    if (typeof value === 'number') assert.ok(Number.isFinite(value), `non-finite value: ${value}`);
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === 'object') Object.values(value).forEach(visit);
  };
  visit(result);
});

test('barFaces returns four finite points for every face', () => {
  const faces = barFaces({ x: 14, y: 22 }, 6, 3, 11);
  for (const face of Object.values(faces)) {
    const points = pointList(face);
    assert.equal(points.length, 4);
    for (const point of points) {
      assert.equal(point.length, 2);
      assert.ok(point.every(Number.isFinite));
    }
  }
});

test('barFaces top at zero height matches the bar footprint', () => {
  const bar = { x: 14, y: 22 };
  const cx = 6;
  const cy = 3;
  const top = pointList(barFaces(bar, cx, cy, 0).top);
  assert.deepEqual(top, [[14, 22], [20, 25], [14, 28], [8, 25]]);
});

test('placeholderDays returns consecutive ascending UTC dates ending on the requested UTC date', () => {
  const days = placeholderDays(new Date('2026-03-01T23:30:00-05:00'), 9);
  assert.equal(days.length, 9);
  assert.equal(days.at(-1).date, '2026-03-02');
  assert.ok(days.every((day) => day.count === 0));
  for (let i = 1; i < days.length; i += 1) {
    const previous = Date.parse(`${days[i - 1].date}T00:00:00Z`);
    const current = Date.parse(`${days[i].date}T00:00:00Z`);
    assert.equal(current - previous, 86400000);
  }
});

test('placeholderDays handles a DST-free UTC month boundary', () => {
  const days = placeholderDays(new Date('2026-03-01T00:00:00Z'), 3);
  assert.deepEqual(days.map((day) => day.date), ['2026-02-27', '2026-02-28', '2026-03-01']);
});
