import React from 'react';
import { Mail, Download } from 'lucide-react';
import { FaArtstation, FaBehance, FaInstagram, FaDiscord } from 'react-icons/fa';
import { artist, contact } from '../data/artist';
import './Contact.css';

const SOCIAL_ICONS = { artstation: FaArtstation, behance: FaBehance, instagram: FaInstagram, discord: FaDiscord };

const COMMISSION_LABELS = {
  open: 'Open for Commissions',
  limited: 'Limited Availability',
  closed: 'Commissions Closed',
};

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2 className="section-title">{contact.title}</h2>
        </div>
        <p className="contact-desc text-muted reveal-on-scroll delay-100">{contact.description}</p>

        <div className="contact-panel glass-card reveal-on-scroll delay-200">
          <span className={`commission-badge status-${artist.commissionStatus}`}>
            <span className="commission-dot" /> {COMMISSION_LABELS[artist.commissionStatus] || 'Availability on request'}
          </span>

          <a href={`mailto:${artist.email}`} className="contact-email text-gradient">
            <Mail size={22} /> {artist.email}
          </a>

          <div className="contact-socials">
            {artist.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="contact-social-link"
                >
                  {Icon && <Icon size={20} />}
                  <span>{social.label}</span>
                </a>
              );
            })}
          </div>

          {artist.rateSheetUrl && (
            <a href={artist.rateSheetUrl} download className="btn btn-outline rate-sheet-link">
              <Download size={16} /> Download Rate Sheet
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
