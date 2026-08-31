import React from 'react';
import { GraduationCap, Award, Calendar, BadgeCheck, ExternalLink } from 'lucide-react';
import './Education.css';

const EDUCATION = [
  {
    school: 'Universitas AMIKOM Yogyakarta',
    degree: 'Computer Programming, Specific Applications',
    period: 'Jul 2023 - Present',
    tags: ['Application Development', 'Web Development'],
  },
  {
    school: 'SMKN 1 Bantul',
    degree: 'Rekayasa Perangkat Lunak (Software Engineering)',
    period: '2020 - 2023',
    tags: ['Software Engineering'],
  },
];

const CERTIFICATIONS = [
  {
    title: 'Dataslayer',
    issuer: 'Institut Teknologi Telkom Purwokerto',
    issued: 'Jan 2025',
  },
  {
    title: 'Back-End Engineer Career Path',
    issuer: 'Codecademy',
    issued: 'Jul 2024',
    credentialUrl: 'https://www.codecademy.com/profiles/chip9189126907/certificates/810f53d14de24b938cc13c7c2af1e686',
    image: '/certificates/backend-engineer.webp',
    imageSize: [1000, 781],
  },
  {
    title: 'Web Development Competition',
    issuer: 'Universitas Atma Jaya Yogyakarta',
    issued: 'Mar 2024',
    credentialId: '395.18/SF-FTI/2024',
    image: '/certificates/wdc-2024.webp',
    imageSize: [1000, 706],
    tags: ['Web Development', 'Web Design'],
  },
  {
    title: 'Build Python Web Apps with Flask Skill Path',
    issuer: 'Codecademy',
    issued: 'Mar 2024',
    credentialUrl: 'https://www.codecademy.com/profiles/chip9189126907/certificates/5ee3bf2c187929001393af70',
    image: '/certificates/flask.webp',
    imageSize: [1000, 792],
  },
  {
    title: 'Machine Learning and AI Fundamentals Skill Path',
    issuer: 'Codecademy',
    issued: 'Nov 2023',
    credentialUrl: 'https://www.codecademy.com/profiles/chip9189126907/certificates/5701108f64cd4a02981c161085ccc50e',
    image: '/certificates/ml-ai-fundamentals.webp',
    imageSize: [1000, 785],
    tags: ['Machine Learning'],
  },
];

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// education</span>
          <h2 className="section-title">Education & Certifications</h2>
        </div>

        <div className="edu-grid">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card edu-card reveal-on-scroll"
            >
              <div className="edu-icon"><GraduationCap size={22} /></div>
              <div className="edu-body">
                <h3>{edu.school}</h3>
                <p className="edu-degree text-muted">{edu.degree}</p>
                <div className="edu-period"><Calendar size={14} /> {edu.period}</div>
                <div className="edu-tags">
                  {edu.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`badge ${tIdx % 2 === 0 ? 'desktop' : 'mobile'}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="cert-subtitle reveal-on-scroll">
          <Award size={20} /> Licenses & Certifications
        </h3>

        <div className="cert-grid">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="glass-card cert-card reveal-on-scroll"
            >
              <div className="cert-icon"><BadgeCheck size={20} /></div>
              <h4>{cert.title}</h4>
              <p className="cert-issuer text-muted">{cert.issuer}</p>
              <div className="cert-issued"><Calendar size={13} /> Issued {cert.issued}</div>
              {cert.credentialId && (
                <p className="cert-credential">Credential ID {cert.credentialId}</p>
              )}
              {cert.image && (
                <a href={cert.image} target="_blank" rel="noreferrer" className="cert-image">
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate`}
                    width={cert.imageSize[0]}
                    height={cert.imageSize[1]}
                    loading="lazy"
                  />
                </a>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link"
                  aria-label={`Show credential for ${cert.title}`}
                >
                  Show credential <ExternalLink size={13} />
                </a>
              )}
              {cert.tags && (
                <div className="cert-tags">
                  {cert.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={`badge ${tIdx % 2 === 0 ? 'desktop' : 'mobile'}`}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
