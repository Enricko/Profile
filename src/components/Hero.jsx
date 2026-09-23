import React, { useState } from 'react';
import { ArrowRight, Layers, ChevronDown, FileText, Check, Copy, Terminal, Code2, Database, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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
  aiWorkflow: string[];
  coreStack: string[];
}

const enricko: SoftwareEngineer = {
  name: 'Enricko Putra Hartono',
  focus: ['Web', 'Mobile', 'Desktop', 'AI Systems'],
  location: 'Yogyakarta, Indonesia',
  availability: 'Ready to build',
  aiWorkflow: ['Claude Code', 'Codex', 'Hermes', '9Router', 'Antigravity'],
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
    "data_infra": ["PostgreSQL", "MySQL", "Redis", "Docker"]
  },
  "workflow": "agentic coding · model routing · self-hosted infra"
}`,
  },
  {
    id: 'bash',
    label: 'workflow.sh',
    icon: <Terminal size={13} />,
    code: `$ uptime
  architecting systems since 2023 — Yogyakarta, ID
  shipping web, mobile & desktop products

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
            Enricko <span className="text-gradient">Putra Hartono</span>
          </h1>

          <p className="hero-role animate-up delay-250">
            Software Engineer <span className="role-sep" aria-hidden="true">·</span> Lufria
          </p>

          <div className="hero-typer animate-up delay-300">
            <span className="typer-label">I engineer</span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" />
          </div>

          <p className="hero-description animate-up delay-400">
            Building high-performance systems across Web, Desktop, and Mobile — with a
            production workflow powered by agentic AI coding tools, model routing, and
            self-hosted infrastructure.
          </p>

          <div className="hero-meta animate-up delay-450">
            <span className="hero-meta-item">
              <MapPin size={14} /> Yogyakarta, Indonesia
            </span>
            <span className="hero-meta-item">
              <span className="live-dot-green" aria-hidden="true" /> Open to remote work
            </span>
          </div>

          <div className="hero-actions animate-up delay-500">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline">
              <Layers size={17} /> Contact
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

          <div className="hero-socials animate-up delay-550" aria-label="Social links">
            <a
              href="https://github.com/Enricko"
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label="GitHub profile"
            >
              <FaGithub size={18} aria-hidden="true" /> GitHub
            </a>
            <span className="hero-social-sep" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/"
              target="_blank"
              rel="noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin size={18} aria-hidden="true" /> LinkedIn
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
              <span className="status-item">AI-Assisted · Human-Reviewed</span>
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
