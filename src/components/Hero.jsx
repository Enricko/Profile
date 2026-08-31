import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, FileText } from 'lucide-react';
import { useTilt, useTypewriter } from '../lib/useInteractions';
import heroArtwork from '../assets/hero.png';
import SplitText from './SplitText';
import './Hero.css';

const ORBIT_TECH = [
  { src: '/logos/react.svg', label: 'React', position: 'north' },
  { src: '/logos/typescript.svg', label: 'TypeScript', position: 'east' },
  { src: '/logos/laravel.svg', label: 'Laravel', position: 'south' },
  { src: '/logos/flutter.svg', label: 'Flutter', position: 'west' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt(5);
  const role = useTypewriter(
    ['reliable web systems', 'cross-platform apps', 'thoughtful interfaces', 'maintainable products'],
    { typeSpeed: 70, deleteSpeed: 34, pause: 1500 },
  );

  useEffect(() => {
    let frame = null;
    const updateProgress = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (hero) {
          const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / (hero.offsetHeight * 0.9), 0), 1);
          hero.style.setProperty('--hero-progress', progress.toFixed(3));
        }
        frame = null;
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-coordinate" aria-hidden="true">07.7956° S&nbsp;&nbsp;110.3695° E</div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-up delay-100">
            <span className="pulse-dot" /> Indonesia / Available worldwide
          </div>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-greeting animate-up delay-100">Software engineer · Lufria</span>
            <SplitText text="ENRICKO" className="hero-name hero-name-primary" />
            <SplitText text="PUTRA HARTONO" className="hero-name hero-name-secondary" />
          </h1>

          <div className="hero-typer animate-up delay-300" aria-live="polite">
            <span className="typer-label">Currently shaping</span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" aria-hidden="true" />
          </div>

          <p className="hero-description animate-up delay-400">
            I engineer web, mobile, and desktop products from dependable APIs and data models
            to precise, responsive interfaces.
          </p>

          <div className="hero-actions animate-up delay-500">
            <a href="#projects" className="btn btn-primary">
              Explore the work <ArrowRight size={17} />
            </a>
            <a href="/cv/Enricko-Putra-Hartono-CV.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
              <FileText size={16} /> View CV
            </a>
          </div>
        </div>

        <div className="hero-visual animate-up delay-300" aria-label="Orbiting technology artwork">
          <div className="visual-axis axis-horizontal" aria-hidden="true" />
          <div className="visual-axis axis-vertical" aria-hidden="true" />
          <div className="orbit-track orbit-outer" aria-hidden="true" />
          <div className="orbit-track orbit-inner" aria-hidden="true" />

          {ORBIT_TECH.map((tech) => (
            <div key={tech.label} className={`orbit-node orbit-${tech.position}`} title={tech.label}>
              <img src={tech.src} alt="" />
              <span>{tech.label}</span>
            </div>
          ))}

          <div
            ref={tiltRef}
            className="hero-art-core"
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
          >
            <span className="core-index">01</span>
            <span className="core-bracket bracket-left" aria-hidden="true">[</span>
            <img src={heroArtwork} alt="Abstract layered processor artwork" width="343" height="361" />
            <span className="core-bracket bracket-right" aria-hidden="true">]</span>
          </div>

          <div className="visual-caption">
            <span>Multiplatform systems</span>
            <span>React · Laravel · Flutter</span>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span>Enter profile</span>
        <ArrowDown size={17} />
      </a>
    </section>
  );
}
