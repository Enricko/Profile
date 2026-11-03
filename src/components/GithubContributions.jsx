import React, { useEffect, useMemo, useState } from 'react';
import { BookMarked, Star, GitCommitHorizontal, CalendarDays, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useCountUp, useInView } from '../lib/useInteractions';
import { GITHUB_USERNAME, GITHUB_URL } from '../lib/contributions';
import { useContributions } from '../lib/useContributions';
import SectionHead from './SectionHead';
import './GithubContributions.css';

const WEEKS_IN_GRID = 53;

// Shown only if the live repo list can't be fetched.
const FALLBACK_REPOS = [
  {
    name: 'Flutter-Realtime-ChattingApp',
    description: 'A multi-platform real-time messaging application built with Flutter.',
    html_url: 'https://github.com/Enricko/Flutter-Realtime-ChattingApp',
    stargazers_count: 4,
    language: 'Dart',
    pushed_at: '2023-06-14T00:00:00Z',
  },
  {
    name: 'Dino-Run-with-Flutter',
    description: 'An endless runner game inspired by the classic Dino Game, built with Flutter Flame.',
    html_url: 'https://github.com/Enricko/Dino-Run-with-Flutter',
    stargazers_count: 4,
    language: 'Dart',
    pushed_at: '2023-05-30T00:00:00Z',
  },
  {
    name: 'Saba-Jogja',
    description: 'An interactive app with comprehensive information about Yogyakarta, built with Flutter.',
    html_url: 'https://github.com/Enricko/Saba-Jogja-Lomba-Web-Dev-Competition-Feb-2024',
    stargazers_count: 3,
    language: 'Dart',
    pushed_at: '2024-03-05T00:00:00Z',
  },
  {
    name: 'Flask-Restx-Template',
    description: 'A beginner-friendly repository to streamline API development with Python and Flask Rest-X.',
    html_url: 'https://github.com/Enricko/Flask-Restx-Template',
    stargazers_count: 3,
    language: 'Python',
    pushed_at: '2024-02-27T00:00:00Z',
  },
  {
    name: 'lufria-monitor',
    description: 'Self-hosted monitoring dashboard for a Linux home server: live stats, power use in kWh and Rupiah, passkey sign-in, browser terminal.',
    html_url: 'https://github.com/Enricko/lufria-monitor',
    stargazers_count: 1,
    language: 'TypeScript',
    pushed_at: '2026-10-29T00:00:00Z',
  },
];

// Profile plumbing, not projects: the profile-README repo and a repo that is
// public but describes itself as private.
const HIDDEN_REPOS = new Set([GITHUB_USERNAME, 'hermes-skills']);

// Most repos have no description; a card that says "No description provided"
// undersells the work, so only described repos are eligible.
const isShowcaseRepo = (r) => !r.fork && !r.archived && !!r.description?.trim() && !HIDDEN_REPOS.has(r.name);

// GitHub's own language colors, for the dot on each card.
const LANGUAGE_COLORS = {
  Dart: '#00B4AB',
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Go: '#00ADD8',
  PHP: '#4F5D95',
  Blade: '#F7523F',
  Swift: '#F05138',
  Rust: '#DEA584',
  'C++': '#F34B7D',
  'C#': '#178600',
  C: '#8B8B94',
  HTML: '#E34C26',
  CSS: '#663399',
  'Jupyter Notebook': '#DA5B0B',
};

const repoTitle = (name) => name.replace(/[-_]+/g, ' ');
const pushedTime = (r) => new Date(r.pushed_at || 0).getTime();
const formatUpdated = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en', { month: 'short', year: 'numeric' }) : null;
const formatDay = (ms) => new Date(ms).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * Lays the API's day list out as Sunday-first week columns, like GitHub does.
 * Every number shown comes from the real calendar — nothing is generated.
 */
function buildCalendar(days) {
  const cells = [];
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < firstWeekday; i++) cells.push({ key: `pad-${i}`, empty: true });
  days.forEach((d) => cells.push({ key: d.date, date: d.date, count: d.count, level: d.level }));
  while (cells.length % 7) cells.push({ key: `end-${cells.length}`, empty: true });

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return {
    weeks: weeks.slice(-WEEKS_IN_GRID),
    total: days.reduce((sum, d) => sum + d.count, 0),
    activeDays: days.filter((d) => d.count > 0).length,
  };
}

function MetricCard({ icon, value, label, active }) {
  // Counts up once, to the value showing when the card scrolls into view; a
  // later refresh (saved activity replaced by live) then shows as-is.
  const [countTo, setCountTo] = useState(null);
  if (countTo == null && active && value != null) setCountTo(value);
  const n = useCountUp(countTo ?? 0, countTo != null);
  const shown = countTo != null && n === countTo ? value : n;
  return (
    <div className="metric">
      <span className="metric-label">{icon} {label}</span>
      <span className="metric-value">{value == null ? '—' : shown.toLocaleString()}</span>
    </div>
  );
}

