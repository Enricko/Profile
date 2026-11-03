import React, { useEffect, useMemo, useState } from 'react';
import { BookMarked, Star, GitCommitHorizontal, CalendarDays, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useCountUp, useInView } from '../lib/useInteractions';
import SectionHead from './SectionHead';
import './GithubContributions.css';

const GITHUB_USERNAME = 'Enricko';
const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
// Public, CORS-enabled mirror of the GitHub contribution calendar (GitHub's own
// endpoint needs an authenticated GraphQL call the browser can't make).
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;
const WEEKS_IN_GRID = 53;

// Shown only if the live repo list can't be fetched.
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
  const n = useCountUp(value ?? 0, active && value != null);
  return (
    <div className="metric">
      <span className="metric-label">{icon} {label}</span>
      <span className="metric-value">{value == null ? '—' : n.toLocaleString()}</span>
    </div>
  );
}

export default function GithubContributions() {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [calendar, setCalendar] = useState('loading'); // 'loading' | 'error' | { weeks, total, activeDays }
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
        if (ownedRepos.length) setRepos(ownedRepos);
      } catch (err) {
        console.warn('GithubContributions: repo stats unavailable:', err.message);
      }
    }

    async function loadCalendar() {
      try {
        const res = await fetch(CONTRIBUTIONS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('empty calendar');
        if (!cancelled) setCalendar(buildCalendar(data.contributions));
      } catch (err) {
        console.warn('GithubContributions: contribution calendar unavailable:', err.message);
        if (!cancelled) setCalendar('error');
      }
    }

    loadGithubData();
    loadCalendar();
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

  const cal = typeof calendar === 'object' ? calendar : null;
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
          My public GitHub footprint, pulled live from GitHub when the page loads.
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
                {cal && `${cal.total.toLocaleString()} contributions in the last year`}
                {calendar === 'loading' && 'Loading contribution calendar…'}
                {calendar === 'error' && "Couldn't load the contribution calendar right now."}
              </p>
            </div>
            {cal ? (
              <span className="pill pill-accent">
                <span className="live-dot" aria-hidden="true" /> Live from GitHub
              </span>
            ) : (
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="pill heatmap-fallback-link">
                View on GitHub <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          <div className="heatmap-scroll">
            <div
              className={`heatmap-grid ${cal ? '' : 'is-placeholder'}`}
              role="img"
              aria-label={cal
                ? `GitHub contribution heatmap: ${cal.total} contributions on ${cal.activeDays} days in the last year`
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
                  <FaGithub size={16} className="repo-icon" aria-hidden="true" />
                  <ArrowUpRight size={16} className="repo-arrow" aria-hidden="true" />
                </div>
                <h4 className="repo-name">{repo.name}</h4>
                <p className="repo-desc">{repo.description || 'No description provided.'}</p>
                <div className="repo-card-footer">
                  {repo.language && <span className="repo-lang"><span className="lang-dot" /> {repo.language}</span>}
                  <span className="repo-stars"><Star size={13} aria-hidden="true" /> {repo.stargazers_count ?? 0}</span>
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
