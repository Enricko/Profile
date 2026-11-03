import { useEffect, useState } from 'react';
import { fetchContributions, getContributionsSnapshot, isContributionsFresh } from './contributions';

const sameDays = (a, b) =>
  a === b ||
  (a.length === b.length &&
    a.every((d, i) => d.date === b[i].date && d.count === b[i].count && d.level === b[i].level));

// Moves state to `next`, keeping the existing days array when the days are the
// same, and the existing state (so no re-render) when nothing changed at all.
const syncTo = (next) => (prev) => {
  if (!sameDays(prev.days, next.days)) return next;
  if (prev.source === next.source && prev.updatedAt === next.updatedAt) return prev;
  return { ...next, days: prev.days };
};

/**
 * The contribution calendar for a component: genuine data on the first render
 * (this visit's live data, a saved earlier visit, or the bundled snapshot),
 * then refreshed from GitHub in the background unless the saved copy is fresh.
 * Returns { days, source: 'live' | 'cache' | 'snapshot', updatedAt }.
 *
 * A refresh that brings the same days keeps the existing array, so charts
 * keyed on it don't redraw; a failed refresh keeps whatever is showing.
 */
export function useContributions() {
  const [state, setState] = useState(getContributionsSnapshot);

  useEffect(() => {
    // Data can land between the first render and this effect (a save made by
    // another component, or the shared request finishing), so show what's
    // current now and judge freshness from that same record. syncTo returns
    // the previous state when nothing changed, so this normally doesn't re-render.
    const current = getContributionsSnapshot();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(syncTo(current));
    if (isContributionsFresh(current)) return undefined;

    let cancelled = false;
    fetchContributions()
      .then(() => {
        if (!cancelled) setState(syncTo(getContributionsSnapshot()));
      })
      .catch((err) => {
        console.warn('Contribution calendar: refresh failed, keeping saved activity:', err.message);
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
