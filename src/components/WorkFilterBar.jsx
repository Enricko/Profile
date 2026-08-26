import React from 'react';
import { categories } from '../data/artist';
import './WorkFilterBar.css';

export default function WorkFilterBar({ active, onChange }) {
  return (
    <div className="work-filter-bar" role="group" aria-label="Filter projects by category">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`work-filter-btn ${active === cat.id ? 'is-active' : ''}`}
          aria-pressed={active === cat.id}
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
