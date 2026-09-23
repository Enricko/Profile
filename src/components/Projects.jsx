import React, { useState } from 'react';
import { ExternalLink, LockKeyhole, Radio, ShieldCheck, LayoutGrid, List, Layers, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const PROJECTS = [
  {
    id: 'hematcuy',
    name: 'HematCuy',
    category: 'Public Platform',
    categoryType: 'public',
    description: 'Universal real-time price & deal aggregator for groceries, tech, and essentials with official platform deep links and WAF-resilient catalog indexing.',
    href: 'https://hematcuy.lufria.tech',
    tags: ['FastAPI', 'React', 'Redis', 'Tailwind'],
    status: 'public',
    statusLabel: 'Live Public App',
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
    description: 'Modern cyberpunk deep-space portfolio engineered with React 19, custom CSS tokens, physics-driven particle effects, and strict anti-AI-slop standards.',
    href: 'https://lufria.tech',
    tags: ['React 19', 'Vite', 'Design Tokens', 'CSS3'],
    status: 'public',
    statusLabel: 'Live Public Site',
    featured: false,
  },
];

export default function Projects() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'public' | 'enterprise'

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.categoryType === activeFilter;
  });

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// engineered systems</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <p className="projects-desc text-muted reveal-on-scroll delay-100">
          A collection of public digital products and production systems, accompanied by private enterprise
          architectures maintained for operational rigor.
        </p>

        {/* Toolbar: Filters & Dual-View Toggle */}
        <div className="projects-toolbar reveal-on-scroll delay-200">
          <div className="filter-chips">
            <button
              className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              type="button"
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              className={`filter-chip ${activeFilter === 'public' ? 'active' : ''}`}
              onClick={() => setActiveFilter('public')}
              type="button"
            >
              <Radio size={13} className="chip-icon public" /> Public Apps ({PROJECTS.filter((project) => project.categoryType === 'public').length})
            </button>
            <button
              className={`filter-chip ${activeFilter === 'enterprise' ? 'active' : ''}`}
              onClick={() => setActiveFilter('enterprise')}
              type="button"
            >
              <LockKeyhole size={13} className="chip-icon private" /> Enterprise &amp; Systems ({PROJECTS.filter((project) => project.categoryType === 'enterprise').length})
            </button>
          </div>

          <div className="view-mode-switch">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Switch to Grid View"
              title="Grid View"
              type="button"
            >
              <LayoutGrid size={17} />
              <span className="view-label">Grid</span>
            </button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              aria-label="Switch to Dense List View"
              title="Dense List View"
              type="button"
            >
              <List size={17} />
              <span className="view-label">Table</span>
            </button>
          </div>
        </div>

        {/* Grid View Mode */}
        {viewMode === 'grid' ? (
          <div className="projects-grid">
            {filteredProjects.map((project, idx) => {
              const isPublic = project.status === 'public';
              const cardContent = (
                <>
                  <div className="project-header">
                    <span className={`project-folder ${project.status}`}>
                      {isPublic ? <Layers size={22} /> : <LockKeyhole size={20} />}
                    </span>
                    <div className="project-meta-pill">
                      <span className={`project-status ${project.status}`}>
                        {isPublic ? <Radio size={13} /> : <LockKeyhole size={13} />}
                        {project.statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="project-title-row">
                    <h3 className="project-title">{project.name}</h3>
                    <span className="project-category-tag">{project.category}</span>
                  </div>

                  <p className="project-desc text-muted">{project.description}</p>

                  {project.note && (
                    <div className="project-note">
                      <ShieldCheck size={14} />
                      <span>{project.note}</span>
                    </div>
                  )}

                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="project-action-wrapper">
                      {isPublic ? (
                        <span className="project-open public">
                          Visit System <ExternalLink size={14} />
                        </span>
                      ) : (
                        <span className="project-open private">
                          Restricted <LockKeyhole size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              return isPublic ? (
                <a
                  key={project.id}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`glass-card spotlight project-card ${project.status}`}
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                  onMouseMove={onMove}
                >
                  {cardContent}
                </a>
              ) : (
                <article
                  key={project.id}
                  className={`glass-card project-card ${project.status}`}
                  style={{ transitionDelay: `${(idx % 4) * 80}ms` }}
                >
                  {cardContent}
                </article>
              );
            })}
          </div>
        ) : (
          /* Dense Table / List View Mode */
          <div className="projects-table-container glass-card">
            <div className="table-responsive">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Architecture &amp; Stack</th>
                    <th>Access State</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => {
                    const isPublic = project.status === 'public';
                    return (
                      <tr key={project.id} className={`table-row ${project.status}`}>
                        <td className="project-cell-name">
                          <div className="cell-name-lockup">
                            <span className={`cell-icon ${project.status}`}>
                              {isPublic ? <Layers size={16} /> : <LockKeyhole size={16} />}
                            </span>
                            <div>
                              <strong className="cell-title">{project.name}</strong>
                              <p className="cell-desc-mobile text-muted">{project.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="project-cell-category">
                          <span className="table-category-badge">{project.category}</span>
                        </td>
                        <td className="project-cell-tags">
                          <div className="table-tags-group">
                            {project.tags.map((tag) => (
                              <span key={tag} className="table-tag">{tag}</span>
                            ))}
                          </div>
                        </td>
                        <td className="project-cell-status">
                          <span className={`table-status-pill ${project.status}`}>
                            {isPublic ? <CheckCircle2 size={13} /> : <LockKeyhole size={13} />}
                            {project.statusLabel}
                          </span>
                        </td>
                        <td className="project-cell-action text-right">
                          {isPublic ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noreferrer"
                              className="table-action-link"
                            >
                              Launch <ExternalLink size={13} />
                            </a>
                          ) : (
                            <span className="table-action-locked" title={project.note}>
                              Private
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="projects-cta reveal-on-scroll delay-300">
          <a
            href="https://github.com/Enricko"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <FaGithub size={18} /> View Open Repositories on GitHub <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
