import React from 'react';

export default function SplitText({ text, className = '', as: element = 'span' }) {
  const characters = Array.from(text).map((character, index) => (
    <span
      key={`${character}-${index}`}
      className="split-character"
      aria-hidden="true"
      style={{ '--char-index': index }}
    >
      {character === ' ' ? '\u00a0' : character}
    </span>
  ));

  return React.createElement(
    element,
    { className: `split-text ${className}`, 'aria-label': text },
    characters,
  );
}
