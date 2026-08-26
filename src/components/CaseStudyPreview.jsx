import React from 'react';
import { ArrowLeft, ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/profile';
import './CaseStudyPreview.css';

export default function CaseStudyPreview({ slug }) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main>
        <section className="case-study-page">
          <div className="container case-study-notfound animate-up">
            <h1>Project not found</h1>
            <p className="text-muted">We couldn't find a project matching &ldquo;{slug}&rdquo;.</p>
            <a href="#projects" className="btn btn-outline">
              <ArrowLeft size={16} /> Back to Projects
            </a>
          </div>
        </section>
      </main>
    );
  }

  const { caseStudy } = project;

  return (
    <main>
      <section className="case-study-page">
        <div className="container">
          <a href="#projects" className="case-study-back animate-up">
            <ArrowLeft size={16} /> Back to Projects
          </a>

          <header className="case-study-header animate-up delay-100">
            <h1 className="case-study-page-title">{project.name}</h1>
            <p className="case-study-page-desc text-muted">{project.description}</p>

            <div className="case-study-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>

            <div className="case-study-actions">
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                <FaGithub size={16} /> Repository
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-outline">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
              <span className="case-study-stars">
                <Star size={14} className="star-icon" /> {project.stars} stars
              </span>
            </div>
          </header>

          <div className="case-study-body animate-up delay-200">
            <article className="case-study-block">
              <h2>Problem</h2>
              <p className="text-muted">{caseStudy.problem}</p>
            </article>

            <article className="case-study-block">
              <h2>Constraints &amp; Tradeoffs</h2>
              <p className="text-muted">{caseStudy.constraints}</p>
            </article>

            <article className="case-study-block">
              <h2>Architecture</h2>
              <div className="architecture-placeholder">{caseStudy.architectureNote}</div>
            </article>

            <article className="case-study-block">
              <h2>Screenshots</h2>
              {caseStudy.screenshots.length ? (
                <div className="screenshot-grid">
                  {caseStudy.screenshots.map((src) => (
                    <img key={src} src={src} alt={`${project.name} screenshot`} loading="lazy" />
                  ))}
                </div>
              ) : (
                <div className="screenshot-grid">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="screenshot-placeholder" aria-hidden="true">
                      Add a screenshot
                    </div>
                  ))}
                </div>
              )}
            </article>

            <article className="case-study-block">
              <h2>Results &amp; Lessons</h2>
              <p className="text-muted">{caseStudy.results}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
