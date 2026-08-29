import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useScrollSpy } from '../lib/useInteractions';
import './Navbar.css';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SPY_IDS = ['home', ...LINKS.map((l) => l.id)];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);

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
    <nav className="navbar" aria-label="Primary navigation">
      <div className="container nav-container">
        <a href="#home" className="logo">Enricko<span className="logo-dot">.</span></a>

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
          <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></a>
          <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="primary-navigation">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
