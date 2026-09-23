import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import './Experience.css';

const EXPERIENCES = [
  {
    title: 'Software Developer',
    company: 'PT. Binav Maju Sejahtera',
    location: 'Indonesia / Remote',
    period: 'Aug 2023 — Present',
    current: true,
    description: 'Building AVTS platforms, AI systems, and server maintenance solutions for intelligent automation, streamlined operational workflows, and scalable internal systems.',
    tags: ['AVTS', 'AI System', 'Server Maintenance']
  },
  {
    title: 'Mobile Application Developer',
    company: 'Cetaphil',
    location: 'Jakarta / Remote',
    period: 'Dec 2024 — Jan 2026',
    current: false,
    description: 'Engineered cross-platform mobile modules for field merchandising, geofenced GPS outlet tracking, and high-res offline photo syncing with Laravel backend services.',
    tags: ['Flutter', 'Mobile Architecture', 'GPS Geofencing', 'Laravel', 'Offline Sync'],
  },
  {
    title: 'Mobile Application Developer',
    company: 'IGNICE',
    location: 'Yogyakarta / Hybrid',
    period: 'Oct 2024 — Dec 2024',
    current: false,
    description: 'Developed analytics dashboards and automated reporting modules tracking outlet coverage KPIs, target achievements, and regional distribution metrics.',
    tags: ['Mobile Development', 'Web Dashboards', 'KPI Telemetry', 'MySQL'],
  },
  {
    title: 'Full-Stack Developer (Apprentice)',
    company: 'PT LAUWBA TECHNO INDONESIA',
    location: 'Yogyakarta',
    period: 'Jun 2022 — Sep 2022',
    current: false,
    description: 'Completed comprehensive software engineering apprenticeship building full-stack web applications, database schema designs, and RESTful API integrations.',
    tags: ['Web Applications', 'PHP / Laravel', 'REST APIs', 'Database Design'],
  },
];

export default function Experience() {
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
          <span className="eyebrow">// track record</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        <div className="timeline">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className={`timeline-item reveal-on-scroll ${exp.current ? 'is-current' : ''}`}
              style={{ transitionDelay: `${(idx % 4) * 90}ms` }}
            >
              <div className="timeline-dot">
                <span />
              </div>

              <div className="glass-card spotlight timeline-content" onMouseMove={onMove}>
                <div className="timeline-header">
                  <div>
                    <div className="timeline-role-row">
                      <h3 className="timeline-role">{exp.title}</h3>
                      {exp.current && (
                        <span className="current-badge">
                          <span className="current-pulse-dot" /> Active Role
                        </span>
                      )}
                    </div>
                    <div className="timeline-company-row">
                      <span className="timeline-company">
                        <Briefcase size={14} /> {exp.company}
                      </span>
                      <span className="timeline-location">
                        <MapPin size={13} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="timeline-period">
                    <Calendar size={13} /> {exp.period}
                  </div>
                </div>

                <p className="timeline-desc text-muted">{exp.description}</p>

                <div className="timeline-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="badge">
                      {tag}
                    </span>
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
