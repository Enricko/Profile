import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, PawPrint, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useScrollSpy } from '../lib/useInteractions';
import './Navbar.css';

const PRIMARY_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
const SECONDARY_LINKS = [
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contributions', label: 'GitHub activity' },
];
const ALL_LINKS = [...PRIMARY_LINKS, ...SECONDARY_LINKS];
const SPY_IDS = ['home', ...ALL_LINKS.map((link) => link.id)];
const MODE_NAMES = { none: 'Off', neon: 'Neon paws', calico: 'Calico paws', faces: 'Cat and dog faces', skills: 'Tech logos' };

export default function Navbar({ rainActive, rainMode = 'none', onRandomizeRain }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);
  const active = useScrollSpy(SPY_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const handleKey = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); setMoreOpen(false); }
    };
    const handlePointer = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
    };
    const handleResize = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('pointerdown', handlePointer);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  const closeMenus = () => { setMenuOpen(false); setMoreOpen(false); };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={closeMenus} aria-label="Enricko, back to top">Enricko<span className="logo-dot">.</span></a>
        <button className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={closeMenus} aria-label="Close navigation" tabIndex={menuOpen ? 0 : -1} />

        <div className={`nav-panel ${menuOpen ? 'active' : ''}`}>
          <div className="drawer-head"><span>Navigate</span><button type="button" className="drawer-close" onClick={closeMenus} aria-label="Close navigation"><X size={22} /></button></div>
          <ul className="nav-links">
            {PRIMARY_LINKS.map((link) => <li key={link.id}><a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={closeMenus}>{link.label}</a></li>)}
          </ul>
          <div className="more-menu" ref={moreRef}>
            <button type="button" className={`more-trigger ${SECONDARY_LINKS.some((link) => link.id === active) ? 'is-active' : ''}`} onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} aria-haspopup="true">More <ChevronDown size={15} /></button>
            <ul className={`more-popover ${moreOpen ? 'active' : ''}`}>
              {SECONDARY_LINKS.map((link) => <li key={link.id}><a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={closeMenus}>{link.label}</a></li>)}
            </ul>
          </div>
          <ul className="drawer-secondary">
            {SECONDARY_LINKS.map((link) => <li key={link.id}><a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={closeMenus}>{link.label}</a></li>)}
          </ul>
        </div>

        <div className="nav-actions">
          <button className={`paw-toggle ${rainActive ? 'active' : ''}`} onClick={onRandomizeRain} aria-label={`Change background effect. Current: ${MODE_NAMES[rainMode] || rainMode}`} title={`Background effect: ${MODE_NAMES[rainMode] || rainMode}`}><PawPrint size={19} /></button>
          <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" aria-label="GitHub profile"><FaGithub size={19} /></a>
          <a className="linkedin-link" href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><FaLinkedin size={19} /></a>
          <button type="button" className="mobile-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}><Menu size={22} /></button>
        </div>
      </div>
    </nav>
  );
}
