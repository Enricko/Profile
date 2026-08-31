import React from 'react';
import { Code, MonitorSmartphone, Database } from 'lucide-react';
import { useCountUp, useInView } from '../lib/useInteractions';
import './About.css';

const FEATURES = [
  {
    icon: <Code size={30} />,
    accent: 'cyan',
    title: 'Web Development',
    description: 'Building responsive, modern web applications using React, Vue, and Laravel.',
  },
  {
    icon: <MonitorSmartphone size={30} />,
    accent: 'pink',
    title: 'Mobile & Desktop',
    description: 'Creating cross-platform mobile experiences and robust desktop solutions.',
  },
  {
    icon: <Database size={30} />,
    accent: 'violet',
    title: 'Backend Engineering',
    description: 'Designing efficient database schemas, API architecture, and seamless integrations.',
  },
];

const STATS = [
  { value: 3,   suffix: '+', label: 'Years of Experience' },
  { value: 3, suffix: '', label: 'Product Platforms' },
  { value: 1, suffix: '', label: 'Indonesia Based' },
];

function Stat({ value, suffix, label, active }) {
  const n = useCountUp(value, active);
  return (
    <div className="stat-item">
      <span className="stat-number text-gradient">{n}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const [statsRef, inView] = useInView({ threshold: 0.4 });

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// about me</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-grid">
          <div className="about-content reveal-on-scroll delay-100">
            <h3 className="about-subtitle">Crafting software that makes a difference</h3>
            <p>
              I'm a passionate Software Engineer based in Indonesia, specializing in building exceptional
              digital experiences. My journey in tech has equipped me with a versatile skill set spanning
              web, mobile, and backend development.
            </p>
            <p>
              Whether it's architecting a robust Laravel backend, designing a premium React frontend, or
              ensuring seamless background location tracking on Android, I thrive on turning complex
              requirements into elegant, maintainable solutions. I care deeply about clean code,
              user-centric design, and continuous learning.
            </p>

            <div className="stats-container" ref={statsRef}>
              {STATS.map((s) => (
                <Stat key={s.label} {...s} active={inView} />
              ))}
            </div>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className={`glass-card feature-card accent-${feature.accent} reveal-on-scroll`}
                style={{ transitionDelay: `${100 + index * 90}ms` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div>
                  <h4>{feature.title}</h4>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
