import React, { useState } from 'react';
import { ArrowUpRight, LockKeyhole, ShieldCheck, LayoutGrid, List, PowerOff } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionHead from './SectionHead';
import './Projects.css';

const PROJECTS = [
  {
    id: 'hematcuy',
    name: 'HematCuy',
    category: 'Public Platform',
    categoryType: 'public',
    description: 'Universal real-time price & deal aggregator for groceries, tech, and essentials with official platform deep links and WAF-resilient catalog indexing.',
    // hematcuy.lufria.tech has no tunnel route after the server migration (404) —
    // switch back to status 'public' + href once it is redeployed.
    href: null,
    tags: ['FastAPI', 'React', 'Redis', 'Tailwind'],
    status: 'offline',
    statusLabel: 'Currently Offline',
    featured: true,
  },
  {
    id: 'ticketsystem',
    name: 'IT Ticket System',
    category: 'Web Platform',
    categoryType: 'enterprise',
    description: 'Autonomous IT support ticketing desk with daily rotating PIN security, client-side WebP photo compression, and automated Discord webhook dispatch.',
    href: null,
    tags: ['FastAPI', 'SQLite', 'Discord Webhook', 'Python'],
    status: 'private',
    statusLabel: 'Private System',
    note: 'Restricted operational support system containing internal requests, attachments, and incident records.',
    featured: false,
  },
  {
    id: 'tradingadvisory',
    name: 'Trading Advisory Bot',
    category: 'Fintech & Algorithmic',
    categoryType: 'enterprise',
    description: 'Algorithmic market signal engine and Discord bot delivering scheduled BPJS/BSJP analysis, real-time WebSocket market streams, and portfolio risk telemetry.',
    href: null,
    tags: ['FastAPI', 'WebSocket', 'MySQL', 'Discord API'],
    status: 'private',
    statusLabel: 'Private System',
    note: 'Restricted system handling private portfolio capital, execution strategies, and real-time exchange feeds.',
    featured: true,
  },
  {
    id: 'clipperapps',
    name: 'Clipper Apps',
    category: 'AI & Media Pipeline',
    categoryType: 'enterprise',
    description: 'Automated video workflow engine converting long-form footage into indexed, transcribed short clips using dedicated GPU NVENC hardware encoding.',
    href: null,
    tags: ['AI Workflow', 'GPU NVENC', 'FastAPI', 'Job Queue'],
    status: 'private',
    statusLabel: 'Internal Pipeline',
    note: 'Private media engine running on dedicated workstation hardware with proprietary transcription queue.',
    featured: false,
  },
  {
    id: 'profile',
    name: 'Lufria.tech Portfolio',
    category: 'Design System',
    categoryType: 'public',
    description: 'This site — a dark, editorial portfolio built with React 19, Vite, and plain-CSS design tokens, with live data from the GitHub API.',
    href: 'https://lufria.tech',
    tags: ['React 19', 'Vite', 'Design Tokens', 'CSS3'],
    status: 'public',
    statusLabel: 'Live Public Site',
    featured: false,
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'public', label: 'Public apps' },
  { id: 'enterprise', label: 'Enterprise & systems' },
];

function StatusPill({ project }) {
  if (project.status === 'public') {
    return (
      <span className="pill pill-accent project-status">
        <span className="live-dot" aria-hidden="true" /> {project.statusLabel}
      </span>
    );
  }
  return (
    <span className="pill project-status">
      {project.status === 'offline'
        ? <PowerOff size={12} aria-hidden="true" />
        : <LockKeyhole size={12} aria-hidden="true" />}
      {project.statusLabel}
    </span>
  );
}

export default function Projects() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'public' | 'enterprise'

  const countFor = (id) =>
    id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.categoryType === id).length;

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categoryType === activeFilter;
  });

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHead
          index="03"
          label="Projects"
          title={<>Selected <em>work</em></>}
        >
          Public products and production systems, alongside private enterprise architectures
          maintained for operational rigor.
        </SectionHead>

        <div className="projects-toolbar reveal-on-scroll delay-100">
          <div className="segmented" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={activeFilter === f.id ? 'active' : ''}
                aria-pressed={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label} <span className="count">{countFor(f.id)}</span>
              </button>
            ))}
          </div>

          <div className="segmented" role="group" aria-label="Layout">
            <button
              type="button"
              className={viewMode === 'grid' ? 'active' : ''}
              aria-pressed={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <LayoutGrid size={15} /> <span className="view-label">Grid</span>
            </button>
            <button
              type="button"
              className={viewMode === 'table' ? 'active' : ''}
              aria-pressed={viewMode === 'table'}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <List size={15} /> <span className="view-label">Table</span>
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const isPublic = project.status === 'public';
              const cardContent = (
                <>
                  <div className="project-top">
                    <StatusPill project={project} />
                    {isPublic && <ArrowUpRight size={18} className="project-arrow" aria-hidden="true" />}
                  </div>

                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.name}</h3>
                  <p className="project-desc">{project.description}</p>

                  {project.note && (
                    <p className="project-note">
                      <ShieldCheck size={14} aria-hidden="true" />
                      <span>{project.note}</span>
                    </p>
                  )}

                  <div className="tag-list project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </>
              );

              return isPublic ? (
                <a
                  key={project.id}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card card-link project-card"
                  aria-label={`${project.name} — open ${project.href}`}
                >
                  {cardContent}
                </a>
              ) : (
                <article key={project.id} className="card project-card is-private">
                  {cardContent}
                </article>
              );
            })}

            <a
              href="https://github.com/Enricko"
              target="_blank"
              rel="noreferrer"
              className="card card-link project-card project-more"
            >
              <FaGithub size={22} aria-hidden="true" />
              <h3 className="project-title">More on GitHub</h3>
              <p className="project-desc">
                Open repositories — Flutter apps, games, API templates, and experiments.
              </p>
              <span className="project-more-link">
                github.com/Enricko <ArrowUpRight size={15} />
              </span>
            </a>
          </div>
        ) : (
          <div className="projects-table-wrap card">
            <table className="projects-table">
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Category</th>
                  <th scope="col">Stack</th>
                  <th scope="col">Access</th>
                  <th scope="col" className="text-right">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => {
                  const isPublic = project.status === 'public';
                  return (
                    <tr key={project.id}>
                      <td className="cell-name">
                        <strong>{project.name}</strong>
                        <span className="cell-desc">{project.description}</span>
                      </td>
                      <td className="cell-category">{project.category}</td>
                      <td>
                        <div className="tag-list">
                          {project.tags.map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      </td>
                      <td><StatusPill project={project} /></td>
                      <td className="text-right">
                        {isPublic ? (
                          <a href={project.href} target="_blank" rel="noreferrer" className="table-action">
                            Open <ArrowUpRight size={14} />
                          </a>
                        ) : project.status === 'offline' ? (
                          <span className="table-action is-locked">
                            <PowerOff size={13} /> Offline
                          </span>
                        ) : (
                          <span className="table-action is-locked" title={project.note}>
                            <LockKeyhole size={13} /> Private
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}
