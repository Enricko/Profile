import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Coffee, ArrowUp, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-brand">
              <div className="logo-mark">
                <img src="/favicon.svg" alt="Lufria Logo" className="logo-img" width="20" height="20" />
              </div>
              <span className="logo-text text-gradient">
                Enricko<span className="logo-dot">.</span>
              </span>
            </div>
            <p className="footer-tagline text-muted">
              Software Engineer crafting resilient, human-centered systems across Web, Mobile, and Desktop.
            </p>
          </div>

          <div className="footer-links-group">
            <span className="footer-group-title">Navigation</span>
            <div className="footer-nav-links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-socials-group">
            <span className="footer-group-title">Connect</span>
            <div className="footer-socials">
              <a
                href="https://github.com/Enricko"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="footer-social-btn"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="footer-social-btn"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://saweria.co/Lufria"
                target="_blank"
                rel="noreferrer"
                aria-label="Saweria Support"
                className="footer-social-btn coffee"
              >
                <Coffee size={18} />
                <span>Saweria</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Enricko Putra Hartono (Lufria). Built with React 19 &amp; Vite.
          </p>

          <div className="footer-standards">
            <span className="standard-chip">Anti-AI-Slop Standard</span>
            <span className="standard-chip">Tabular Numbers</span>
            <span className="standard-chip">Human Crafted</span>
          </div>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
