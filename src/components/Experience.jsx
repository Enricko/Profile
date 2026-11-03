import React from 'react';
import { MapPin } from 'lucide-react';
import SectionHead from './SectionHead';
import './Experience.css';

const EXPERIENCES = [
  {
    title: 'Software Developer',
    company: 'PT. Binav Maju Sejahtera',
    location: 'Indonesia / Remote',
    period: 'Aug 2022 — Present',
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
  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionHead
          index="02"
          label="Experience"
          title={<>Where I've been <em>shipping</em></>}
        >
          Production work across platform engineering, mobile field apps, and analytics — most recent first.
        </SectionHead>

        <ol className="exp-list">
          {EXPERIENCES.map((exp) => (
            <li
              key={`${exp.company}-${exp.period}`}
              className={`exp-item reveal-on-scroll ${exp.current ? 'is-current' : ''}`}
            >
              <div className="exp-aside">
                <span className="exp-period">{exp.period}</span>
                {exp.current && (
                  <span className="pill pill-accent exp-current">
                    <span className="live-dot" aria-hidden="true" /> Current role
                  </span>
                )}
              </div>

              <div className="exp-main">
                <h3 className="exp-role">{exp.title}</h3>
                <p className="exp-company">
                  <span className="exp-company-name">{exp.company}</span>
                  <span className="exp-location">
                    <MapPin size={13} aria-hidden="true" /> {exp.location}
                  </span>
                </p>
                <p className="exp-desc">{exp.description}</p>
                <div className="tag-list">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
