// Isometric "skyline" geometry for the GitHub contribution calendar.
// Pure functions with no DOM access: ContributionSkyline renders what these return.

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

const round = (n) => Math.round(n * 100) / 100;
const points = (...pts) => pts.map(([x, y]) => `${round(x)},${round(y)}`).join(' ');

/**
 * Lays days out as Sunday-first week columns, like GitHub's calendar, and
 * projects each day to an isometric bar whose height grows with its count.
 *
 * `days` is oldest first: [{ date: 'YYYY-MM-DD', count, level }]. Only the most
 * recent `weeks` columns are drawn, right-aligned like GitHub's calendar.
 *
 * The drawing frame is fixed: it always spans `weeks` x 7 cells plus headroom
 * for the tallest possible bar, so width and height never depend on the data
 * and the loading placeholder takes exactly the space the live chart will.
 * Returns the bars in painter's order (back to front) in that frame.
 */
export function buildSkyline(
  days,
  { size = 7, maxHeight = size * 12, minHeight = size * 0.25, weeks = 53 } = {},
) {
  const cx = COS30 * size;
  const cy = SIN30 * size;
  const empty = { bars: [], width: 0, height: 0, cx, cy, minHeight, total: 0, activeDays: 0, peak: 0 };
  if (!days?.length) return empty;

  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const slotWeeks = Math.floor((days.length - 1 + firstWeekday) / 7) + 1;
  // > 0 drops the oldest columns; < 0 shifts a short calendar to the right edge.
  const weekShift = slotWeeks - weeks;

  const placed = days
    .map((day, i) => {
      const slot = i + firstWeekday;
      return { day, week: Math.floor(slot / 7) - weekShift, weekday: slot % 7 };
    })
    .filter((p) => p.week >= 0);

  const peak = Math.max(0, ...placed.map((p) => p.day.count || 0));
  const ceiling = minHeight + maxHeight; // the peak day's bar is exactly this tall

  // Frame offsets: the leftmost footprint corner (week 0, Saturday) sits at x = 0
  // and the top of a full-height bar in the back corner sits at y = 0.
  const offsetX = 7 * cx;
  const offsetY = ceiling;

  const bars = placed
    .map(({ day, week, weekday }) => {
      const count = day.count || 0;
      // sqrt keeps one huge day from flattening every other bar
      const h = count > 0 && peak > 0 ? minHeight + Math.sqrt(count / peak) * maxHeight : minHeight;
      return {
        date: day.date,
        count,
        level: day.level || 0,
        week,
        weekday,
        x: (week - weekday) * cx + offsetX,
        y: (week + weekday) * cy + offsetY,
        h,
      };
    })
    // Further back = smaller week + weekday; draw those first so nearer bars cover them.
    .sort((a, b) => a.week + a.weekday - (b.week + b.weekday) || a.week - b.week);

  // Totals describe every day passed in (the whole "last year"), not just the drawn columns.
  const counts = days.map((d) => d.count || 0);

  return {
    bars,
    width: (weeks + 7) * cx,
    height: (weeks + 7) * cy + ceiling,
    cx,
    cy,
    minHeight,
    total: counts.reduce((sum, c) => sum + c, 0),
    activeDays: counts.filter((c) => c > 0).length,
    peak,
  };
}

/**
 * SVG polygon points for the three visible faces of one bar at height `h`.
 * (x, y) is the back corner of the bar's footprint.
 */
export function barFaces({ x, y }, cx, cy, h) {
  return {
    top: points([x, y - h], [x + cx, y + cy - h], [x, y + 2 * cy - h], [x - cx, y + cy - h]),
    left: points([x - cx, y + cy - h], [x, y + 2 * cy - h], [x, y + 2 * cy], [x - cx, y + cy]),
    right: points([x + cx, y + cy - h], [x, y + 2 * cy - h], [x, y + 2 * cy], [x + cx, y + cy]),
  };
}

/** A year of empty days ending on `end`, used as the flat grid while data loads. */
export function placeholderDays(end = new Date(), length = 365) {
  const last = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  return Array.from({ length }, (_, i) => ({
    date: new Date(last - (length - 1 - i) * 86400000).toISOString().slice(0, 10),
    count: 0,
    level: 0,
  }));
}
