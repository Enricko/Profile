import React from 'react';
import { ArrowRight, Sparkles, ChevronDown, FileText } from 'lucide-react';
import { useTilt, useTypewriter } from '../lib/useInteractions';
import './Hero.css';

const FLOATERS = [
  { src: '/logos/react.svg', cls: 'f1' },
  { src: '/logos/flutter.svg', cls: 'f2' },
  { src: '/logos/laravel.svg', cls: 'f3' },
  { src: '/logos/typescript.svg', cls: 'f4' },
  { src: '/logos/go.svg', cls: 'f5' },
];

export default function Hero() {
  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt(9);
  const role = useTypewriter(
    ['Web Applications', 'Mobile Apps', 'Desktop Software', 'Elegant Solutions'],
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
            <span className="hero-greeting">Hello, I&apos;m</span>
            <span className="hero-name">Enricko Putra Hartono</span>
          </h1>

          <div className="hero-typer animate-up delay-300">
            <span className="typer-label">I build</span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" />
          </div>

          <p className="hero-description animate-up delay-400">
            Software engineer building maintainable web, mobile, and desktop products—from reliable APIs
            and data models to clear, responsive interfaces.
          </p>

          <div className="hero-actions animate-up delay-500">
            <a href="#contact" className="btn btn-primary">
              Let's Talk <ArrowRight size={18} />
            </a>
            <a href="#experience" className="btn btn-outline">
              <Sparkles size={16} /> View experience
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
          <div className="orbit-track orbit-one" aria-hidden="true" />
          <div className="orbit-track orbit-two" aria-hidden="true" />
          {FLOATERS.map((floater) => (
            <div key={floater.cls} className={`floater ${floater.cls}`} aria-hidden="true">
              <img src={floater.src} alt="" />
            </div>
          ))}

          <div
            ref={tiltRef}
            className="glass-card visual-card"
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
          >
            <div className="card-glare" aria-hidden="true" />
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
                <br />  platforms: [<span className="string">'Web'</span>, <span className="string">'Mobile'</span>, <span className="string">'Desktop'</span>],
                <br />  focus: <span className="string">'Maintainable products'</span>,
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
