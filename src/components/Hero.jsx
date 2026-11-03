import React from 'react';
import { ArrowRight, FileText, MapPin, Globe2, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ContributionSkyline from './ContributionSkyline';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <a href="#contact" className="pill pill-accent hero-status animate-up delay-100">
            <span className="live-dot" aria-hidden="true" />
            Available for Web, Mobile &amp; Desktop engineering
          </a>

          <h1 className="hero-title animate-up delay-200">
            Enricko Putra <span className="hero-title-last">Hartono</span>
          </h1>

          <p className="hero-role animate-up delay-200">
            Software Engineer <span aria-hidden="true">·</span> a.k.a. <span className="hero-alias">Lufria</span>
          </p>

          <p className="hero-lead animate-up delay-300">
            Building high-performance systems across web, desktop, and mobile — with a
            production workflow powered by <em className="serif">agentic AI</em> coding tools,
            model routing, and self-hosted infrastructure.
          </p>

          <div className="hero-actions animate-up delay-400">
            <a href="#projects" className="btn btn-primary">
              View projects <ArrowRight size={17} className="icon-shift" />
            </a>
            <a
              href="/cv/Enricko-Putra-Hartono-CV.pdf?rev=20261103-experience-rewrite"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <FileText size={16} /> View CV
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail size={16} /> Contact
            </a>
          </div>

          <ul className="hero-meta animate-up delay-500">
            <li><MapPin size={14} aria-hidden="true" /> Yogyakarta, Indonesia</li>
            <li><Globe2 size={14} aria-hidden="true" /> Open to remote work</li>
            <li>
              <a href="https://github.com/Enricko" target="_blank" rel="noreferrer">
                <FaGithub size={14} aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/enricko-putra-hartono-744646233/" target="_blank" rel="noreferrer">
                <FaLinkedin size={14} aria-hidden="true" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="hero-visual animate-up delay-300">
          <ContributionSkyline />
        </div>
      </div>
    </section>
  );
}
