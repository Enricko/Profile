import React from 'react';
import './Skills.css';

const SKILLS = [
  { name: 'React', icon: '/logos/react.svg' },
  { name: 'Vite', icon: '/logos/vite.svg' },
  { name: 'JavaScript', icon: '/logos/javascript.svg' },
  { name: 'TypeScript', icon: '/logos/typescript.svg' },
  { name: 'CSS3', icon: '/logos/css3.svg' },
  { name: 'Tailwind CSS', icon: '/logos/tailwindcss.svg' },
  { name: 'Vue.js', icon: '/logos/vuedotjs.svg' },
  { name: 'Laravel', icon: '/logos/laravel.svg' },
  { name: 'PHP', icon: '/logos/php.svg' },
  { name: 'Python', icon: '/logos/python.svg' },
  { name: 'Go', icon: '/logos/go.svg' },
  { name: 'MySQL', icon: '/logos/mysql.svg' },
  { name: 'PostgreSQL', icon: '/logos/postgresql.svg' },
  { name: 'Node.js', icon: '/logos/nodedotjs.svg' },
  { name: 'React Native', icon: '/logos/react.svg' },
  { name: 'Flutter', icon: '/logos/flutter.svg' },
  { name: 'Electron', icon: '/logos/electron.svg' },
];

export default function Skills() {
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

        <div className="skills-grid">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="logo-card reveal-on-scroll"
            >
              <img src={skill.icon} alt={skill.name} className="skill-logo" loading="lazy" />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
