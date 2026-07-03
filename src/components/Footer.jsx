import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ 
      padding: '3rem 0 2rem 0', 
      textAlign: 'center', 
      borderTop: '1px solid var(--glass-border)', 
      marginTop: '4rem',
      background: 'var(--bg-secondary)'
    }}>
      <div className="container flex-center" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        <h2 className="text-gradient" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.8rem', fontWeight: '800' }}>Enricko.</h2>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://github.com/enricko" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--accent-primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/enricko-putra-hartono-744646233" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--accent-primary)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
            <FaLinkedin size={24} />
          </a>
        </div>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          © {new Date().getFullYear()} Enricko Putra Hartono. Built with React.
        </p>
      </div>
    </footer>
  );
}
