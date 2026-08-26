import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { experience } from '../data/profile';
import './ExperienceTimeline.css';

export default function ExperienceTimeline() {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// career</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="timeline-item reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
            >
              <div className="timeline-dot"><span /></div>
              <div className="glass-card spotlight timeline-content" onMouseMove={onMove}>
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  <span className="timeline-company"><Briefcase size={15} /> {exp.company}</span>
                </div>
                <div className="timeline-period">
                  <Calendar size={14} /> {exp.period}
                </div>
                <p className="timeline-desc text-muted">{exp.description}</p>
                <div className="timeline-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`badge ${tIdx % 2 === 0 ? 'desktop' : 'mobile'}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