export default function GithubContributions() {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const { days, source, updatedAt } = useContributions();
  const [filter, setFilter] = useState('starred');
  const [metricsRef, metricsInView] = useInView({ threshold: 0.3 });

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
        setStats({
          repos: profile.public_repos ?? ownedRepos.length,
          stars: ownedRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
        });
        const showcase = ownedRepos.filter(isShowcaseRepo);
        if (showcase.length >= 4) setRepos(showcase);
      } catch (err) {
        console.warn('GithubContributions: repo stats unavailable:', err.message);
      }
    }

    loadGithubData();
    return () => { cancelled = true; };
  }, []);

  const topRepos = useMemo(() => {
    const sorted = [...repos];
    if (filter === 'starred') {
      // Many repos tie on stars; the more recently active one wins the tie.
      sorted.sort((a, b) =>
        (b.stargazers_count || 0) - (a.stargazers_count || 0) || pushedTime(b) - pushedTime(a));
    } else {
      sorted.sort((a, b) => pushedTime(b) - pushedTime(a));
    }
    return sorted.slice(0, 4);
  }, [repos, filter]);

  const cal = useMemo(() => (days.length ? buildCalendar(days) : null), [days]);
  const isLive = source === 'live';
  const savedOn = updatedAt ? formatDay(updatedAt) : null;
  const placeholderWeeks = useMemo(
    () => Array.from({ length: WEEKS_IN_GRID }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => ({ key: `ph-${w}-${d}`, empty: true }))),
    []
  );

  return (
    <section id="contributions" className="contributions">
      <div className="container">
        <SectionHead
          index="06"
          label="Open Source"
          title={<>Building in the <em>open</em></>}
        >
          My public GitHub footprint, kept up to date from GitHub.
        </SectionHead>

        <div className="metrics reveal-on-scroll delay-100" ref={metricsRef}>
          <MetricCard icon={<BookMarked size={14} />} value={stats?.repos} label="Public repositories" active={metricsInView} />
          <MetricCard icon={<Star size={14} />} value={stats?.stars} label="Stars earned" active={metricsInView} />
          <MetricCard icon={<GitCommitHorizontal size={14} />} value={cal?.total} label="Contributions · last year" active={metricsInView} />
          <MetricCard icon={<CalendarDays size={14} />} value={cal?.activeDays} label="Active days · last year" active={metricsInView} />
        </div>

        <div className="card heatmap-card reveal-on-scroll delay-200">
          <div className="heatmap-head">
            <div>
              <h3>Contribution activity</h3>
              <p className="heatmap-summary">
                {cal && isLive && `${cal.total.toLocaleString()} contributions in the last year`}
                {cal && !isLive && `${cal.total.toLocaleString()} contributions in the year to ${savedOn}`}
                {!cal && "Couldn't load the contribution calendar right now."}
              </p>
            </div>
            {cal && isLive ? (
              <span className="pill pill-accent">
                <span className="live-dot" aria-hidden="true" /> Live from GitHub
              </span>
            ) : (
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="pill heatmap-fallback-link"
                title={cal ? `Saved from GitHub on ${savedOn}` : undefined}
              >
                {cal ? 'Saved GitHub activity' : 'View on GitHub'} <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="heatmap-scroll">
            <div
              className={`heatmap-grid ${cal ? '' : 'is-placeholder'}`}
              role="img"
              aria-label={cal
                ? `GitHub contribution heatmap: ${cal.total} contributions on ${cal.activeDays} days in the ${isLive ? 'last year' : `year to ${savedOn}`}`
                : 'GitHub contribution heatmap unavailable'}
            >
              {(cal ? cal.weeks : placeholderWeeks).map((week, wi) => (
                <div className="heatmap-col" key={wi} aria-hidden="true">
                  {week.map((day) => (
                    <span
                      key={day.key}
                      className={`heatmap-cell ${day.empty ? 'is-empty' : `level-${day.level}`}`}
                      title={day.empty ? undefined : `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
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

        <div className="repo-highlights reveal-on-scroll delay-200">
          <div className="repo-highlights-head">
            <h3>Top repositories</h3>
            <div className="segmented" role="group" aria-label="Sort top repositories">
              <button
                type="button"
                aria-pressed={filter === 'starred'}
                className={filter === 'starred' ? 'active' : ''}
                onClick={() => setFilter('starred')}
              >
                Most starred
              </button>
              <button
                type="button"
                aria-pressed={filter === 'recent'}
                className={filter === 'recent' ? 'active' : ''}
                onClick={() => setFilter('recent')}
              >
                Recently active
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
                className="card card-link repo-card"
              >
                <div className="repo-card-head">
                  {repo.language ? (
                    <span className="repo-lang">
                      <span
                        className="lang-dot"
                        style={{ background: LANGUAGE_COLORS[repo.language] || 'var(--text-dim)' }}
                      />
                      {repo.language}
                    </span>
                  ) : (
                    <FaGithub size={15} className="repo-icon" aria-hidden="true" />
                  )}
                  <ArrowUpRight size={16} className="repo-arrow" aria-hidden="true" />
                </div>
                <h4 className="repo-name">{repoTitle(repo.name)}</h4>
                <p className="repo-desc">{repo.description}</p>
                <div className="repo-card-footer">
                  <span className="repo-stars">
                    <Star size={13} aria-hidden="true" /> {repo.stargazers_count ?? 0}
                    <span className="sr-only">stars</span>
                  </span>
                  {repo.pushed_at && (
                    <span className="repo-updated">Updated {formatUpdated(repo.pushed_at)}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="contributions-cta reveal-on-scroll">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-secondary">
            <FaGithub size={17} /> Follow on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
