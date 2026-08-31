import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useScrollSpy } from '../lib/useInteractions';
import './Navbar.css';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education', secondary: true },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'GitHub', secondary: true },
];
const SPY_IDS = ['home', ...LINKS.map((link) => link.id), 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const toggleRef = useRef(null);
  const active = useScrollSpy(SPY_IDS, 180);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const content = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
    document.body.classList.toggle('menu-open', menuOpen);
    content.forEach((element) => { element.inert = menuOpen; });

    if (menuOpen) closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }
      if (event.key !== 'Tab' || !menuOpen || !panelRef.current) return;

      const focusable = [...panelRef.current.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable.at(0);
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('menu-open');
      content.forEach((element) => { element.inert = false; });
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={closeMenu} aria-label="Lufria, back to top">
          <span className="logo-monogram">EPH</span>
          <span className="logo-name">Lufria</span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <ul className="nav-links">
            {LINKS.filter((link) => !link.secondary).map((link, index) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a className="nav-contact" href="#contact">
            Contact <ArrowUpRight size={16} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="mobile-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={22} />
          </button>
        </div>

        <button
          type="button"
          className={`nav-overlay ${menuOpen ? 'active' : ''}`}
          onClick={closeMenu}
          aria-label="Close navigation"
          tabIndex={menuOpen ? 0 : -1}
        />

        <nav
          id="mobile-navigation"
          ref={panelRef}
          className={`nav-panel ${menuOpen ? 'active' : ''}`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
          <div className="drawer-head">
            <span>Index / 2026</span>
            <button ref={closeRef} type="button" className="drawer-close" onClick={closeMenu} aria-label="Close navigation">
              <X size={23} />
            </button>
          </div>
          <ol className="drawer-links">
            {LINKS.map((link, index) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={closeMenu}>
                  <span>{String(index + 1).padStart(2, '0')}</span>{link.label}
                </a>
              </li>
            ))}
          </ol>
          <a href="#contact" className="drawer-contact" onClick={closeMenu}>Start a conversation <ArrowUpRight size={18} /></a>
          <div className="drawer-socials">
            <a href="https://github.com/Enricko" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
