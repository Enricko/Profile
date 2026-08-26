import React, { useState } from 'react';
import { ExternalLink, GitPullRequest } from 'lucide-react';
import { openSource } from '../data/profile';
import './OpenSource.css';

export default function OpenSource() {
  const [imgFailed, setImgFailed] = useState(false);

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="open-source" className="open-source">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">{openSource.eyebrow}</span>
          <h2 className="section-title">{openSource.title}</h2>
        </div>
        <p className="open-source-intro text-muted reveal-on-scroll delay-100">{openSource.intro}</p>

        <div className="glass-card contribution-graph-card reveal-on-scroll delay-200">
          <div className="contribution-graph-head">
            <h3>Contribution Activity</h3>
            <a href={openSource.githubUrl} target="_blank" rel="noreferrer" className="contribution-graph-link">
              View full profile <ExternalLink size={14} />
            </a>
          </div>
          {!imgFailed ? (
            <img
              className="contribution-graph-img"
              src={`https://ghchart.rshah.org/2d8cff/${openSource.githubUsername}`}
              alt={`${openSource.githubUsername} GitHub contribution graph`}
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <p className="text-muted contribution-graph-fallback">
              Contribution graph unavailable right now —{' '}
              <a href={openSource.githubUrl} target="_blank" rel="noreferrer">
                view it directly on GitHub
              </a>
              .
            </p>
          )}
        </div>

        <h3 className="contributions-subtitle reveal-on-scroll">
          <GitPullRequest size={18} /> Notable Contributions
        </h3>
        <div className="contributions-list">
          {openSource.contributions.map((item, idx) => (
            <a
              key={item.repo}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="glass-card spotlight contribution-item reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
              onMouseMove={onMove}
            >
              <div className="contribution-item-head">
                <span className="contribution-repo">{item.repo}</span>
                <span className="badge">{item.type}</span>
              </div>
              <p className="text-muted">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
