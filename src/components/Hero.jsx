import React, { useState, useCallback, useMemo } from 'react';
import { ArrowRight, ChevronDown, FileText, Copy, Check } from 'lucide-react';
import { useTypewriter } from '../lib/useInteractions';
import './Hero.css';

const ROLES = [
  'Field Applications',
  'Cross-Platform Apps',
  'High-Performance Backends',
  'Intuitive Dashboards',
];

const FLOATERS = [
  { name: 'React', src: '/logos/react.svg', cls: 'f1' },
  { name: 'Flutter', src: '/logos/flutter.svg', cls: 'f2' },
  { name: 'Laravel', src: '/logos/laravel.svg', cls: 'f3' },
  { name: 'TypeScript', src: '/logos/typescript.svg', cls: 'f4' },
  { name: 'Go', src: '/logos/go.svg', cls: 'f5' },
  { name: 'Python', src: '/logos/python.svg', cls: 'f6' },
];

const TABS = [
  {
    id: 'developer',
    filename: 'Developer.ts',
    lang: 'ts',
    accent: 'blue',
    code: `interface Developer {
  name: string;
  role: string;
  location: string;
  stack: string[];
  status: "available" | "booked";
}

const enricko: Developer = {
  name: "Enricko Putra Hartono",
  role: "Software Engineer",
  location: "Indonesia",
  stack: ["React", "Flutter", "Laravel", "Go"],
  status: "available",
};

export default enricko;`,
  },
  {
    id: 'architecture',
    filename: 'Architecture.json',
    lang: 'json',
    accent: 'amber',
    code: `{
  "platforms": ["Web", "Mobile", "Desktop"],
  "focus": [
    "Field Applications",
    "Operational Dashboards",
    "Cross-Platform Products"
  ],
  "principles": [
    "clean-code",
    "scalable-architecture",
    "user-centric-design"
  ]
}`,
  },
  {
    id: 'stack',
    filename: 'Stack.config',
    lang: 'ini',
    accent: 'emerald',
    code: `[frontend]
react      = "19.x"
typescript = "latest"

[mobile]
flutter    = "stable"

[backend]
laravel    = "11.x"
go         = "1.23"
python     = "3.12"

[database]
mysql      = "8.0"
postgresql = "16"`,
  },
];

const TOKEN_RULES = {
  ts: [
    { type: 'string', re: /"(?:[^"\\]|\\.)*"/ },
    { type: 'keyword', re: /\b(?:interface|const|export|default|string|number|boolean)\b/ },
    { type: 'property', re: /\b[A-Za-z_$][\w$]*(?=\s*[:=])/ },
    { type: 'punct', re: /[{}[\]();,:|]/ },
  ],
  json: [
    { type: 'property', re: /"(?:[^"\\]|\\.)*"(?=\s*:)/ },
    { type: 'string', re: /"(?:[^"\\]|\\.)*"/ },
    { type: 'punct', re: /[{}[\],:]/ },
  ],
  ini: [
    { type: 'keyword', re: /\[[a-zA-Z]+\]/ },
    { type: 'string', re: /"(?:[^"\\]|\\.)*"/ },
    { type: 'property', re: /^[a-zA-Z_][\w]*(?=\s*=)/ },
    { type: 'punct', re: /=/ },
  ],
};

function tokenizeLine(line, lang) {
  const rules = TOKEN_RULES[lang] || [];
  if (!rules.length || !line) return [{ text: line, type: 'plain' }];

  const combined = new RegExp(rules.map((r) => `(${r.re.source})`).join('|'), 'g');
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = combined.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: line.slice(lastIndex, match.index), type: 'plain' });
    }
    const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
    parts.push({ text: match[0], type: rules[groupIndex].type });
    lastIndex = match.index + match[0].length;
    if (match[0].length === 0) combined.lastIndex += 1;
  }
  if (lastIndex < line.length) {
    parts.push({ text: line.slice(lastIndex), type: 'plain' });
  }
  return parts;
}

function CodeLine({ line, lang }) {
  const tokens = useMemo(() => tokenizeLine(line, lang), [line, lang]);
  return (
    <span className="code-line">
      {tokens.map((tok, i) => (
        <span key={i} className={`tok-${tok.type}`}>{tok.text}</span>
      ))}
      {'\n'}
    </span>
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES, { typeSpeed: 80, deleteSpeed: 40, pause: 1300 });
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const tab = TABS[activeTab];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  }, [tab.code]);

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-status-pill animate-up delay-100">
            <span className="status-dot" aria-hidden="true" />
            Available for Projects &amp; Engineering Roles
          </span>

          <h1 className="hero-title animate-up delay-200">
            <span className="text-gradient">Enricko Putra Hartono</span>
          </h1>

          <p className="hero-typer animate-up delay-300" aria-label={`I build ${role}`}>
            <span className="typer-label">I build </span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" aria-hidden="true" />
          </p>

          <p className="hero-description animate-up delay-400">
            A Software Engineer crafting reliable field applications, high-performance backends, and
            intuitive dashboards — engineered end to end across Web, Desktop, and Mobile.
          </p>

          <div className="hero-actions animate-up delay-500">
            <a href="#work" className="btn btn-primary btn-shine">
              Explore Work <ArrowRight size={17} />
            </a>
            <a
              href="/cv/Enricko-Putra-Hartono-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <FileText size={16} /> View CV
            </a>
          </div>
        </div>

        <div className="hero-visual animate-up delay-400">
          {FLOATERS.map((f) => (
            <div key={f.cls} className={`floater ${f.cls}`} title={f.name}>
              <img src={f.src} alt="" aria-hidden="true" />
            </div>
          ))}

          <div className="dev-studio-card">
            <div className="dev-studio-titlebar">
              <div className="traffic-dots" aria-hidden="true">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="dev-studio-window-title">enricko — dev-studio</span>
            </div>

            <div className="dev-studio-tabs">
              <div className="dev-tab-scroll" role="tablist" aria-label="Developer profile files">
                {TABS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === idx}
                    className={`dev-tab accent-${t.accent} ${activeTab === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {t.filename}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className={`dev-copy-btn ${copied ? 'is-copied' : ''}`}
                onClick={handleCopy}
                aria-label={`Copy ${tab.filename} contents`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="dev-studio-body">
              <pre className={`dev-studio-code accent-${tab.accent}`} key={tab.id}>
                <code>
                  {tab.code.split('\n').map((line, i) => (
                    <CodeLine key={i} line={line} lang={tab.lang} />
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span>Scroll</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
