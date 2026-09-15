import React from 'react';
import { Code2, Smartphone, Terminal, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useCountUp, useInView } from '../lib/useInteractions';
import './About.css';

const PILLARS = [
  {
    icon: <Code2 size={26} />,
    accent: 'cyan',
    title: 'Web & API Architecture',
    description: 'Engineering responsive, resilient web apps using React, TypeScript, FastAPI, and Laravel with optimized database schemas.',
  },
  {
    icon: <Smartphone size={26} />,
    accent: 'pink',
    title: 'Cross-Platform Applications',
    description: 'Crafting responsive mobile applications (Flutter) and desktop software (Electron) with offline persistence and background tasks.',
  },
  {
    icon: <Terminal size={26} />,
    accent: 'violet',
    title: 'Systems & Real-Time Engines',
    description: 'Developing high-throughput media pipelines (NVENC), WebSocket market signal feeds, and Redis-cached aggregators.',
  },
];

const STATS = [
  { value: 3,   suffix: '+', label: 'Years Experience' },
  { value: 20,  suffix: '+', label: 'Projects Delivered' },
  { value: 99,  suffix: '%', label: 'Uptime & Reliability' },
  { value: 100, suffix: '%', label: 'Human-Crafted Code' },
];

const QUICK_BADGES = [
  { icon: <Cpu size={14} />, text: 'Full-Stack & Systems' },
  { icon: <Zap size={14} />, text: 'Real-Time & Low-Latency' },
  { icon: <ShieldCheck size={14} />, text: 'Anti-AI-Slop Standard' },
];

function StatItem({ value, suffix, label, active }) {
  const n = useCountUp(value, active);
  return (
    <div className="stat-item">
      <span className="stat-number text-gradient">{n}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const [statsRef, inView] = useInView({ threshold: 0.3 });

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// identity &amp; ethos</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-grid">
          <div className="about-content reveal-on-scroll delay-100">
            <div className="about-badges">
              {QUICK_BADGES.map((b, i) => (
                <span key={i} className="about-badge">
                  {b.icon} {b.text}
                </span>
              ))}
            </div>

            <h3 className="about-subtitle">
              Engineering robust software with precision and craft
            </h3>

            <p>
              I'm Enricko Putra Hartono (often going by <span className="highlight-text">Lufria</span>),
              a Software Engineer and Computer Science student at <span className="highlight-text">Universitas AMIKOM Yogyakarta</span> (IT Professional Track).
              My work centers on building reliable, aesthetic, and production-ready applications across web, mobile, and desktop environments.
            </p>

            <p>
              From architecting high-throughput media pipelines with GPU hardware acceleration, to engineering real-time
              financial advisory systems and enterprise payroll calculators, I bridge system-level rigor with human-crafted
              frontends. I believe in eliminating generic AI clutter in favor of intentional, high-density interfaces that respect the user's attention.
            </p>

            <div className="stats-container" ref={statsRef}>
              {STATS.map((s) => (
                <StatItem key={s.label} {...s} active={inView} />
              ))}
            </div>
          </div>

          <div className="pillars-grid">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`glass-card spotlight pillar-card accent-${pillar.accent} reveal-on-scroll`}
                style={{ transitionDelay: `${index * 120 + 200}ms` }}
                onMouseMove={onMove}
              >
                <div className="pillar-icon">{pillar.icon}</div>
                <div className="pillar-text">
                  <h4>{pillar.title}</h4>
                  <p className="text-muted">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
