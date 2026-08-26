import React from 'react';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { FaArtstation, FaBehance, FaInstagram, FaDiscord } from 'react-icons/fa';
import { useTypewriter } from '../lib/useInteractions';
import { artist } from '../data/artist';
import HeroCanvas from './HeroCanvas';
import './Hero.css';

const SOCIAL_ICONS = { artstation: FaArtstation, behance: FaBehance, instagram: FaInstagram, discord: FaDiscord };

export default function Hero({ onOpenReel }) {
  const role = useTypewriter(artist.roles, { typeSpeed: 70, deleteSpeed: 35, pause: 1400 });

  return (
    <section id="home" className="hero">
      <HeroCanvas />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-badge animate-up delay-100">
          <span className="pulse-dot" /> {artist.availability}
        </div>

        <h1 className="hero-title animate-up delay-200">
          <span className="text-gradient">{artist.name}</span>
        </h1>

        <div className="hero-typer animate-up delay-300">
          <span className="typer-label">{artist.title} —</span>
          <span className="typer-text">{role}</span>
          <span className="typer-caret" />
        </div>

        <p className="hero-description animate-up delay-400">{artist.tagline}</p>

        <div className="hero-actions animate-up delay-500">
          <a href="#work" className="btn btn-primary">
            Explore Work <ArrowRight size={18} />
          </a>
          <button type="button" className="btn btn-outline showreel-btn" onClick={onOpenReel}>
            <span className="showreel-play-icon">
              <Play size={14} fill="currentColor" />
            </span>
            Watch Showreel
          </button>
        </div>

        <div className="hero-socials animate-up delay-500" aria-label="Social links">
          {artist.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                {Icon && <Icon size={20} />}
              </a>
            );
          })}
        </div>
      </div>

      <a href="#work" className="scroll-cue" aria-label="Scroll to work">
        <span>Scroll</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
