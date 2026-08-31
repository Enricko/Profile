import React from 'react';
import { ExternalLink, LockKeyhole, Radio, ShieldCheck } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const PROJECTS = [
  {
    name: 'HematCuy',
    description: 'A public price-comparison platform for everyday essentials, with live catalog data and official store links.',
    href: 'https://hematcuy.lufria.tech',
    tags: ['FastAPI', 'React', 'Redis'],
    status: 'public',
    statusLabel: 'Open to public',
  },
  {
    name: 'Lufria Profile',
    description: 'This portfolio site: a public home for my work, experience, experiments, and open-source projects.',
    href: 'https://lufria.tech',
    tags: ['React', 'Vite', 'Design'],
    status: 'public',
    statusLabel: 'Open to public',
  },
  {
    name: 'Trading Advisory',
    description: 'A private-by-design advisory workspace for market signals, portfolio context, and scheduled briefings.',
    href: null,
    tags: ['FastAPI', 'WebSocket', 'Trading'],
    status: 'private',
    statusLabel: 'Private system',
    note: 'Access is limited because it handles personal portfolio data and account-specific analysis.',
  },
  {
    name: 'Clipper Apps',
    description: 'An internal media workflow for turning long-form videos into searchable, reviewable short clips.',
    href: null,
    tags: ['AI Workflow', 'NVENC', 'Queue'],
    status: 'private',
    statusLabel: 'Private system',
    note: 'The app is still an internal tool; the implementation and processing pipeline are not public.',
  },
  {
    name: 'Cetaphil POSM',
    description: 'A field-operations platform for managing merchandising activity, reports, and point-of-sale materials.',
    href: null,
    tags: ['Laravel', 'Flutter', 'MariaDB'],
    status: 'private',
    statusLabel: 'Private system',
    note: 'Kept locked because it contains client workflows, operational records, and authenticated user data.',
  },
];

export default function Projects() {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// current work</span>
          <h2 className="section-title">Projects in the wild</h2>
        </div>
        <p className="projects-desc text-muted reveal-on-scroll delay-100">
          Public products you can try today, alongside private systems that stay visible for context — but remain locked for privacy and operational reasons.
        </p>

        <div className="project-legend reveal-on-scroll delay-200">
          <span><Radio size={15} /> Open to public</span>
          <span><LockKeyhole size={15} /> Private / access restricted</span>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, idx) => {
            const isPublic = project.status === 'public';
            const content = (
              <>
                <div className="project-header">
                  <span className={`project-folder ${project.status}`}>
                    {isPublic ? <FaGithub size={22} /> : <LockKeyhole size={20} />}
                  </span>
                  <span className={`project-status ${project.status}`}>
                    {isPublic ? <Radio size={14} /> : <LockKeyhole size={14} />}
                    {project.statusLabel}
                  </span>
                </div>
                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc text-muted">{project.description}</p>
                {project.note && (
                  <p className="project-note"><ShieldCheck size={15} /> {project.note}</p>
                )}
                <div className="project-footer">
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag} className="project-tag">{tag}</span>)}
                  </div>
                  <span className="project-open">
                    {isPublic ? <>Visit <ExternalLink size={14} /></> : <>Access restricted <LockKeyhole size={14} /></>}
                  </span>
                </div>
              </>
            );

            return isPublic ? (
              <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className={`glass-card spotlight project-card reveal-on-scroll ${project.status}`} style={{ transitionDelay: `${(idx % 4) * 100}ms` }} onMouseMove={onMove}>
                {content}
              </a>
            ) : (
              <article key={project.name} className={`glass-card project-card ${project.status} reveal-on-scroll`} style={{ transitionDelay: `${(idx % 4) * 100}ms` }}>
                {content}
              </article>
            );
          })}
        </div>

        <div className="projects-cta reveal-on-scroll delay-300">
          <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" className="btn btn-outline">
            Explore public code on GitHub <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
