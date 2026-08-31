import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookMarked, Star, GitCommitHorizontal, Flame, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useCountUp, useInView } from '../lib/useInteractions';
import SplitText from './SplitText';
import './GithubContributions.css';

const GITHUB_USERNAME = 'Enricko';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
const WEEKS_IN_GRID = 53;
const STREAK_FLOOR_DAYS = 6;

// Cached fallback so the section still reads well before (or if) the live GitHub fetch resolves.
const FALLBACK_STATS = { repos: 16, stars: 28, followers: 6, live: false };
const FALLBACK_REPOS = [
  {
    name: 'Realtime Chatting App',
    description: 'A multi-platform real-time messaging application built with Flutter.',
    html_url: 'https://github.com/Enricko/Flutter-Realtime-ChattingApp',
    stargazers_count: 4,
    language: 'Dart',
  },
  {
    name: 'Dino Run with Flutter',
    description: 'An endless runner game inspired by the classic Dino Game, built with Flutter Flame.',
    html_url: 'https://github.com/Enricko/Dino-Run-with-Flutter',
    stargazers_count: 4,
    language: 'Dart',
  },
  {
    name: 'Saba Jogja',
    description: 'An interactive app with comprehensive information about Yogyakarta, built with Flutter.',
    html_url: 'https://github.com/Enricko/Saba-Jogja-Lomba-Web-Dev-Competition-Feb-2024',
    stargazers_count: 3,
    language: 'Dart',
  },
  {
    name: 'Flask-Restx-Template',
    description: 'A beginner-friendly repository to streamline API development with Python and Flask Rest-X.',
    html_url: 'https://github.com/Enricko/Flask-Restx-Template',
    stargazers_count: 3,
    language: 'Python',
  },
];

// Deterministic PRNG (mulberry32) so the generated activity pattern is stable across renders.
function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function levelFromCount(count) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { dateStyle: 'long' });
}

/**
 * Builds a GitHub-style 53-week activity grid ending today. Real per-day contribution
 * data requires an authenticated GraphQL call GitHub doesn't allow from the browser, so
 * this renders a seeded, deterministic activity pattern that stays consistent per day
 * while the metric cards above it (repos/stars) reflect live public API data.
 */
function buildContributionYear() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const gridEnd = new Date(today);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay())); // pad forward to Saturday
  const gridStart = new Date(gridEnd);
  gridStart.setDate(gridStart.getDate() - (WEEKS_IN_GRID * 7 - 1));

  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const random = mulberry32(seed);

  const days = [];
  for (let i = 0; i < WEEKS_IN_GRID * 7; i++) {
    const date = new Date(gridStart);
    date.setDate(date.getDate() + i);

    if (date > today) {
      days.push({ key: i, date: null, count: 0, level: 0, future: true });
      continue;
    }

    const daysFromToday = Math.round((today - date) / 86400000);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const activityChance = (daysFromToday < STREAK_FLOOR_DAYS ? 0.95 : 0.68) * (isWeekend ? 0.5 : 1);

    let count = 0;
    if (random() < activityChance) {
      const intensity = daysFromToday < STREAK_FLOOR_DAYS ? 0.35 + random() * 0.65 : random();
      count = Math.max(1, Math.round(intensity * intensity * 12));
    }

    days.push({
      key: i,
      date: localDateKey(date),
      count,
      level: levelFromCount(count),
      future: false,
    });
  }

  const weeks = [];
  for (let w = 0; w < days.length / 7; w++) weeks.push(days.slice(w * 7, w * 7 + 7));

  const totalContributions = days.reduce((sum, d) => sum + d.count, 0);

  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (day.future) continue;
    if (day.count > 0) currentStreak++;
    else break;
  }

  let longestStreak = 0;
  let running = 0;
  days.forEach((day) => {
    if (day.future) return;
    if (day.count > 0) {
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
  });

  return { weeks, totalContributions, currentStreak, longestStreak };
}

