import React, { useState } from 'react';
import { LANGUAGES, TOOLS, LANGUAGE_FILTERS } from '../data/tools';
import SectionHead from './SectionHead';
import './Skills.css';

// Display groups for the tools list, in order (keys are TOOLS[].category)
const TOOL_GROUPS = [
  { label: 'AI coding & agents', categories: ['ai'] },
  { label: 'Editor & version control', categories: ['editor', 'vcs'] },
  { label: 'Infrastructure', categories: ['infra'] },
  { label: 'Automation & ops', categories: ['ops'] },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

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
        <SectionHead
          index="04"
          label="Stack"
          title={<>Tools of the <em>trade</em></>}
        >
          Core technologies for production web, mobile, and desktop systems — plus the AI-driven
          workflow used to design, build, ship, and operate them every day.
        </SectionHead>

        <div className="stack-layout">
          <div className="stack-panel card reveal-on-scroll delay-100">
            <div className="stack-panel-head">
              <h3>Languages &amp; frameworks</h3>
              <span className="stack-count">{filteredLanguages.length}</span>
            </div>

            <div className="segmented stack-filters" role="group" aria-label="Filter languages">
              {LANGUAGE_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  className={activeCategory === cat.id ? 'active' : ''}
                  onClick={() => setActiveCategory(cat.id)}
                  type="button"
                  aria-pressed={activeCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <ul className="lang-grid">
              {filteredLanguages.map((skill) => (
                <li key={skill.name} className="lang-tile">
                  <img src={skill.icon} alt="" loading="lazy" width="28" height="28" />
                  <span className="lang-name">{skill.name}</span>
                  <span className="lang-role">{skill.role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="stack-panel card reveal-on-scroll delay-200">
            <div className="stack-panel-head">
              <h3>Tools &amp; AI workflow</h3>
              <span className="stack-count">{TOOLS.length}</span>
            </div>
            <p className="stack-note">
              The daily driver loop — agentic coding, model routing, and the infra that keeps
              everything running in production.
            </p>

            <div className="tool-groups">
            {TOOL_GROUPS.map((group) => (
              <div key={group.label} className="tool-group">
                <span className="tool-group-label">{group.label}</span>
                <ul className="tool-list">
                  {TOOLS.filter((t) => group.categories.includes(t.category)).map((tool) => (
                    <li key={tool.name} className="tool-row">
                      <span className="tool-icon" aria-hidden="true">
                        {tool.img
                          ? <img src={tool.img} alt="" loading="lazy" width="18" height="18" />
                          : <tool.Icon size={16} strokeWidth={1.8} />}
                      </span>
                      <span className="tool-text">
                        <span className="tool-name">{tool.name}</span>
                        <span className="tool-role">{tool.role}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
