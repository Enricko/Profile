import React, { useState } from 'react';
import './Skills.css';

const SKILLS = [
  { name: 'React', icon: '/logos/react.svg', category: 'frontend', role: 'UI Library' },
  { name: 'Vite', icon: '/logos/vite.svg', category: 'frontend', role: 'Build Tool' },
  { name: 'JavaScript', icon: '/logos/javascript.svg', category: 'language', role: 'Core Language' },
  { name: 'TypeScript', icon: '/logos/typescript.svg', category: 'language', role: 'Typed SuperSet' },
  { name: 'CSS3', icon: '/logos/css3.svg', category: 'frontend', role: 'Styling & Tokens' },
  { name: 'Tailwind CSS', icon: '/logos/tailwindcss.svg', category: 'frontend', role: 'Utility Framework' },
  { name: 'Vue.js', icon: '/logos/vuedotjs.svg', category: 'frontend', role: 'Progressive UI' },
  { name: 'Flutter', icon: '/logos/flutter.svg', category: 'mobile', role: 'Cross-Platform App' },
  { name: 'Electron', icon: '/logos/electron.svg', category: 'desktop', role: 'Desktop Runtime' },
  { name: 'Laravel', icon: '/logos/laravel.svg', category: 'backend', role: 'Full-Stack PHP' },
  { name: 'PHP', icon: '/logos/php.svg', category: 'language', role: 'Backend Engine' },
  { name: 'Python', icon: '/logos/python.svg', category: 'backend', role: 'Data & APIs' },
  { name: 'Go', icon: '/logos/go.svg', category: 'backend', role: 'Low-Latency Microservices' },
  { name: 'Node.js', icon: '/logos/nodedotjs.svg', category: 'backend', role: 'Runtime & Tools' },
  { name: 'MySQL', icon: '/logos/mysql.svg', category: 'database', role: 'Relational DB' },
  { name: 'PostgreSQL', icon: '/logos/postgresql.svg', category: 'database', role: 'Enterprise SQL' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'mobile-desktop', label: 'Mobile & Desktop' },
  { id: 'database', label: 'Databases' },
];

const MARQUEE = [...SKILLS, ...SKILLS];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const filteredSkills = SKILLS.filter((s) => {
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
          <h2 className="section-title">Technical Radar</h2>
        </div>

        <p className="skills-desc text-muted reveal-on-scroll delay-100">
          Core technologies, frameworks, and database architectures utilized across production web applications,
          real-time systems, and client software.
        </p>

        {/* Skill Category Tabs */}
        <div className="skills-filter-tabs reveal-on-scroll delay-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`skill-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className="logo-card reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 8) * 45}ms` }}
              onMouseMove={onMove}
            >
              <div className="skill-logo-wrapper">
                <img src={skill.icon} alt={skill.name} className="skill-logo" loading="lazy" width="40" height="40" />
              </div>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-role-badge">{skill.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Seamless Marquee */}
      <div className="marquee reveal-on-scroll" aria-hidden="true">
        <div className="marquee-track">
          {MARQUEE.map((s, i) => (
            <span className="marquee-item" key={i}>
              <img src={s.icon} alt="" width="20" height="20" /> {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
