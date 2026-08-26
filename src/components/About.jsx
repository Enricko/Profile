import React from 'react';
import { GraduationCap, Cpu } from 'lucide-react';
import { about, artist } from '../data/artist';
import './About.css';

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="section-title">{about.title}</h2>
        </div>

        <div className="about-grid">
          <div className="about-content reveal-on-scroll delay-100">
            <div className="about-avatar" aria-hidden="true">
              {initials(artist.name)}
            </div>

            {about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="availability-badges">
              {about.availabilityBadges.map((b) => (
                <span key={b.label} className={`availability-badge ${b.active ? 'is-active' : ''}`}>
                  <span className="availability-dot" /> {b.label}
                </span>
              ))}
            </div>

            {about.currentlyLearning && (
              <p className="currently-learning">
                <GraduationCap size={16} /> {about.currentlyLearning}
              </p>
            )}
          </div>

          <div className="about-panels">
            <div className="glass-card spotlight software-panel">
              <h3>Software Proficiency</h3>
              <div className="software-list">
                {about.software.map((s) => (
                  <div key={s.name} className="software-row">
                    <span className="software-name">{s.name}</span>
                    <div className="software-bar-track">
                      <div className="software-bar-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card spotlight hardware-panel">
              <h3>
                <Cpu size={18} /> Hardware
              </h3>
              <ul className="hardware-list">
                {about.hardware.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="process-overview reveal-on-scroll delay-200">
          <h3 className="process-title">My Process</h3>
          <div className="process-steps">
            {about.process.map((step, i) => (
              <div key={step.title} className="process-step">
                <span className="process-step-number">{String(i + 1).padStart(2, '0')}</span>
                <h4>{step.title}</h4>
                <p className="text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
