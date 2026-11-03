import React from 'react';

/**
 * Shared, left-aligned section heading: "01 — LABEL", title, optional lede.
 * `title` may contain <em> for the serif-italic accent word.
 */
export default function SectionHead({ index, label, title, children }) {
  return (
    <header className="section-head reveal-on-scroll">
      <div className="section-kicker">
        <span className="section-index">{index}</span>
        <span>{label}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-desc">{children}</p>}
    </header>
  );
}
