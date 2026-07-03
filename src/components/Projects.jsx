import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const PROJECTS = [
  {
    name: 'Saba Jogja (Web Dev)',
    description: 'An interactive application containing comprehensive information about Yogyakarta, built natively with Flutter.',
    github: 'https://github.com/Enricko/Saba-Jogja-Lomba-Web-Dev-Competition-Feb-2024',
    tags: ['Flutter', 'Dart', 'Mobile App'],
    stars: 3,
  },
  {
    name: 'Realtime Chatting App',
    description: 'A multi-platform real-time messaging application created using the robust Flutter Framework.',
    github: 'https://github.com/Enricko/Flutter-Realtime-ChattingApp',
    tags: ['Flutter', 'Realtime', 'Chat'],
    stars: 4,
  },
  {
    name: 'Dino Run with Flutter',
    description: 'A multi-platform endless runner game inspired by the classic Dino Game, built using the Flutter Flame engine.',
    github: 'https://github.com/Enricko/Dino-Run-with-Flutter',
    tags: ['Flutter', 'Flame', 'Game Dev'],
    stars: 4,
  },
  {
    name: 'Flask-Restx-Template',
    description: 'A versatile and beginner-friendly repository designed to streamline API development using Python and Flask Rest-X.',
    github: 'https://github.com/Enricko/Flask-Restx-Template',
    tags: ['Python', 'Flask', 'Backend API'],
    stars: 3,
  },
];

export default function Projects() {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">// portfolio</span>
          <h2 className="section-title">Open Source Projects</h2>
        </div>
        <p className="projects-desc text-muted reveal-on-scroll delay-100">
          A selection of my personal projects and contributions available on GitHub.
        </p>

        <div className="projects-grid">
          {PROJECTS.map((project, idx) => (
            <a
              key={project.name}
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="glass-card spotlight project-card reveal-on-scroll"
              style={{ transitionDelay: `${(idx % 4) * 100}ms` }}
              onMouseMove={onMove}
            >
              <div className="project-header">
                <span className="project-folder"><FaGithub size={22} /></span>
                <span className="project-stars"><Star size={14} className="star-icon" /> {project.stars}</span>
              </div>
              <h3 className="project-title">{project.name}</h3>
              <p className="project-desc text-muted">{project.description}</p>

              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <span className="project-open">View <ExternalLink size={14} /></span>
              </div>
            </a>
          ))}
        </div>

        <div className="projects-cta reveal-on-scroll delay-300">
          <a href="https://github.com/Enricko" target="_blank" rel="noreferrer" className="btn btn-outline">
            View More on GitHub <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
