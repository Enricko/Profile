import React, { useState } from 'react';
import { ArrowLeft, Calendar, Building2, Box, Expand, X } from 'lucide-react';
import { projects } from '../data/artist';
import { useFocusTrap } from '../lib/useInteractions';
import './ProjectPage.css';

function PlaceholderImage({ caption, variant = '' }) {
  return (
    <div className={`media-placeholder ${variant}`}>
      <span className="media-placeholder-caption">{caption || 'Add an image here'}</span>
    </div>
  );
}

function EmbedSlot({ url, label }) {
  if (url) {
    return (
      <div className="embed-slot">
        <iframe src={url} title={label} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen frameBorder="0" />
      </div>
    );
  }
  return (
    <div className="embed-slot embed-slot-empty">
      <span>Add a {label.toLowerCase()} video embed URL here</span>
    </div>
  );
}

function Lightbox({ item, onClose }) {
  const ref = useFocusTrap(!!item, onClose);
  if (!item) return null;
  return (
    <div className="lightbox-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        className="lightbox"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={item.caption || 'Render preview'}
        tabIndex={-1}
      >
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close preview">
          <X size={22} />
        </button>
        <PlaceholderImage caption={item.caption} variant="lightbox-media" />
      </div>
    </div>
  );
}

export default function ProjectPage({ slug }) {
  const project = projects.find((p) => p.slug === slug);
  const [lightboxItem, setLightboxItem] = useState(null);

  if (!project) {
    return (
      <main>
        <section className="project-page">
          <div className="container project-notfound animate-up">
            <h1>Project not found</h1>
            <p className="text-muted">We couldn't find a project matching &ldquo;{slug}&rdquo;.</p>
            <a href="#work" className="btn btn-outline">
              <ArrowLeft size={16} /> Back to Work
            </a>
          </div>
        </section>
      </main>
    );
  }

  const wip = project.wip || {};
  const moodboard = project.moodboard?.length ? project.moodboard : [{ caption: null }];
  const wireframe = wip.wireframe?.length ? wip.wireframe : [{ caption: null }];
  const clay = wip.clay?.length ? wip.clay : [{ caption: null }];
  const lighting = wip.lighting?.length ? wip.lighting : [{ caption: null }];
  const finalRenders = project.finalRenders?.length ? project.finalRenders : [{ caption: null }];

  return (
    <main>
      <section className="project-page">
        <div className="container">
          <a href="#work" className="project-back animate-up">
            <ArrowLeft size={16} /> Back to Work
          </a>

          <header className="project-header animate-up delay-100">
            <h1 className="project-title">{project.title}</h1>

            <div className="project-meta">
              <span className="project-meta-item">
                <Calendar size={14} /> {project.year}
              </span>
              {project.client && (
                <span className="project-meta-item">
                  <Building2 size={14} /> {project.client}
                </span>
              )}
            </div>

            {project.software?.length > 0 && (
              <div className="project-software">
                {project.software.map((s) => (
                  <span key={s} className="software-badge">
                    <Box size={13} /> {s}
                  </span>
                ))}
              </div>
            )}

            {project.roles?.length > 0 && (
              <div className="project-roles">
                {project.roles.map((r) => (
                  <span key={r} className="project-tag">{r}</span>
                ))}
              </div>
            )}
          </header>

          <PlaceholderImage
            caption={project.finalRenders?.[0]?.caption || `${project.title} hero shot`}
            variant="hero-media"
          />

          <div className="project-body animate-up delay-200">
            {project.overview && (
              <article className="project-block">
                <h2>Overview</h2>
                <p className="text-muted">{project.overview}</p>
              </article>
            )}

            <article className="project-block">
              <h2>Concept &amp; Reference</h2>
              <div className="media-grid">
                {moodboard.map((item, i) => (
                  <PlaceholderImage key={i} caption={item.caption} />
                ))}
              </div>
            </article>

            <article className="project-block">
              <h2>Work in Progress</h2>

              <div className="wip-subsection">
                <h3>Wireframe renders</h3>
                <div className="media-grid">
                  {wireframe.map((item, i) => (
                    <PlaceholderImage key={i} caption={item.caption} />
                  ))}
                </div>
              </div>

              <div className="wip-subsection">
                <h3>Clay renders</h3>
                <div className="media-grid">
                  {clay.map((item, i) => (
                    <PlaceholderImage key={i} caption={item.caption} />
                  ))}
                </div>
              </div>

              <div className="wip-subsection">
                <h3>Lighting tests</h3>
                <div className="media-grid">
                  {lighting.map((item, i) => (
                    <PlaceholderImage key={i} caption={item.caption} />
                  ))}
                </div>
              </div>
            </article>

            <article className="project-block">
              <h2>Final Renders</h2>
              <div className="media-grid final-renders-grid">
                {finalRenders.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    className="final-render-btn"
                    onClick={() => setLightboxItem(item)}
                    aria-label={`Open ${item.caption || 'render'} preview`}
                  >
                    <PlaceholderImage caption={item.caption} />
                    <span className="final-render-expand">
                      <Expand size={16} />
                    </span>
                  </button>
                ))}
              </div>
            </article>

            <article className="project-block">
              <h2>Turntable</h2>
              <EmbedSlot url={project.turntableEmbed} label="Turntable" />
            </article>

            <article className="project-block">
              <h2>Breakdown</h2>
              <EmbedSlot url={project.breakdownEmbed} label="Breakdown" />
            </article>
          </div>
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </main>
  );
}
