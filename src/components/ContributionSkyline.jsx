import React, { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GITHUB_URL } from '../lib/contributions';
import { useContributions } from '../lib/useContributions';
import { buildSkyline, barFaces, placeholderDays } from '../lib/skyline';
import './ContributionSkyline.css';

const BAR_SIZE = 7;
const RISE_MS = 1400;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const formatDay = (ms) => new Date(ms).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' });

// The ~1,100 polygons render only when the data changes.
const SkylineBars = memo(function SkylineBars({ sky, labelled }) {
  return sky.bars.map((bar) => {
    const f = barFaces(bar, sky.cx, sky.cy, bar.h);
    return (
      <g key={bar.date} className={`sky-bar l${bar.level}`}>
        <polygon className="sky-left" points={f.left} />
        <polygon className="sky-right" points={f.right} />
        <polygon className="sky-top" points={f.top} />
        {labelled && <title>{`${bar.count} contribution${bar.count === 1 ? '' : 's'} on ${bar.date}`}</title>}
      </g>
    );
  });
});

/**
 * Hero visual: the last year of GitHub contributions as an isometric 3D
 * skyline. Draws genuine saved activity at full height straight away and
 * swaps in live data when GitHub answers; a flat grid only if no calendar is
 * available at all.
 */
export default function ContributionSkyline() {
  const { days, source, updatedAt } = useContributions();
  const hasData = days.length > 0;
  const isLive = source === 'live';
  const svgRef = useRef(null);
  const drawnHeights = useRef(null); // date -> bar height currently on screen, once drawn

  const placeholder = useMemo(() => placeholderDays(), []);
  const sky = useMemo(() => buildSkyline(hasData ? days : placeholder, { size: BAR_SIZE }), [hasData, days, placeholder]);

  // The first calendar is drawn at full height as rendered, so saved activity
  // is readable at once. When newer data arrives, bars ease from the height
  // they're drawn at to their new height, so only the days that changed move
  // (a newly added day rises from flat). Points are written straight to the
  // DOM each frame so React doesn't re-render ~1,100 polygons per frame; this
  // runs before paint, so no flash.
  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const groups = svg.querySelectorAll('.sky-bar');
    const before = drawnHeights.current;
    const from = sky.bars.map((bar) => (before ? before.get(bar.date) ?? sky.minHeight : bar.h));
    const drawn = from.slice();
    const draw = (k) => {
      groups.forEach((g, i) => {
        const bar = sky.bars[i];
        drawn[i] = k === 1 ? bar.h : from[i] + (bar.h - from[i]) * k;
        const f = barFaces(bar, sky.cx, sky.cy, drawn[i]);
        g.children[0].setAttribute('points', f.left);
        g.children[1].setAttribute('points', f.right);
        g.children[2].setAttribute('points', f.top);
      });
    };
    const remember = () => {
      drawnHeights.current = new Map(sky.bars.map((bar, i) => [bar.date, drawn[i]]));
    };

    if (from.every((h, i) => h === sky.bars[i].h)) {
      remember(); // already on screen at these heights
      return undefined;
    }
    if (!hasData || prefersReducedMotion()) {
      draw(1);
      remember();
      return undefined;
    }

    draw(0);
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / RISE_MS, 1);
      draw(1 - Math.pow(1 - p, 3)); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      remember(); // a newer calendar picks up from wherever these bars stopped
    };
  }, [hasData, sky]);

  const savedOn = updatedAt ? formatDay(updatedAt) : null;
  const label = hasData
    ? `GitHub contributions over the last year as a 3D chart: ${sky.total.toLocaleString()} contributions on ${sky.activeDays} days${isLive ? '' : `, saved ${savedOn}`}`
    : 'GitHub contribution chart';

  return (
    <figure className={`skyline ${hasData ? 'has-data' : 'is-placeholder'}`}>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        className={`pill skyline-source ${isLive ? 'pill-accent' : ''}`}
        title={hasData && !isLive ? `Saved from GitHub on ${savedOn}` : undefined}
      >
        {isLive && <><span className="live-dot" aria-hidden="true" /> Live from GitHub</>}
        {!isLive && <>{hasData ? 'Saved GitHub activity' : 'View on GitHub'} <ArrowUpRight size={13} aria-hidden="true" /></>}
      </a>

      <svg
        ref={svgRef}
        className="skyline-svg"
        viewBox={`0 0 ${sky.width.toFixed(2)} ${sky.height.toFixed(2)}`}
        role="img"
        aria-label={label}
      >
        <SkylineBars sky={sky} labelled={hasData} />
      </svg>

      <figcaption className="skyline-caption">
        {hasData ? (
          <>
            <span className="skyline-total">{sky.total.toLocaleString()}</span>
            <span className="skyline-label">contributions in the last year</span>
          </>
        ) : (
          <span className="skyline-label">My GitHub activity, one bar per day</span>
        )}
      </figcaption>
    </figure>
  );
}
