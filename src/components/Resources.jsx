import React from 'react';
import { ExternalLink, Package, GraduationCap, PenSquare } from 'lucide-react';
import { resources } from '../data/artist';
import './Resources.css';

function ResourceList({ icon, title, items }) {
  const Icon = icon;
  if (!items?.length) return null;
  return (
    <div className="glass-card spotlight resource-panel">
      <h3>
        <Icon size={18} /> {title}
      </h3>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <a href={item.href} target="_blank" rel="noreferrer">
              {item.title} <ExternalLink size={13} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resources() {
  return (
    <section id="resources" className="resources">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <span className="eyebrow">{resources.eyebrow}</span>
          <h2 className="section-title">{resources.title}</h2>
        </div>
        {resources.intro && (
          <p className="resources-intro text-muted reveal-on-scroll delay-100">{resources.intro}</p>
        )}

        <div className="resources-grid reveal-on-scroll delay-200">
          <ResourceList icon={Package} title="Free Models & Assets" items={resources.freeModels} />
          <ResourceList icon={GraduationCap} title="Tutorials" items={resources.tutorials} />
          <ResourceList icon={PenSquare} title="Technique Write-ups" items={resources.blogPosts} />
        </div>
      </div>
    </section>
  );
}
