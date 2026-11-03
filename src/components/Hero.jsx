import React, { useState } from 'react';
import { ArrowRight, FileText, Check, Copy, Terminal, Code2, Braces, MapPin, Globe2, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const CODE_TABS = [
  {
    id: 'ts',
    label: 'developer.ts',
    lang: 'TypeScript',
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
    id: 'json',
    label: 'architecture.json',
    lang: 'JSON',
    icon: <Braces size={13} />,
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
    id: 'sh',
    label: 'workflow.sh',
    lang: 'Shell',
    icon: <Terminal size={13} />,
    code: `$ uptime
  architecting systems since 2022 — Yogyakarta, ID
  shipping web, mobile & desktop products

$ echo "Ready to engineer robust digital products."`,
  },
];

// Tiny, dependency-free highlighter for the three static snippets above.
const TOKEN_RULES = {
  ts: /(?<str>'[^']*')|\b(?<kw>interface|const|string)\b|(?<type>\b[A-Z]\w+\b)|(?<key>\b\w+\b)(?=\??:)/g,
  json: /(?<key>"[^"]*")(?=\s*:)|(?<str>"[^"]*")/g,
  sh: /^(?<prompt>\$)|(?<str>"[^"]*")/g,
};

function highlightLine(line, lang) {
  if (lang === 'sh' && !line.startsWith('$')) {
    return <span className="tok-out">{line}</span>;
  }
  const re = new RegExp(TOKEN_RULES[lang]);
  const parts = [];
  let last = 0;
  let m;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    const kind = Object.keys(m.groups).find((k) => m.groups[k] !== undefined);
    parts.push(<span key={m.index} className={`tok-${kind}`}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

export default function Hero() {
  const [activeTab, setActiveTab] = useState('ts');
  const [copied, setCopied] = useState(false);

  const currentTab = CODE_TABS.find((t) => t.id === activeTab) || CODE_TABS[0];
  const lines = currentTab.code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <a href="#contact" className="pill pill-accent hero-status animate-up delay-100">
            <span className="live-dot" aria-hidden="true" />
            Available for Web, Mobile &amp; Desktop engineering
          </a>

          <h1 className="hero-title animate-up delay-200">
            Enricko Putra <span className="hero-title-last">Hartono</span>
          </h1>

          <p className="hero-role animate-up delay-200">
            Software Engineer <span aria-hidden="true">·</span> a.k.a. <span className="hero-alias">Lufria</span>
          </p>

          <p className="hero-lead animate-up delay-300">
            Building high-performance systems across web, desktop, and mobile — with a
            production workflow powered by <em className="serif">agentic AI</em> coding tools,
            model routing, and self-hosted infrastructure.
          </p>

          <div className="hero-actions animate-up delay-400">
            <a href="#projects" className="btn btn-primary">
              View projects <ArrowRight size={17} className="icon-shift" />
            </a>
            <a
              href="/cv/Enricko-Putra-Hartono-CV.pdf?rev=20261103-experience-rewrite"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FileText size={16} /> View CV
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} /> Contact
            </a>
          </div>

          <ul className="hero-meta animate-up delay-500">
            <li><MapPin size={14} aria-hidden="true" /> Yogyakarta, Indonesia</li>
            <li><Globe2 size={14} aria-hidden="true" /> Open to remote work</li>
            <li>
              <a href="https://github.com/Enricko" target="_blank" rel="noreferrer">
                <FaGithub size={14} aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer">
                <FaLinkedin size={14} aria-hidden="true" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="hero-visual animate-up delay-300">
          <div className="code-window">
            <div className="code-header">
              <div className="code-tabs" role="tablist" aria-label="Code samples">
                {CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`code-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
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

            <pre className="code-body" role="tabpanel">
              <code>
                {lines.map((line, i) => (
                  <span className="code-line" key={`${activeTab}-${i}`}>
                    <span className="code-text">{highlightLine(line, currentTab.id)}</span>
                    {'\n'}
                  </span>
                ))}
              </code>
            </pre>

            <div className="code-status-bar">
              <span><span className="live-dot" aria-hidden="true" /> {currentTab.lang}</span>
              <span>UTF-8</span>
              <span className="status-right">AI-assisted · human-reviewed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
