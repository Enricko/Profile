import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Coffee, ArrowUp } from 'lucide-react';
import './Footer.css';

const NAV = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Stack' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const SOCIALS = [
  { href: 'https://github.com/Enricko', label: 'GitHub', icon: <FaGithub size={15} /> },
  { href: 'https://www.linkedin.com/in/enricko-putra-hartono-744646233/', label: 'LinkedIn', icon: <FaLinkedin size={15} /> },
  { href: 'https://saweria.co/Lufria', label: 'Saweria', icon: <Coffee size={15} /> },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="brand-mark" aria-hidden="true">EP</span>
              <span className="brand-text">
                Enricko<span className="brand-sub">/lufria</span>
              </span>
            </a>
            <p className="footer-tagline">
              Software Engineer crafting resilient, human-centered systems across Web, Mobile, and Desktop.
            </p>
          </div>

          <nav className="footer-col" aria-label="Footer">
            <span className="footer-col-title">Navigate</span>
            {NAV.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>

          <div className="footer-col">
            <span className="footer-col-title">Connect</span>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Enricko Putra Hartono (Lufria). Built with React 19 &amp; Vite.</p>
          <button type="button" className="footer-top-btn" onClick={scrollToTop}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
