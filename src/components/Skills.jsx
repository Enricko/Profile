import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { LANGUAGES, TOOLS, LANGUAGE_FILTERS, HERO_AI_WORKFLOW } from '../data/tools';
import './Skills.css';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const filteredLanguages = LANGUAGES.filter((s) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'frontend') return s.category === 'frontend' || (s.category === 'language' && ['JavaScript', 'TypeScript'].includes(s.name));
    if (activeCategory === 'backend') return s.category === 'backend' || (s.category === 'language' && ['PHP', 'Python', 'Go'].includes(s.name));
    if (activeCategory === 'mobile-desktop') return s.category === 'mobile' || s.category === 'desktop';
    if (activeCategory === 'database') return s.category === 'database';
    return true;
  });

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// capabilities</span>
          <h2 className="section-title">Tech Stack</h2>
        </div>

        <p className="skills-desc text-muted reveal-on-scroll delay-100">
          Core technologies for production web, mobile, and desktop systems — plus the AI-driven
          workflow used to design, build, ship, and operate them every day.
        </p>

        <div className="stack-layout reveal-on-scroll delay-200">
          {/* GROUP 1 — Programming Languages */}
          <div className="stack-group glass-card spotlight" onMouseMove={onMove}>
            <div className="stack-group-head">
              <span className="stack-group-title">Programming Languages &amp; Stack</span>
              <span className="stack-group-count">{filteredLanguages.length}</span>
            </div>

            <div className="skills-filter-tabs" role="tablist" aria-label="Filter languages">
              {LANGUAGE_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  className={`skill-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="skills-grid">
              {filteredLanguages.map((skill) => (
                <div key={skill.name} className="logo-card" onMouseMove={onMove}>
                  <div className="skill-logo-wrapper">
                    <img src={skill.icon} alt={skill.name} className="skill-logo" loading="lazy" width="40" height="40" />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-role-badge">{skill.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GROUP 2 — Tools & AI Workflow (visually connected on desktop) */}
          <div className="stack-group stack-group-tools glass-card spotlight" onMouseMove={onMove}>
            <div className="stack-group-head">
              <span className="stack-group-title">Tools &amp; AI Workflow</span>
              <span className="stack-group-count">{TOOLS.length}</span>
            </div>

            <p className="stack-tools-note text-muted">
              The daily driver loop — agentic coding, model routing, and the infra that keeps
              everything running in production.
            </p>

            <ul className="tools-grid">
              {TOOLS.map((tool) => (
                <li key={tool.name} className="tool-card" onMouseMove={onMove}>
                  <span className="tool-icon" aria-hidden="true">
                    {tool.img
                      ? <img src={tool.img} alt="" loading="lazy" width="22" height="22" />
                      : <tool.Icon size={22} strokeWidth={1.8} />}
                  </span>
                  <span className="tool-text">
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-role">{tool.role}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="stack-terminal" aria-hidden="true">
              <span className="stack-terminal-prompt">$</span>
              <span className="stack-terminal-cmd">lufria workflow --agents</span>
              <span className="stack-terminal-out">{HERO_AI_WORKFLOW}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Seamless Marquee */}
      <div className="marquee reveal-on-scroll" aria-hidden="true">
        <div className="marquee-track">
          {[...LANGUAGES, ...LANGUAGES].map((s, i) => (
            <span className="marquee-item" key={i}>
              <img src={s.icon} alt="" width="20" height="20" /> {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
