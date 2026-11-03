import React from 'react';
import { Code2, Smartphone, Terminal, Cpu, Bot, Zap } from 'lucide-react';
import { useCountUp, useInView } from '../lib/useInteractions';
import SectionHead from './SectionHead';
import './About.css';

const PILLARS = [
  {
    icon: <Code2 size={19} />,
    title: 'Web & API Architecture',
    description: 'Engineering responsive, resilient web apps using React, TypeScript, FastAPI, and Laravel with optimized database schemas.',
  },
  {
    icon: <Smartphone size={19} />,
    title: 'Cross-Platform Applications',
    description: 'Crafting responsive mobile applications (Flutter) and desktop software (Electron) with offline persistence and background tasks.',
  },
  {
    icon: <Terminal size={19} />,
    title: 'Systems & Real-Time Engines',
    description: 'Developing high-throughput media pipelines (NVENC), WebSocket market signal feeds, and Redis-cached aggregators.',
  },
];

// Only claims backed by this page: roles in Experience, credentials in Education.
const STATS = [
  { value: 4,  suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 4,  suffix: '',  label: 'Companies' },
  { value: 5,  suffix: '',  label: 'Certifications & Awards' },
];

const QUICK_BADGES = [
  { icon: <Cpu size={13} />, text: 'Full-Stack & Systems' },
  { icon: <Zap size={13} />, text: 'Real-Time & Low-Latency' },
  { icon: <Bot size={13} />, text: 'AI-Assisted, Human-Reviewed' },
];

function StatItem({ value, suffix, label, active }) {
  const n = useCountUp(value, active);
  return (
    <div className="stat-item">
      <span className="stat-number">{n}<span className="stat-suffix">{suffix}</span></span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const [statsRef, inView] = useInView({ threshold: 0.3 });

  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHead
          index="01"
          label="About"
          title={<>Engineering robust software with <em>precision</em> and craft</>}
        />

        <div className="about-grid">
          <div className="about-content reveal-on-scroll delay-100">
            <p className="about-lead">
              I'm Enricko Putra Hartono — often going by <span className="highlight">Lufria</span> —
              a Software Engineer and Computer Science student at{' '}
              <span className="highlight">Universitas AMIKOM Yogyakarta</span> (IT Professional Track).
            </p>
            <p>
              My work centers on building reliable, aesthetic, and production-ready applications across web,
              mobile, and desktop environments.
            </p>
            <p>
              From architecting high-throughput media pipelines with GPU hardware acceleration, to engineering
              real-time financial advisory systems and enterprise payroll calculators, I bridge system-level
              rigor with polished frontends. I prefer intentional, high-density interfaces that respect the
              user's attention over generic clutter.
            </p>

            <div className="about-badges">
              {QUICK_BADGES.map((b) => (
                <span key={b.text} className="pill">
                  {b.icon} {b.text}
                </span>
              ))}
            </div>
          </div>

          <ul className="pillars card reveal-on-scroll delay-200">
            {PILLARS.map((pillar) => (
              <li key={pillar.title} className="pillar">
                <span className="icon-box">{pillar.icon}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="stats reveal-on-scroll delay-200" ref={statsRef}>
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
