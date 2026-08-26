import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { profile } from '../data/profile';
import './Footer.css';

const SOCIAL_ICONS = { github: FaGithub, linkedin: FaLinkedin };

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <h2 className="footer-logo text-gradient">{profile.logoText}.</h2>

        <div className="footer-socials">
          {profile.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                {Icon && <Icon size={24} />}
              </a>
            );
          })}
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </p>
      </div>
    </footer>
  );
}
