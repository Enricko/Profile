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
  const drawerRef = useRef(null);
  const drawerCloseRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const moreRef = useRef(null);
  const moreTriggerRef = useRef(null);
  const moreLinkRefs = useRef([]);
  const active = useScrollSpy(SPY_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const pageContent = [document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
    pageContent.forEach((element) => { element.inert = menuOpen; });

    if (menuOpen) drawerCloseRef.current?.focus();

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        if (menuOpen) {
          setMenuOpen(false);
          requestAnimationFrame(() => mobileToggleRef.current?.focus());
        } else if (moreOpen) {
          setMoreOpen(false);
          requestAnimationFrame(() => moreTriggerRef.current?.focus());
        }
        return;
      }

      if (event.key !== 'Tab' || !menuOpen || !drawerRef.current) return;

      const focusable = [...drawerRef.current.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const handlePointer = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
    };
    const handleFocus = (event) => {
      if (moreOpen && moreRef.current && !moreRef.current.contains(event.target)) setMoreOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 860 && menuOpen) {
        setMenuOpen(false);
        requestAnimationFrame(() => document.querySelector('.logo')?.focus());
      }
      if (window.innerWidth <= 860) setMoreOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('pointerdown', handlePointer);
    window.addEventListener('focusin', handleFocus);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.classList.remove('menu-open');
      pageContent.forEach((element) => { element.inert = false; });
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointerdown', handlePointer);
      window.removeEventListener('focusin', handleFocus);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen, moreOpen]);

  const closeMenus = () => { setMenuOpen(false); setMoreOpen(false); };
  const closeDrawerAndRestoreFocus = () => {
    closeMenus();
    requestAnimationFrame(() => mobileToggleRef.current?.focus());
  };
  const handleNavigationClick = () => {
    closeMenus();
    if (window.innerWidth <= 860) requestAnimationFrame(() => mobileToggleRef.current?.focus());
  };
  const openMoreAndFocus = (index) => {
    setMoreOpen(true);
    requestAnimationFrame(() => moreLinkRefs.current[index]?.focus());
  };
  const handleMoreTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openMoreAndFocus(0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openMoreAndFocus(SECONDARY_LINKS.length - 1);
    }
  };
  const handleMoreMenuKeyDown = (event) => {
    const currentIndex = moreLinkRefs.current.indexOf(document.activeElement);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % SECONDARY_LINKS.length;
    else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + SECONDARY_LINKS.length) % SECONDARY_LINKS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = SECONDARY_LINKS.length - 1;
    else if (event.key === 'Tab') {
      setMoreOpen(false);
      return;
    } else {
      return;
    }

    event.preventDefault();
    moreLinkRefs.current[nextIndex]?.focus();
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={closeMenus} aria-label="Enricko, back to top">
          <img className="logo-mark" src="/brand-mark.svg" alt="" aria-hidden="true" />
          <span>Enricko<span className="logo-dot">.</span></span>
        </a>
        <button type="button" className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={closeDrawerAndRestoreFocus} aria-hidden="true" tabIndex={-1} />

        <div
          id="site-navigation-panel"
          ref={drawerRef}
          className={`nav-panel ${menuOpen ? 'active' : ''}`}
          role={menuOpen ? 'dialog' : undefined}
          aria-modal={menuOpen ? 'true' : undefined}
          aria-labelledby={menuOpen ? 'drawer-title' : undefined}
        >
          <div className="drawer-head"><span id="drawer-title">Navigate</span><button ref={drawerCloseRef} type="button" className="drawer-close" onClick={closeDrawerAndRestoreFocus} aria-label="Close navigation"><X size={22} /></button></div>
          <ul className="nav-links">
            {PRIMARY_LINKS.map((link) => <li key={link.id}><a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={handleNavigationClick}>{link.label}</a></li>)}
          </ul>
          <div className="more-menu" ref={moreRef}>
            <button ref={moreTriggerRef} type="button" className={`more-trigger ${SECONDARY_LINKS.some((link) => link.id === active) ? 'is-active' : ''}`} onClick={() => setMoreOpen((open) => !open)} onKeyDown={handleMoreTriggerKeyDown} aria-expanded={moreOpen} aria-haspopup="menu" aria-controls="more-navigation-menu">More <ChevronDown size={15} /></button>
            <ul id="more-navigation-menu" className={`more-popover ${moreOpen ? 'active' : ''}`} role="menu" onKeyDown={handleMoreMenuKeyDown}>
              {SECONDARY_LINKS.map((link, index) => <li key={link.id} role="none"><a ref={(element) => { moreLinkRefs.current[index] = element; }} role="menuitem" href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={closeMenus}>{link.label}</a></li>)}
            </ul>
          </div>
          <ul className="drawer-secondary">
            {SECONDARY_LINKS.map((link) => <li key={link.id}><a href={`#${link.id}`} className={active === link.id ? 'is-active' : ''} onClick={handleNavigationClick}>{link.label}</a></li>)}
          </ul>
        </div>

        <div className="nav-actions">
          <button type="button" className={`paw-toggle ${rainActive ? 'active' : ''}`} onClick={onRandomizeRain} aria-label={`Change background effect. Current: ${MODE_NAMES[rainMode] || rainMode}`} title={`Background effect: ${MODE_NAMES[rainMode] || rainMode}`}><PawPrint size={19} /></button>
          <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" aria-label="GitHub profile"><FaGithub size={19} /></a>
          <a className="linkedin-link" href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><FaLinkedin size={19} /></a>
          <button ref={mobileToggleRef} type="button" className="mobile-toggle" onClick={() => { setMoreOpen(false); setMenuOpen((open) => !open); }} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-navigation-panel"><Menu size={22} /></button>
        </div>
      </div>
    </nav>
  );
}
