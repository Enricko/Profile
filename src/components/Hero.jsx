import React, { useState } from 'react';
import { ArrowRight, Layers, ChevronDown, FileText, Check, Copy, Terminal, Code2, Database } from 'lucide-react';
import { useTilt, useTypewriter } from '../lib/useInteractions';
import './Hero.css';

const FLOATERS = [
  { src: '/logos/react.svg',      name: 'React',      cls: 'f1' },
  { src: '/logos/flutter.svg',    name: 'Flutter',    cls: 'f2' },
  { src: '/logos/laravel.svg',    name: 'Laravel',    cls: 'f3' },
  { src: '/logos/typescript.svg', name: 'TypeScript', cls: 'f4' },
  { src: '/logos/go.svg',         name: 'Go',         cls: 'f5' },
];

const CODE_TABS = [
  {
    id: 'ts',
    label: 'developer.ts',
    icon: <Code2 size={13} />,
    code: `interface SoftwareEngineer {
  name: string;
  focus: ('Web' | 'Mobile' | 'Desktop' | 'AI Systems')[];
  location: string;
  availability: 'Ready to build' | 'Shipping';
  coreStack: string[];
}

const enricko: SoftwareEngineer = {
  name: 'Enricko Putra Hartono',
  focus: ['Web', 'Mobile', 'Desktop', 'AI Systems'],
  location: 'Yogyakarta, Indonesia',
  availability: 'Ready to build',
  coreStack: ['React', 'Flutter', 'Laravel', 'Python', 'FastAPI']
};`,
  },
  {
    id: 'arch',
    label: 'architecture.json',
    icon: <Database size={13} />,
    code: `{
  "engineer": "Enricko Putra Hartono",
  "specialization": "Full-Stack & Systems Architecture",
  "capabilities": {
    "web": ["React", "TypeScript", "Tailwind", "Vite"],
    "mobile_desktop": ["Flutter", "Electron", "Cross-Platform"],
    "backend_api": ["FastAPI", "Laravel", "Python", "Node.js"],
    "data_infra": ["PostgreSQL", "MySQL", "Redis", "NVENC"]
  },
  "craft_standards": "Human-Crafted • Tabular Precision • High Density"
}`,
  },
  {
    id: 'bash',
    label: 'system.sh',
    icon: <Terminal size={13} />,
    code: `$ curl -s https://api.lufria.tech/health | jq .
{
  "status": "online",
  "service": "lufria-portfolio-v2",
  "uptime": "99.99%",
  "latency": "12ms",
  "mode": "Anti-AI-Slop • Cyberpunk Neon • Responsive"
}
$ echo "Ready to engineer robust digital products."`,
  },
];

export default function Hero() {
  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt(12);
  const [activeTab, setActiveTab] = useState('ts');
  const [copied, setCopied] = useState(false);

  const role = useTypewriter(
    ['Web Applications', 'Mobile Solutions', 'Desktop Systems', 'Robust APIs'],
    { typeSpeed: 75, deleteSpeed: 38, pause: 1400 }
  );

  const currentTab = CODE_TABS.find((t) => t.id === activeTab) || CODE_TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-up delay-100">
            <span className="pulse-dot" /> Available for Web, Mobile &amp; Desktop Engineering
          </div>

          <h1 className="hero-title animate-up delay-200">
            Hello, I'm <br />
            <span className="text-gradient">Enricko Putra Hartono</span>
          </h1>

          <div className="hero-typer animate-up delay-300">
            <span className="typer-label">I engineer</span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" />
          </div>

          <p className="hero-description animate-up delay-400">
            Versatile Software Engineer crafting high-performance, human-centered systems across
            Web, Desktop, and Mobile. Dedicated to clean architecture, purposeful motion, and
            uncompromising craft.
          </p>

          <div className="hero-actions animate-up delay-500">
            <a href="#contact" className="btn btn-primary">
              Let's Talk <ArrowRight size={18} />
            </a>
            <a href="#projects" className="btn btn-outline">
              <Layers size={17} /> Explore Projects
            </a>
            <a
              href="/cv/Enricko-Putra-Hartono-CV.pdf?rev=20260922-avts-ai-server-maintenance"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <FileText size={17} /> View CV
            </a>
          </div>
        </div>

        <div className="hero-visual animate-up delay-400">
          {FLOATERS.map((f) => (
            <div key={f.cls} className={`floater ${f.cls}`} title={f.name}>
              <img src={f.src} alt={f.name} aria-hidden="true" width="28" height="28" />
            </div>
          ))}

          <div
            ref={tiltRef}
            className="glass-card visual-card"
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
          >
            <div className="card-glare" />

            <div className="code-header">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>

              <div className="code-tabs">
                {CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`code-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <button
                className="code-copy-btn"
                onClick={handleCopy}
                aria-label="Copy code to clipboard"
                title="Copy code"
                type="button"
              >
                {copied ? <Check size={14} className="copied" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="code-container">
              <pre className="code-body">
                <code>{currentTab.code}</code>
              </pre>
            </div>

            <div className="code-status-bar">
              <span className="status-item"><span className="status-online-dot" /> UTF-8</span>
              <span className="status-item">TypeScript / JSON / Shell</span>
              <span className="status-item">Ready to Deploy</span>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span>Explore</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
