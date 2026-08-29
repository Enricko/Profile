import React from 'react';
import { ArrowUpRight, LockKeyhole, Layers3 } from 'lucide-react';
import './FeaturedWork.css';

const FEATURED_WORK = [
  {
    number: '01',
    label: 'CORPORATE WEBSITE',
    title: 'Binav Maju Sejahtera Company',
    summary: 'A corporate website showcasing offshore surveying, positioning, and marine support services through a clear, content-rich experience.',
    role: 'Web Developer',
    focus: ['Company profile', 'Service showcase', 'Responsive UI','Offshore Navigation App'],
    link: 'https://binav.co.id',
    linkLabel: 'Visit binav.co.id',
  },
  {
    number: '02',
    label: 'FIELD OPERATIONS',
    title: 'Cetaphil Coverage App',
    summary: 'A mobile field application built around GPS mapping, coverage tracking, and reliable remote data synchronization.',
    role: 'App Developer',
    focus: ['GPS mapping', 'Field dashboards', 'Data sync'],
    private: true,
  },
  {
    number: '03',
    label: 'BUSINESS INTELLIGENCE',
    title: 'IGNICE Outlet Dashboard',
    summary: 'A database-driven system for outlet coverage, target achievement, and operational reporting.',
    role: 'App Developer',
    focus: ['Target tracking', 'Reporting', 'Dashboard UX'],
    private: true,
  },
];

function CaseStudyCard({ work, index }) {
  const onMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    element.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const content = (
    <>
      <div className="case-study-topline">
        <span className="case-study-number">{work.number}</span>
        <span className="case-study-label">{work.label}</span>
        <span className={`case-study-status ${work.private ? 'is-private' : 'is-live'}`}>
          {work.private ? <><LockKeyhole size={13} /> Private</> : <><ArrowUpRight size={14} /> Live</>}
        </span>
      </div>

      <div className="case-study-icon"><Layers3 size={22} /></div>
      <h3 className="case-study-title">{work.title}</h3>
      <p className="case-study-summary">{work.summary}</p>

      <div className="case-study-meta">
        <span>{work.role}</span>
        <span className="case-study-divider" aria-hidden="true" />
        <span>{work.private ? 'Details available on request' : work.linkLabel}</span>
      </div>

      <div className="case-study-tags">
        {work.focus.map((item) => <span key={item}>{item}</span>)}
      </div>
    </>
  );

  const className = `glass-card spotlight case-study-card reveal-on-scroll delay-${(index + 1) * 100}`;

  return work.link ? (
    <a className={className} href={work.link} target="_blank" rel="noreferrer" onMouseMove={onMove}>
      {content}
    </a>
  ) : (
    <article className={className} onMouseMove={onMove}>
      {content}
    </article>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="featured-work">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// selected work</span>
          <h2 className="section-title">Work With Purpose</h2>
        </div>

        <p className="featured-work-intro text-muted reveal-on-scroll delay-100">
          A closer look at the kinds of systems I enjoy building. Private product details stay high level;
          I’m happy to share the process and technical context directly.
        </p>

        <div className="case-study-grid">
          {FEATURED_WORK.map((work, index) => <CaseStudyCard key={work.title} work={work} index={index} />)}
        </div>
      </div>
    </section>
  );
}
