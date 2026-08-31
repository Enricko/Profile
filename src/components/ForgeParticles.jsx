import React from 'react';
import './ForgeParticles.css';

function createParticles(count = 34) {
  let seed = 1749;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${(random() * 100).toFixed(2)}%`,
    bottom: `${(-8 + random() * 34).toFixed(2)}%`,
    size: `${(1 + random() * 2.8).toFixed(2)}px`,
    duration: `${(7 + random() * 12).toFixed(2)}s`,
    delay: `${(-random() * 18).toFixed(2)}s`,
    drift: `${(-50 + random() * 100).toFixed(1)}px`,
    travel: `${(35 + random() * 52).toFixed(1)}vh`,
    sapphire: index % 7 === 0,
  }));
}

const PARTICLES = createParticles();

export default function ForgeParticles() {
  return (
    <div className="forge-particles" aria-hidden="true">
      {PARTICLES.map((particle) => (
        <span
          key={particle.id}
          className={`forge-particle ${particle.sapphire ? 'is-sapphire' : ''}`}
          style={{
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.duration,
            animationDelay: particle.delay,
            '--particle-drift': particle.drift,
            '--particle-travel': particle.travel,
          }}
        />
      ))}
    </div>
  );
}
