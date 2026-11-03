import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, ArrowUpRight, X, ZoomIn } from 'lucide-react';
import SectionHead from './SectionHead';
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
        <SectionHead
          index="05"
          label="Education"
          title={<>Education &amp; <em>credentials</em></>}
        />

        <div className="edu-grid">
          {EDUCATION.map((edu, idx) => (
            <div
              key={edu.school}
              className={`card edu-card reveal-on-scroll ${idx ? 'delay-100' : ''}`}
            >
              <span className="icon-box"><GraduationCap size={19} /></span>
              <div className="edu-body">
                <span className="edu-period">{edu.period}</span>
                <h3>{edu.school}</h3>
                <p className="edu-degree">{edu.degree}</p>
                <div className="tag-list">
                  {edu.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cert-head reveal-on-scroll">
          <h3 className="cert-subtitle">
            <Award size={18} aria-hidden="true" /> Certifications &amp; awards
          </h3>
          <span className="cert-count">{CERTIFICATIONS.length} credentials</span>
        </div>

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert, idx) => (
            <article
              key={cert.id}
              className={`card cert-card reveal-on-scroll delay-${(idx % 3) * 100}`}
            >
              {cert.image ? (
                <button
                  type="button"
                  className="cert-thumb"
                  onClick={() => setSelectedCert(cert)}
                  aria-label={`View full certificate for ${cert.title}`}
                >
                  <img
                    src={cert.image}
                    alt=""
                    loading="lazy"
                    width={cert.imageSize?.[0]}
                    height={cert.imageSize?.[1]}
                  />
                  <span className="cert-zoom">
                    <ZoomIn size={14} /> View
                  </span>
                </button>
              ) : (
                <div className="cert-thumb is-empty" aria-hidden="true">
                  <Award size={28} strokeWidth={1.5} />
                </div>
              )}

              <div className="cert-body">
                <span className="cert-date">{cert.issued}</span>
                <h4>{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="cert-credential">ID {cert.credentialId}</p>
                )}

                <div className="cert-footer">
                  <div className="tag-list">
                    {cert.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-link"
                      aria-label={`Verify credential for ${cert.title}`}
                    >
                      Verify <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedCert && (
        <div
          className="cert-modal-overlay"
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
        >
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cert-modal-header">
              <div>
                <h3 className="cert-modal-title">{selectedCert.title}</h3>
                <p className="cert-modal-subtitle">
                  Issued by {selectedCert.issuer} · {selectedCert.issued}
                </p>
              </div>
              <button
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                autoFocus
              >
                <X size={18} />
              </button>
            </div>

            <div className="cert-modal-body">
              <img src={selectedCert.image} alt={selectedCert.title} />
            </div>

            {(selectedCert.credentialId || selectedCert.credentialUrl) && (
              <div className="cert-modal-footer">
                {selectedCert.credentialId && (
                  <span className="cert-modal-id">Credential ID: {selectedCert.credentialId}</span>
                )}
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Verify with issuer <ArrowUpRight size={15} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
