import React from 'react';
import { MapPin } from 'lucide-react';
import SectionHead from './SectionHead';
import './Experience.css';

// summary:    one plain sentence on what the work is.
// highlights: what was built or achieved. Only facts from the CV, the old
//             copy and public repos (binav_avts); no invented metrics.
const EXPERIENCES = [
  {
    title: 'Software Developer',
    company: 'PT. Binav Maju Sejahtera',
    location: 'Indonesia / Remote',
    period: 'Aug 2022 — Present',
    current: true,
    summary:
      "AVTS is Binav's vessel tracking system: it shows ships' live positions on a map. I build it, plus the AI tools and servers behind the company's internal systems.",
    highlights: [
      'Built the AVTS app, streaming live vessel positions over WebSocket onto an interactive map with KML overlays',
      'Build AI systems that automate internal operational workflows',
      'Maintain the servers that keep these internal systems running',
    ],
    tags: ['Vessel Tracking', 'WebSocket', 'AI Systems', 'Server Maintenance'],
  },
  {
    title: 'Mobile Application Developer',
    company: 'Cetaphil',
    location: 'Jakarta / Remote',
    period: 'Dec 2024 — Jan 2026',
    current: false,
    summary: "Field app for Cetaphil's merchandising team, covering outlet visits, location checks and photo reports.",
    highlights: [
      'Geofenced GPS tracking that confirms staff are at the outlet they report from',
      'Offline photo capture: high-resolution photos sync to the Laravel backend once the device is back online',
      'In-app dashboards and GPS maps of outlet coverage',
    ],
    tags: ['Flutter', 'Laravel', 'GPS Geofencing', 'Offline Sync', 'Mobile Architecture'],
  },
  {
    title: 'Mobile Application Developer',
    company: 'IGNICE',
    location: 'Yogyakarta / Hybrid',
    period: 'Oct 2024 — Dec 2024',
    current: false,
    summary: 'Sales coverage reporting: which outlets are covered, and how each region is doing against its targets.',
    highlights: [
      'Outlet coverage tracking modules for the mobile app',
      'Target-achievement dashboards for outlet and regional KPIs',
      'Automated, database-driven reports on regional distribution',
    ],
    tags: ['Mobile Development', 'Web Dashboards', 'KPI Reporting', 'MySQL'],
  },
  {
    title: 'Full-Stack Developer (Apprentice)',
    company: 'PT LAUWBA TECHNO INDONESIA',
    location: 'Yogyakarta',
    period: 'Jun 2022 — Sep 2022',
    current: false,
    summary: 'Full-stack web apprenticeship, building web applications end to end, from the database to the interface.',
    highlights: [
      'Built full-stack web application features in PHP and Laravel',
      'Designed database schemas and integrated REST APIs',
    ],
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
          Production work across vessel tracking, mobile field apps and sales analytics, most recent first.
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
                <p className="exp-summary">{exp.summary}</p>
                <ul className="exp-highlights">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
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
