import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import './Experience.css';

const EXPERIENCES = [
  {
    title: 'Freelance Software Developer',
    company: 'PT. Binav Maju Sejahtera',
    period: 'Aug 2023 - Present',
    description: 'Providing part-time freelance software development and technical expertise to build tailored and maintainable solutions.',
    tags: ['Software Development', 'Problem Solving'],
  },
  {
    title: 'App Developer',
    company: 'Cetaphil',
    period: 'Dec 2024 - Jan 2026',
    description: 'Developed a robust mobile application focusing on high-performance dashboards, GPS mapping, coverage tracking, and remote field data synchronization.',
    tags: ['Mobile App Development', 'Application Development', 'GPS integration'],
  },
  {
    title: 'App Developer',
    company: 'IGNICE',
    period: 'Oct 2024 - Dec 2024',
    description: 'Built application modules for outlet coverage tracking, dynamic target achievements dashboards, and complex database-driven outlet reporting.',
    tags: ['Application Development', 'Web Dashboards'],
  },
  {
    title: 'Full Stack Developer (Intern)',
    company: 'PT LAUWBA TECHNO INDONESIA',
    period: 'Jun 2022 - Sep 2022',
    description: 'Completed a comprehensive apprenticeship focused on robust Web and Application Development, building cross-functional full-stack features.',
    tags: ['Web Applications', 'Application Development'],
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
          <span className="eyebrow">// career</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        <div className="timeline">
          {EXPERIENCES.map((exp, idx) => (
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
