import React from 'react';
import { ExternalLink } from 'lucide-react';
import { profile, projects } from '../data/profile';
import ProjectCard from './ProjectCard';
import './ProjectGrid.css';

export default function ProjectGrid() {
  const githubSocial = profile.socials.find((s) => s.icon === 'github');

  return (
    <section id="projects" className="project-grid-section">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <p className="project-grid-desc text-muted reveal-on-scroll delay-100">
          A selection of projects that show how I approach problems end to end. Each one links to a case study
          with more detail.
        </p>

        <div className="project-grid">
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {githubSocial && (
          <div className="project-grid-cta reveal-on-scroll delay-300">
            <a href={githubSocial.href} target="_blank" rel="noreferrer" className="btn btn-outline">
              View More on GitHub <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
