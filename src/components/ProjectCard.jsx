import React from 'react';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projectHref } from '../lib/router';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-media">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" />
        ) : (
          <div className="project-card-placeholder" aria-hidden="true">
            <span>{project.name.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
      </div>

      <div className="project-card-body">
        <div className="project-card-head">
          <h3 className="project-card-title">{project.name}</h3>
          <span className="project-stars">
            <Star size={14} className="star-icon" /> {project.stars}
          </span>
        </div>

        <p className="project-card-desc text-muted">{project.description}</p>
        <p className="project-card-outcome">{project.outcome}</p>

        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <div className="project-card-footer">
          <div className="project-card-links">
            <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} on GitHub`}>
              <FaGithub size={18} />
            </a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`}>
                <ExternalLink size={18} />
              </a>
            )}
          </div>
          <a href={projectHref(project.slug)} className="project-card-case-study">
            Case study <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
