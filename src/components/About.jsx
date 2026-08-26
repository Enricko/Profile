import React from 'react';
import { Sparkles } from 'lucide-react';
import { useCountUp, useInView } from '../lib/useInteractions';
import { about } from '../data/profile';
import './About.css';

function Stat({ value, suffix, label, active }) {
  const n = useCountUp(value, active);
  return (
    <div className="stat-item">
      <span className="stat-number text-gradient">{n}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const [statsRef, inView] = useInView({ threshold: 0.4 });

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="section-title">{about.title}</h2>
        </div>

        <div className="about-grid">
          <div className="about-content reveal-on-scroll delay-100">
            {about.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="status-line">
              <span className="pulse-dot" /> {about.currentStatus}
            </div>

            <div className="stats-container" ref={statsRef}>
              {about.stats.map((s) => (
                <Stat key={s.label} {...s} active={inView} />
              ))}
            </div>

            <p className="fun-fact">
              <Sparkles size={16} /> {about.funFact}
            </p>
          </div>

          <div className="tech-stack-panel glass-card spotlight">
            <h3 className="tech-stack-title">Core Stack</h3>
            <div className="tech-stack-grid">
              {about.techStack.map((tech) => (
                <div key={tech.name} className="tech-stack-item">
                  <img src={tech.icon} alt="" aria-hidden="true" loading="lazy" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
