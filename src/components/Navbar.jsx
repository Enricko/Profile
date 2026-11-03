import React, { useState, useEffect } from 'react';
import { Menu, X, PawPrint } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useScrollSpy } from '../lib/useInteractions';
import './Navbar.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Stack' },
  { id: 'education', label: 'Education' },
  { id: 'contributions', label: 'Open Source' },
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

function Brand() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">EP</span>
      <span className="brand-text">
        Enricko<span className="brand-sub">/lufria</span>
      </span>
    </>
  );
}

export default function Navbar({ rainActive, rainMode = 'none', onRandomizeRain }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const handleKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const handleResize = () => window.innerWidth > 960 && setMenuOpen(false);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const modeName = MODE_NAMES[rainMode] || rainMode;

  return (
    <nav className={`navbar ${scrolled || menuOpen ? 'scrolled' : ''}`} aria-label="Primary">
      <div className="container nav-container">
        <a href="#home" className="brand" aria-label="Enricko Putra Hartono — back to top">
          <Brand />
        </a>

        <button
          className={`nav-overlay ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden={!menuOpen}
          aria-label="Close navigation overlay"
          tabIndex={-1}
        />

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`} id="nav-menu">
          <div className="nav-menu-header">
            <span className="nav-menu-title">Menu</span>
            <button
              className="icon-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="nav-links">
            {LINKS.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? 'is-active' : ''}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-link-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-menu-footer">
            <button
              type="button"
              className={`drawer-effect-btn ${rainActive ? 'active' : ''}`}
              onClick={onRandomizeRain}
            >
              <PawPrint size={16} />
              <span>Background: {modeName}</span>
            </button>
            <div className="drawer-socials">
              <a href="https://github.com/Enricko" target="_blank" rel="noreferrer">
                <FaGithub size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer">
                <FaLinkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className={`icon-btn paw-toggle ${rainActive ? 'active' : ''}`}
            onClick={onRandomizeRain}
            aria-label={`Change background effect (current: ${modeName})`}
            title={`Background: ${modeName} — click to change`}
          >
            <PawPrint size={17} />
          </button>
          <a
            href="https://github.com/Enricko"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="icon-btn hide-sm"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="icon-btn hide-sm"
          >
            <FaLinkedin size={17} />
          </a>
          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
