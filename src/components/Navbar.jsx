import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useScrollSpy } from '../lib/useInteractions';
import './Navbar.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'Contributions' },
  { id: 'contact', label: 'Contact' },
];

const SPY_IDS = ['home', ...LINKS.map((l) => l.id)];

const MODE_NAMES = {
  none: 'Quiet (Off)',
  neon: 'Neon Paws',
  calico: 'Calico Paws',
  faces: 'Cat & Dog Pets',
  skills: 'Tech Logos',
};

export default function Navbar({ rainActive, rainMode = 'none', onRandomizeRain }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo-brand" aria-label="Enricko Putra Hartono Home">
          <div className="logo-mark">
            <img src="/favicon.svg" alt="Lufria Logo" className="logo-img" width="22" height="22" />
          </div>
          <span className="logo-text text-gradient">
            Enricko<span className="logo-dot">.</span>
          </span>
        </a>

        <button
          className={`nav-overlay ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden={!menuOpen}
          aria-label="Close navigation overlay"
          tabIndex={-1}
        />

        <div className={`nav-menu-wrapper ${menuOpen ? 'active' : ''}`}>
          <div className="nav-menu-header">
            <div className="logo-brand">
              <div className="logo-mark">
                <img src="/favicon.svg" alt="Lufria Logo" className="logo-img" width="20" height="20" />
              </div>
              <span className="logo-text text-gradient">Navigation</span>
            </div>
            <button
              className="menu-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="nav-links">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? 'is-active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-link-dot" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-footer">
            <span className="mobile-drawer-label">Background Atmosphere</span>
            <button
              className={`drawer-effect-btn ${rainActive ? 'active' : ''}`}
              onClick={onRandomizeRain}
            >
              <PawPrint size={18} />
              <span>Theme: {MODE_NAMES[rainMode] || rainMode}</span>
            </button>
            <div className="drawer-socials">
              <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="nav-socials">
          <button
            className={`paw-toggle ${rainActive ? 'active' : ''}`}
            onClick={onRandomizeRain}
            aria-label="Switch background rain effect"
            title={`Background Effect: ${MODE_NAMES[rainMode] || rainMode} (Click to change)`}
          >
            <PawPrint size={19} />
            <span className="paw-indicator" />
          </button>
          <a
            href="https://github.com/Enricko"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="social-link"
          >
            <FaGithub size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="social-link"
          >
            <FaLinkedin size={19} />
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
