import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/artist';
import { projectHref } from '../lib/router';
import './ProjectCard.css';

const CATEGORY_LABELS = Object.fromEntries(categories.map((c) => [c.id, c.label]));

export default function ProjectCard({ project }) {
  const [hovering, setHovering] = useState(false);
  const showPreview = hovering && project.hoverPreview;

  return (
    <a
      href={projectHref(project.slug)}
      className="project-card"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div className="project-card-media">
        {project.thumbnail ? (
          <img src={showPreview ? project.hoverPreview : project.thumbnail} alt="" loading="lazy" />
        ) : (
          <div className="project-card-placeholder" aria-hidden="true">
            <span>{project.title.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        <span className="project-card-badge">{CATEGORY_LABELS[project.category] || project.category}</span>
      </div>

      <div className="project-card-body">
        <div className="project-card-head">
          <h3 className="project-card-title">{project.title}</h3>
          <span className="project-card-year">{project.year}</span>
        </div>

        {project.client && <p className="project-card-client text-muted">{project.client}</p>}

        <span className="project-card-link">
          View project <ArrowRight size={14} />
        </span>
      </div>
    </a>
  );
}
