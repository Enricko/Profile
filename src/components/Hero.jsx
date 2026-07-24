import React from 'react';
import { ArrowRight, Sparkles, ChevronDown, FileText } from 'lucide-react';
import { useTilt, useTypewriter } from '../lib/useInteractions';
import './Hero.css';

const FLOATERS = [
  { src: '/logos/react.svg',      cls: 'f1' },
  { src: '/logos/flutter.svg',    cls: 'f2' },
  { src: '/logos/laravel.svg',    cls: 'f3' },
  { src: '/logos/typescript.svg', cls: 'f4' },
  { src: '/logos/go.svg',         cls: 'f5' },
];

export default function Hero() {
  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt(14);
  const role = useTypewriter(
    ['Field Applications', 'Operational Dashboards', 'Cross-platform Products', 'Elegant Solutions'],
    { typeSpeed: 80, deleteSpeed: 40, pause: 1300 }
  );

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-up delay-100">
            <span className="pulse-dot" /> Available for Web, Mobile &amp; Desktop roles
          </div>

          <h1 className="hero-title animate-up delay-200">
            Hello, I'm <br />
            <span className="text-gradient">Enricko Putra Hartono</span>
          </h1>

          <div className="hero-typer animate-up delay-300">
            <span className="typer-label">I build</span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" />
          </div>

          <p className="hero-description animate-up delay-400">
            A Software Engineer building reliable field applications, operational dashboards, and
            cross-platform products for Web, Desktop, and Mobile.
          </p>

          <div className="hero-actions animate-up delay-500">
            <a href="#contact" className="btn btn-primary">
              Let's Talk <ArrowRight size={18} />
            </a>
            <a href="#experience" className="btn btn-outline">
              <Sparkles size={16} /> View My Work
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
            <div key={f.cls} className={`floater ${f.cls}`}>
              <img src={f.src} alt="" aria-hidden="true" />
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
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="code-file">developer.js</span>
            </div>
            <pre className="code-body">
              <code>
                <span className="keyword">const</span> <span className="entity">developer</span> <span className="operator">=</span> {'{'}
                <br />  name: <span className="string">'Enricko Putra Hartono'</span>,
                <br />  skills: [<span className="string">'Website'</span>, <span className="string">'Desktop'</span>, <span className="string">'Android'</span>],
                <br />  passion: <span className="string">'Building premium apps'</span>,
                <br />  status: <span className="keyword">true</span>
                <br />{'}'};
              </code>
            </pre>
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
