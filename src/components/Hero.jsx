import React from 'react';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTilt, useTypewriter } from '../lib/useInteractions';
import { profile } from '../data/profile';
import './Hero.css';

const SOCIAL_ICONS = { github: FaGithub, linkedin: FaLinkedin };

export default function Hero() {
  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt(14);
  const role = useTypewriter(profile.roles, { typeSpeed: 80, deleteSpeed: 40, pause: 1300 });

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-up delay-100">
            <span className="pulse-dot" /> {profile.availability}
          </div>

          <h1 className="hero-title animate-up delay-200">
            Hello, I'm <br />
            <span className="text-gradient">{profile.name}</span>
          </h1>

          <div className="hero-typer animate-up delay-300">
            <span className="typer-label">I'm a</span>
            <span className="typer-text">{role}</span>
            <span className="typer-caret" />
          </div>

          <p className="hero-description animate-up delay-400">{profile.tagline}</p>

          <div className="hero-actions animate-up delay-500">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href={profile.resumeUrl} download className="btn btn-outline">
              <Download size={16} /> Download Resume
            </a>
          </div>

          <div className="hero-socials animate-up delay-500" aria-label="Social links">
            {profile.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                  {Icon && <Icon size={20} />}
                </a>
              );
            })}
          </div>
        </div>

        <div className="hero-visual animate-up delay-400">
          <div
            ref={tiltRef}
            className="glass-card visual-card terminal"
            onMouseMove={onTiltMove}
            onMouseLeave={onTiltLeave}
          >
            <div className="card-glare" />
            <div className="code-header">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="code-file">~/portfolio — zsh</span>
            </div>
            <pre className="code-body terminal-body">
              <code>
                <span className="prompt">$</span> whoami
                <br />
                <span className="terminal-out">{profile.name}</span>
                <br />
                <br />
                <span className="prompt">$</span> cat roles.txt
                <br />
                {profile.roles.map((r) => (
                  <span className="terminal-out" key={r}>
                    - {r}
                    <br />
                  </span>
                ))}
                <br />
                <span className="prompt">$</span> status --check
                <br />
                <span className="terminal-out ok">✓ {profile.availability}</span>
                <br />
                <span className="prompt">
                  $ <span className="terminal-caret" />
                </span>
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
