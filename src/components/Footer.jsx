import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <h2 className="footer-logo text-gradient">Enricko.</h2>

        <span className="footer-status">
          <span className="footer-status-dot" aria-hidden="true" />
          All systems operational
        </span>

        <div className="footer-socials">
          <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Enricko Putra Hartono. Built with React.
        </p>
      </div>
    </footer>
  );
}
