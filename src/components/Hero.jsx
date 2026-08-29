import React, { Suspense, lazy } from 'react';
import { ArrowRight, ChevronDown, FileText } from 'lucide-react';
import { useTypewriter } from '../lib/useInteractions';
import './Hero.css';

const TechCoreCanvas = lazy(() => import('./3d/TechCoreCanvas'));

const FLOATERS = [
  { src: '/logos/react.svg',      cls: 'f1' },
  { src: '/logos/flutter.svg',    cls: 'f2' },
  { src: '/logos/laravel.svg',    cls: 'f3' },
  { src: '/logos/typescript.svg', cls: 'f4' },
  { src: '/logos/go.svg',         cls: 'f5' },
];

export default function Hero() {
  const role = useTypewriter(
    ['Field Applications', 'Operational Dashboards', 'Cross-platform Products', 'Elegant Solutions'],
    { typeSpeed: 80, deleteSpeed: 40, pause: 1300 }
  );

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow animate-up delay-100">
            Software Engineer — Web, Mobile &amp; Desktop
          </span>

          <h1 className="hero-title animate-up delay-200">
            Enricko Putra Hartono
          </h1>

          <p className="hero-typer animate-up delay-300" aria-label={`I build ${role}`}>
            <span className="typer-label">I build </span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" aria-hidden="true" />
          </p>

          <p className="hero-description animate-up delay-400">
            A Software Engineer building reliable field applications, operational dashboards, and
            cross-platform products for Web, Desktop, and Mobile.
          </p>

          <div className="hero-actions animate-up delay-500">
            <a href="#contact" className="btn btn-primary">
              Let's Talk <ArrowRight size={17} />
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

          <Suspense fallback={<div className="hero-visual-loading" aria-hidden="true" />}>
            <TechCoreCanvas />
          </Suspense>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span>Scroll</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
