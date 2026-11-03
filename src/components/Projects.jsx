import React, { useState } from 'react';
import { ArrowUpRight, LockKeyhole, LayoutGrid, List, PowerOff, ChevronRight, Check } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { PROJECTS, PROJECT_FILTERS } from '../data/projects';
import SectionHead from './SectionHead';
import './Projects.css';

const STATUS = {
  'open-source': { label: 'Open source', className: 'pill-accent', icon: <FaGithub size={12} aria-hidden="true" /> },
  live: { label: 'Live site', className: 'pill-accent', icon: <span className="live-dot" aria-hidden="true" /> },
  offline: { label: 'Offline', className: '', icon: <PowerOff size={12} aria-hidden="true" /> },
  private: { label: 'Private system', className: '', icon: <LockKeyhole size={12} aria-hidden="true" /> },
};

function StatusPill({ status }) {
  const s = STATUS[status];
  return (
    <span className={`pill project-status ${s.className}`}>
      {s.icon} {s.label}
    </span>
  );
}

function ProjectLinks({ project, size = 'sm' }) {
  const { live, code } = project.links;
  if (!live && !code) return null;
  const cls = size === 'lg' ? 'btn btn-secondary' : 'project-link';
  return (
    <div className={`project-links ${size === 'lg' ? 'is-lg' : ''}`}>
      {live && (
        <a href={live} target="_blank" rel="noreferrer" className={cls} aria-label={`Open the ${project.name} live site`}>
          Live site <ArrowUpRight size={size === 'lg' ? 16 : 14} aria-hidden="true" />
        </a>
      )}
      {code && (
        <a href={code} target="_blank" rel="noreferrer" className={cls} aria-label={`View the ${project.name} source code on GitHub`}>
          {size === 'lg' && <FaGithub size={15} aria-hidden="true" />}
          Code <ArrowUpRight size={size === 'lg' ? 16 : 14} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function FlowStrip({ project }) {
  return (
    <ol className="flow-strip" aria-label={`How ${project.name} works`}>
      {project.flow.map((step, i) => (
        <li key={step.label}>
          <span className="flow-node">{step.label}</span>
          {i < project.flow.length - 1 && <ChevronRight size={13} className="flow-sep" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function FlowSteps({ project }) {
  return (
    <ol className="flow-steps" aria-label={`How ${project.name} works`}>
      {project.flow.map((step, i) => (
        <li key={step.label} className="flow-step">
          <span className="flow-step-index" aria-hidden="true">{i + 1}</span>
          <div>
            <span className="flow-step-label">{step.label}</span>
            <span className="flow-step-detail">{step.detail}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProjectNote({ project }) {
  if (!project.note) return null;
  return (
    <p className="project-note">
      {project.status === 'offline'
        ? <PowerOff size={13} aria-hidden="true" />
        : <LockKeyhole size={13} aria-hidden="true" />}
      <span>{project.note}</span>
    </p>
  );
}

function Tags({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  );
}

function FeaturedProject({ project }) {
  return (
    <article className={`card project-feature ${project.image ? 'has-image' : 'has-flow'}`}>
      <div className="feature-visual">
        {project.image ? (
          <figure className="feature-shot">
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              loading="lazy"
            />
            {project.image.caption && <figcaption>{project.image.caption}</figcaption>}
          </figure>
        ) : (
          <FlowSteps project={project} />
        )}
      </div>

      <div className="feature-body">
        <StatusPill status={project.status} />
        <span className="project-category">{project.category}</span>
        <h3 className="feature-title">{project.name}</h3>
        <p className="project-desc">{project.summary}</p>

        {project.highlights && (
          <ul className="feature-highlights">
            {project.highlights.map((h) => (
              <li key={h}><Check size={15} aria-hidden="true" /> {h}</li>
            ))}
          </ul>
        )}

        <div className="feature-footer">
          <Tags tags={project.tags} />
          <ProjectNote project={project} />
          <ProjectLinks project={project} size="lg" />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card project-card">
      <div className="project-top">
        <StatusPill status={project.status} />
        <ProjectLinks project={project} />
      </div>

      <span className="project-category">{project.category}</span>
      <h3 className="project-title">{project.name}</h3>
      <p className="project-desc">{project.summary}</p>

      {project.flow && <FlowStrip project={project} />}

      <div className="project-footer">
        <Tags tags={project.tags} />
        <ProjectNote project={project} />
      </div>
    </article>
  );
}

function ProjectsTable({ projects }) {
  return (
    <div className="projects-table-wrap card">
      <table className="projects-table">
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col">Category</th>
            <th scope="col">Stack</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-right">
              <span className="sr-only">Links</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="cell-name">
                <strong>{project.name}</strong>
                <span className="cell-desc">{project.summary}</span>
              </td>
              <td className="cell-category">{project.category}</td>
              <td><Tags tags={project.tags} /></td>
              <td><StatusPill status={project.status} /></td>
              <td className="text-right">
                {project.links.live || project.links.code ? (
                  <ProjectLinks project={project} />
                ) : (
                  <span className="table-action is-locked" title={project.note}>
                    {project.status === 'offline'
                      ? <><PowerOff size={13} aria-hidden="true" /> Offline</>
                      : <><LockKeyhole size={13} aria-hidden="true" /> Private</>}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Projects() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'public' | 'private'

  const countFor = (id) =>
    id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.group === id).length;

  const filteredProjects = PROJECTS.filter((p) => activeFilter === 'all' || p.group === activeFilter);

  // In grid view each group opens with its featured project, then a 2-up grid.
  const groups = ['public', 'private']
    .map((group) => {
      const items = filteredProjects.filter((p) => p.group === group);
      return { group, featured: items.filter((p) => p.featured), rest: items.filter((p) => !p.featured) };
    })
    .filter((g) => g.featured.length || g.rest.length);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHead
          index="03"
          label="Projects"
          title={<>Selected <em>work</em></>}
        >
          Open-source tools you can read and run, plus private production systems
          explained by how they work.
        </SectionHead>

        <div className="projects-toolbar reveal-on-scroll delay-100">
          <div className="segmented" role="group" aria-label="Filter projects">
            {PROJECT_FILTERS.map((f) => (
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
          <div className="projects-groups">
            {groups.map(({ group, featured, rest }) => (
              <div key={group} className="projects-group">
                {featured.map((p) => <FeaturedProject key={p.id} project={p} />)}
                {rest.length > 0 && (
                  <div className="projects-grid">
                    {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ProjectsTable projects={filteredProjects} />
        )}

        <a
          href="https://github.com/Enricko?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="projects-more"
        >
          <FaGithub size={18} aria-hidden="true" />
          <span>
            <strong>More on GitHub</strong>
            <span className="projects-more-desc">Flutter apps, games, API templates and experiments.</span>
          </span>
          <ArrowUpRight size={16} className="projects-more-arrow" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
