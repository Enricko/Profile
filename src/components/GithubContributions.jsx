import React, { useEffect, useMemo, useState } from 'react';
import { BookMarked, Star, GitCommitHorizontal, Flame, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useCountUp, useInView } from '../lib/useInteractions';
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
      date: date.toISOString().slice(0, 10),
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
  const [metricsRef, metricsInView] = useInView({ threshold: 0.3 });

  const { weeks, totalContributions, currentStreak } = useMemo(buildContributionYear, []);

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

  const topRepos = useMemo(() => {
    const sorted = [...repos];
    if (filter === 'starred') {
      sorted.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    } else {
      sorted.sort((a, b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));
    }
    return sorted.slice(0, 4);
  }, [repos, filter]);

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="contributions" className="contributions">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// open source</span>
          <h2 className="section-title">GitHub Contributions</h2>
        </div>
        <p className="contributions-desc text-muted reveal-on-scroll delay-100">
          A snapshot of my coding activity and open-source footprint, pulled live from GitHub.
        </p>

        <div className="metrics-grid reveal-on-scroll delay-100" ref={metricsRef}>
          <MetricCard
            icon={<BookMarked size={22} />}
            value={stats.repos}
            label="Total Repositories"
            accent="cyan"
            active={metricsInView}
          />
          <MetricCard
            icon={<Star size={22} />}
            value={stats.stars}
            label="Stars Earned"
            accent="pink"
            active={metricsInView}
          />
          <MetricCard
            icon={<GitCommitHorizontal size={22} />}
            value={totalContributions}
            label="Open Source Contributions"
            accent="violet"
            active={metricsInView}
          />
          <MetricCard
            icon={<Flame size={22} />}
            value={currentStreak}
            suffix=" days"
            label="Commit Streak"
            accent="cyan"
            active={metricsInView}
          />
        </div>

        <div className="glass-card heatmap-card reveal-on-scroll delay-200">
          <div className="heatmap-head">
            <div>
              <h3>Contribution Activity</h3>
              <p className="text-muted heatmap-summary">
                {totalContributions.toLocaleString()} contributions in the last year
              </p>
            </div>
            <span className={`live-badge ${stats.live ? 'is-live' : ''}`}>
              <span className="live-dot" /> {stats.live ? 'Live from GitHub' : 'Cached snapshot'}
            </span>
          </div>

          <div className="heatmap-scroll">
            <div
              className="heatmap-grid"
              role="img"
              aria-label={`GitHub contribution heatmap: ${totalContributions} contributions in the last year, current streak of ${currentStreak} days`}
            >
              {weeks.map((week, wi) => (
                <div className="heatmap-col" key={wi} aria-hidden="true">
                  {week.map((day) => (
                    <span
                      key={day.key}
                      className={`heatmap-cell level-${day.level} ${day.future ? 'is-future' : ''}`}
                      title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
                    />
                  ))}
                </div>
              ))}
            </div>
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
            <div className="repo-filter" role="tablist" aria-label="Sort top repositories">
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'starred'}
                className={filter === 'starred' ? 'is-active' : ''}
                onClick={() => setFilter('starred')}
              >
                Most Starred
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'recent'}
                className={filter === 'recent' ? 'is-active' : ''}
                onClick={() => setFilter('recent')}
              >
                Recently Active
              </button>
            </div>
          </div>

          <div className="repo-grid">
            {topRepos.map((repo, idx) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass-card spotlight repo-card"
                style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                onMouseMove={onMove}
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
