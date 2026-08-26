import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint } from 'lucide-react';
import { FaArtstation, FaBehance, FaInstagram, FaDiscord } from 'react-icons/fa';
import { useScrollSpy } from '../lib/useInteractions';
import { artist } from '../data/artist';
import './Navbar.css';

const SOCIAL_ICONS = { artstation: FaArtstation, behance: FaBehance, instagram: FaInstagram, discord: FaDiscord };

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'resources', label: 'Resources' },
  { id: 'contact', label: 'Contact' },
];

const SPY_IDS = ['home', ...LINKS.map((l) => l.id)];

export default function Navbar({ rainActive, onRandomizeRain }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const handleKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const handleResize = () => window.innerWidth > 900 && setMenuOpen(false);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container nav-container">
        <a href="#home" className="logo text-gradient">{artist.logoText}<span className="logo-dot">.</span></a>

        <button
          className={`nav-overlay ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden={!menuOpen}
          tabIndex={-1}
        />

        <ul id="primary-navigation" className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-socials">
          <button
            className={`paw-toggle ${rainActive ? 'active' : ''}`}
            onClick={onRandomizeRain}
            aria-label="Randomize background rain"
            title="Change background effect"
          >
            <PawPrint size={20} />
          </button>
          {artist.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                {Icon && <Icon size={20} />}
              </a>
            );
          })}
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="primary-navigation">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
