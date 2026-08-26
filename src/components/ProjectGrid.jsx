import React, { useMemo, useState } from 'react';
import { projects } from '../data/artist';
import WorkFilterBar from './WorkFilterBar';
import ProjectCard from './ProjectCard';
import './ProjectGrid.css';

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section id="work" className="project-grid-section">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// selected work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <p className="project-grid-desc text-muted reveal-on-scroll delay-100">
          A cross-section of character, environment, product, and motion work — filter by category or open any
          project for the full breakdown.
        </p>

        <WorkFilterBar active={activeCategory} onChange={setActiveCategory} />

        {filtered.length > 0 ? (
          <div className="project-grid">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="project-grid-empty text-muted">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
