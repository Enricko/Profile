import React from 'react';
import { skillCategories } from '../data/profile';
import './SkillsCloud.css';

function SkillIcon({ name, icon }) {
  if (icon) return <img src={icon} alt="" className="skill-logo" loading="lazy" />;
  return (
    <span className="skill-monogram" aria-hidden="true">
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function SkillsCloud() {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// tech stack</span>
          <h2 className="section-title">Technical Expertise</h2>
        </div>
        <p className="skills-desc text-muted reveal-on-scroll delay-100">
          A comprehensive breakdown of my technical capabilities across different stacks and platforms.
        </p>

        {skillCategories.map((category, catIdx) => (
          <div key={category.name} className="skills-category">
            <h3 className="skills-category-title reveal-on-scroll">{category.name}</h3>
            <div className="skills-grid">
              {category.skills.map((skill, idx) => (
                <div
                  key={skill.name}
                  className="logo-card reveal-on-scroll"
                  style={{ transitionDelay: `${((catIdx * 5 + idx) % 10) * 50}ms` }}
                  onMouseMove={onMove}
                >
                  <SkillIcon name={skill.name} icon={skill.icon} />
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