function MetricCard({ icon, value, suffix = '', label, accent, active }) {
  const n = useCountUp(value, active);
  return (
    <div className={`glass-card metric-card accent-${accent}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-body">
        <span className="metric-value">{n}{suffix}</span>
        <span className="metric-label">{label}</span>
      </div>
    </div>
  );
}

export default function GithubContributions() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [filter, setFilter] = useState('starred');
  const [activeDay, setActiveDay] = useState(null);
  const [keyboardDayKey, setKeyboardDayKey] = useState(null);
  const [metricsRef, metricsInView] = useInView({ threshold: 0.3 });
  const heatmapScrollRef = useRef(null);
  const heatmapCellRefs = useRef(new Map());

  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const { weeks, totalContributions, currentStreak } = useMemo(buildContributionYear, []);
  const calendarDays = useMemo(() => weeks.flat().filter((day) => !day.future), [weeks]);
  const dayIndexByKey = useMemo(
    () => new Map(calendarDays.map((day, index) => [day.key, index])),
    [calendarDays],
  );
  const rovingDayKey = keyboardDayKey ?? calendarDays.at(-1)?.key;

  useEffect(() => {
    let cancelled = false;

    async function loadGithubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');

        const profile = await profileRes.json();
        const repoList = await reposRes.json();
        if (cancelled || !Array.isArray(repoList)) return;

        const ownedRepos = repoList.filter((r) => !r.fork);
        const totalStars = ownedRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

        setStats({
          repos: profile.public_repos ?? ownedRepos.length,
          stars: totalStars,
          followers: profile.followers ?? 0,
          live: true,
        });
        setRepos(ownedRepos.length ? ownedRepos : FALLBACK_REPOS);
      } catch (err) {
        console.warn('GithubContributions: showing cached stats, live fetch failed:', err.message);
      }
    }

    loadGithubData();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const scrollToLatest = () => {
      const scroller = heatmapScrollRef.current;
      if (scroller) scroller.scrollLeft = scroller.scrollWidth - scroller.clientWidth;
    };
    const frame = requestAnimationFrame(scrollToLatest);
    window.addEventListener('resize', scrollToLatest);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', scrollToLatest);
    };
  }, []);

  const topRepos = useMemo(() => {
    const sorted = [...repos];
    if (filter === 'starred') {
      sorted.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    } else {
      sorted.sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));
    }
    return sorted.slice(0, 4);
  }, [repos, filter]);

  const focusCalendarDay = (index) => {
    const day = calendarDays[index];
    if (!day) return;

    setKeyboardDayKey(day.key);
    setActiveDay(day);
    requestAnimationFrame(() => {
      const cell = heatmapCellRefs.current.get(day.key);
      cell?.focus({ preventScroll: true });
      cell?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  };

  const handleCalendarKeyDown = (event, day) => {
    const index = dayIndexByKey.get(day.key);
    if (index === undefined) return;

    let nextIndex;
    if (event.key === 'ArrowLeft') nextIndex = index - 7;
    else if (event.key === 'ArrowRight') nextIndex = index + 7;
    else if (event.key === 'ArrowUp') nextIndex = index - 1;
    else if (event.key === 'ArrowDown') nextIndex = index + 1;
    else if (event.key === 'Home') nextIndex = event.ctrlKey ? 0 : index - (index % 7);
    else if (event.key === 'End') nextIndex = event.ctrlKey ? calendarDays.length - 1 : Math.min(index + (6 - (index % 7)), calendarDays.length - 1);
    else return;

    event.preventDefault();
    focusCalendarDay(nextIndex);
  };

  return (
    <section id="contributions" className="contributions">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// open source</span>
          <SplitText as="h2" text="GitHub Contributions" className="section-title" />
        </div>
        <p className="contributions-desc text-muted reveal-on-scroll delay-100">
          Public repository totals load from GitHub&apos;s public API when available and use a cached snapshot otherwise. The daily calendar and its activity totals are synthetic—not Enricko&apos;s contribution history.
        </p>

        <div className="metrics-grid reveal-on-scroll delay-100" ref={metricsRef}>
          <MetricCard
            icon={<BookMarked size={22} />}
            value={stats.repos}
            label="Public repositories"
            accent="cyan"
            active={metricsInView}
          />
          <MetricCard
            icon={<Star size={22} />}
            value={stats.stars}
            label="Public repo stars"
            accent="pink"
            active={metricsInView}
          />
          <MetricCard
            icon={<GitCommitHorizontal size={22} />}
            value={totalContributions}
            label="Synthetic activity total"
            accent="violet"
            active={metricsInView}
          />
          <MetricCard
            icon={<Flame size={22} />}
            value={currentStreak}
            suffix=" days"
            label="Synthetic streak"
            accent="cyan"
            active={metricsInView}
          />
        </div>

        <div className="glass-card heatmap-card reveal-on-scroll delay-200">
          <div className="heatmap-head">
            <div>
              <h3>Contribution Activity</h3>
              <p className="text-muted heatmap-summary">Interactive synthetic contribution pattern</p>
            </div>
            <div className="heatmap-statuses">
              <span className={`live-badge ${stats.live ? 'is-live' : ''}`}>
                <span className="live-dot" /> {stats.live ? 'Repository totals live' : 'Repository totals cached'}
              </span>
              <span className="live-badge synthetic-badge">Daily calendar synthetic</span>
            </div>
          </div>

          <p id="heatmap-disclosure" className="data-disclosure">
            Every calendar cell, activity total, and streak is generated demo data. Repository and star totals are {stats.live ? 'live public GitHub data' : 'the cached public snapshot'}.
          </p>

          <p id="heatmap-instructions" className="heatmap-instructions">
            Scroll horizontally for the full year. Keyboard users can enter on the latest day, then use arrow keys to move between dates.
          </p>

          <div
            className="heatmap-scroll"
            ref={heatmapScrollRef}
            onPointerLeave={() => {
              const focusedCell = activeDay && heatmapCellRefs.current.get(activeDay.key);
              if (focusedCell !== document.activeElement) setActiveDay(null);
            }}
          >
            <div
              className="heatmap-grid"
              role="group"
              aria-label="Synthetic daily contribution calendar"
              aria-describedby="heatmap-disclosure heatmap-instructions"
            >
              {weeks.map((week, wi) => (
                <div className="heatmap-col" key={wi}>
                  {week.map((day) => (
                    day.future ? <span key={day.key} className="heatmap-cell is-future" /> : <button
                      key={day.key}
                      ref={(element) => {
                        if (element) heatmapCellRefs.current.set(day.key, element);
                        else heatmapCellRefs.current.delete(day.key);
                      }}
                      type="button"
                      className={`heatmap-cell level-${day.level}`}
                      tabIndex={day.key === rovingDayKey ? 0 : -1}
                      aria-label={`${day.count} synthetic ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(day.date)}`}
                      aria-describedby={activeDay?.key === day.key ? 'contribution-tooltip' : undefined}
                      aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight Home End"
                      onPointerEnter={() => setActiveDay(day)}
                      onPointerLeave={(event) => {
                        if (event.currentTarget !== document.activeElement) setActiveDay(null);
                      }}
                      onFocus={() => { setKeyboardDayKey(day.key); setActiveDay(day); }}
                      onBlur={() => setActiveDay(null)}
                      onClick={() => { setKeyboardDayKey(day.key); setActiveDay(day); }}
                      onKeyDown={(event) => handleCalendarKeyDown(event, day)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div id="contribution-tooltip" className={`contribution-tooltip ${activeDay ? 'active' : ''}`} role="tooltip" aria-live="polite" aria-atomic="true">
            {activeDay && <><strong>{formatDate(activeDay.date)}</strong><span>{activeDay.count} synthetic {activeDay.count === 1 ? 'contribution' : 'contributions'}</span></>}
          </div>

          <div className="heatmap-legend" aria-hidden="true">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <span key={level} className={`heatmap-cell level-${level}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="repo-highlights reveal-on-scroll delay-300">
          <div className="repo-highlights-head">
            <h3>Top Repositories</h3>
            <div className="repo-filter" role="group" aria-label="Sort top repositories">
              <button
                type="button"
                aria-pressed={filter === 'starred'}
                className={filter === 'starred' ? 'is-active' : ''}
                onClick={() => setFilter('starred')}
              >
                Most Starred
              </button>
              <button
                type="button"
                aria-pressed={filter === 'recent'}
                className={filter === 'recent' ? 'is-active' : ''}
                onClick={() => setFilter('recent')}
              >
                Recently Active
              </button>
            </div>
          </div>

          <div className="repo-grid">
            {topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass-card spotlight repo-card"
                onMouseMove={handleMouseMove}
                aria-label={`View ${repo.name} on GitHub`}
              >
                <div className="repo-card-head">
                  <span className="repo-icon"><FaGithub size={18} /></span>
                  <span className="repo-stars"><Star size={13} className="star-icon" /> {repo.stargazers_count ?? 0}</span>
                </div>
                <h4 className="repo-name">{repo.name}</h4>
                <p className="repo-desc text-muted">{repo.description || 'No description provided.'}</p>
                <div className="repo-card-footer">
                  {repo.language && <span className="repo-lang"><span className="lang-dot" /> {repo.language}</span>}
                  <span className="repo-open">View <ExternalLink size={13} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="contributions-cta reveal-on-scroll delay-300">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
            <FaGithub size={18} /> Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
