import React, { useEffect } from 'react';
import { X, Film } from 'lucide-react';
import { artist, projects } from '../data/artist';
import { useFocusTrap } from '../lib/useInteractions';
import { projectHref } from '../lib/router';
import './ReelModal.css';

function toAutoplayUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') || u.hostname.includes('player.vimeo.com')) {
      u.searchParams.set('autoplay', '1');
    }
    return u.toString();
  } catch {
    return url;
  }
}

export default function ReelModal({ open, onClose }) {
  const dialogRef = useFocusTrap(open, onClose);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [open]);

  if (!open) return null;

  const featured = artist.reelFeaturedSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  const embedUrl = toAutoplayUrl(artist.reelEmbedUrl);

  return (
    <div
      className="reel-modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="reel-modal glass-card"
        role="dialog"
        aria-modal="true"
        aria-label="Showreel"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button type="button" className="reel-modal-close" onClick={onClose} aria-label="Close showreel">
          <X size={22} />
        </button>

        <div className="reel-modal-video">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${artist.name} showreel`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          ) : (
            <div className="reel-modal-placeholder">
              <Film size={36} />
              <p>
                Add a YouTube or Vimeo embed URL to <code>reelEmbedUrl</code> in <code>src/data/artist.js</code> to
                show your reel here.
              </p>
            </div>
          )}
        </div>

        {featured.length > 0 && (
          <div className="reel-modal-featured">
            <h3>Featured in this reel</h3>
            <ul>
              {featured.map((project) => (
                <li key={project.slug}>
                  <a href={projectHref(project.slug)} onClick={onClose}>
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
