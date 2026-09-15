import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Calendar, BadgeCheck, ExternalLink, X, ZoomIn } from 'lucide-react';
import './Education.css';

const EDUCATION = [
  {
    school: 'Universitas AMIKOM Yogyakarta',
    degree: 'S1 Informatika (Jalur Profesional IT)',
    period: 'Jul 2023 — Present',
    tags: ['Computer Science', 'Application Development', 'Web & Systems'],
  },
  {
    school: 'SMKN 1 Bantul',
    degree: 'Rekayasa Perangkat Lunak (Software Engineering)',
    period: '2020 — 2023',
    tags: ['Software Engineering', 'Algorithms', 'Databases'],
  },
];

const CERTIFICATIONS = [
  {
    id: 'dataslayer',
    title: 'Dataslayer National Competition',
    issuer: 'Institut Teknologi Telkom Purwokerto',
    issued: 'Jan 2025',
    tags: ['Data Science', 'Problem Solving'],
  },
  {
    id: 'backend',
    title: 'Back-End Engineer Career Path',
    issuer: 'Codecademy',
    issued: 'Jul 2024',
    credentialUrl: 'https://www.codecademy.com/profiles/chip9189126907/certificates/810f53d14de24b938cc13c7c2af1e686',
    image: '/certificates/backend-engineer.webp',
    imageSize: [1000, 781],
    tags: ['Backend Architecture', 'APIs', 'Databases'],
  },
  {
    id: 'wdc',
    title: 'Web Development Competition 2024',
    issuer: 'Universitas Atma Jaya Yogyakarta',
    issued: 'Mar 2024',
    credentialId: '395.18/SF-FTI/2024',
    image: '/certificates/wdc-2024.webp',
    imageSize: [1000, 706],
    tags: ['Web Development', 'UI/UX Design'],
  },
  {
    id: 'flask',
    title: 'Build Python Web Apps with Flask',
    issuer: 'Codecademy',
    issued: 'Mar 2024',
    credentialUrl: 'https://www.codecademy.com/profiles/chip9189126907/certificates/5ee3bf2c187929001393af70',
    image: '/certificates/flask.webp',
    imageSize: [1000, 792],
    tags: ['Python', 'REST APIs', 'Flask'],
  },
  {
    id: 'ml',
    title: 'Machine Learning & AI Fundamentals',
    issuer: 'Codecademy',
    issued: 'Nov 2023',
    credentialUrl: 'https://www.codecademy.com/profiles/chip9189126907/certificates/5701108f64cd4a02981c161085ccc50e',
    image: '/certificates/ml-ai-fundamentals.webp',
    imageSize: [1000, 785],
    tags: ['Machine Learning', 'AI Models'],
  },
];

export default function Education() {
  const [selectedCert, setSelectedCert] = useState(null);

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedCert]);

  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// credentials</span>
          <h2 className="section-title">Education &amp; Certifications</h2>
        </div>

        {/* Education Timeline */}
        <div className="edu-grid">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card spotlight edu-card reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 2) * 100}ms` }}
              onMouseMove={onMove}
            >
              <div className="edu-icon">
                <GraduationCap size={24} />
              </div>
              <div className="edu-body">
                <h3>{edu.school}</h3>
                <p className="edu-degree text-muted">{edu.degree}</p>
                <div className="edu-period">
                  <Calendar size={13} /> {edu.period}
                </div>
                <div className="edu-tags">
                  {edu.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Subheading */}
        <div className="cert-section-head reveal-on-scroll">
          <h3 className="cert-subtitle">
            <Award size={22} /> Professional Certifications &amp; Awards
          </h3>
          <span className="cert-count-pill">{CERTIFICATIONS.length} verified credentials</span>
        </div>

        {/* Certifications Grid */}
        <div className="cert-grid">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={cert.id || idx}
              className="glass-card spotlight cert-card reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 3) * 90}ms` }}
              onMouseMove={onMove}
            >
              <div className="cert-card-top">
                <div className="cert-icon">
                  <BadgeCheck size={20} />
                </div>
                <div className="cert-issued">
                  <Calendar size={13} /> {cert.issued}
                </div>
              </div>

              <h4>{cert.title}</h4>
              <p className="cert-issuer text-muted">{cert.issuer}</p>

              {cert.credentialId && (
                <p className="cert-credential">ID: {cert.credentialId}</p>
              )}

              {cert.image && (
                <button
                  type="button"
                  className="cert-thumbnail-btn"
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`View full certificate for ${cert.title}`}
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    loading="lazy"
                    className="cert-thumb-img"
                  />
                  <span className="cert-zoom-overlay">
                    <ZoomIn size={16} /> Inspect Certificate
                  </span>
                </button>
              )}

              <div className="cert-footer">
                {cert.tags && (
                  <div className="cert-tags">
                    {cert.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="cert-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-link"
                    aria-label={`Verify credential for ${cert.title}`}
                  >
                    Verify <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Certificate Inspection */}
      {selectedCert && (
        <div
          className="cert-modal-overlay"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div
            className="cert-modal-card glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <p className="cert-modal-subtitle text-muted">
                  Issued by {selectedCert.issuer} • {selectedCert.issued}
                </p>
              </div>
              <button
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cert-modal-body">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
            </div>

            <div className="cert-modal-footer">
              {selectedCert.credentialId && (
                <span className="cert-modal-id">Credential ID: {selectedCert.credentialId}</span>
              )}
              {selectedCert.credentialUrl && (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Verify on Official Issuer <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
