import React from 'react';
import { FaArtstation, FaBehance, FaInstagram, FaDiscord } from 'react-icons/fa';
import { artist } from '../data/artist';
import './Footer.css';

const SOCIAL_ICONS = { artstation: FaArtstation, behance: FaBehance, instagram: FaInstagram, discord: FaDiscord };

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <h2 className="footer-logo text-gradient">{artist.logoText}.</h2>

        <div className="footer-socials">
          {artist.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                {Icon && <Icon size={24} />}
              </a>
            );
          })}
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} {artist.name}. Built with React.
        </p>
      </div>
    </footer>
  );
}
