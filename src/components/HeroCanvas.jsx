import React, { useEffect, useRef } from 'react';

const EMBER_COUNT = 70;
const COLORS = [
  [255, 157, 92], // warm amber key light
  [255, 95, 61], // orange-red
  [61, 220, 208], // teal rim light (sparse)
];

function makeEmber(w, h, spawnAnywhere) {
  const cool = Math.random() < 0.12;
  const color = cool ? COLORS[2] : COLORS[Math.random() < 0.5 ? 0 : 1];
  return {
    x: Math.random() * w,
    y: spawnAnywhere ? Math.random() * h : h + Math.random() * 80,
    r: 0.6 + Math.random() * 2.2,
    vy: 0.18 + Math.random() * 0.5,
    sway: Math.random() * 0.6 - 0.3,
    swayPhase: Math.random() * Math.PI * 2,
    alpha: 0.25 + Math.random() * 0.55,
    color,
  };
}

/** Full-screen canvas of slow-drifting embers — a lightweight, WebGL-free
 * ambient animation loop for the hero background. */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let embers = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      embers = Array.from({ length: EMBER_COUNT }, () => makeEmber(width, height, true));
    };

    resize();
    window.addEventListener('resize', resize);

    const drawFrame = (t) => {
      ctx.clearRect(0, 0, width, height);
      for (const e of embers) {
        const sway = Math.sin(t / 1800 + e.swayPhase) * e.sway * 20;
        const grad = ctx.createRadialGradient(e.x + sway, e.y, 0, e.x + sway, e.y, e.r * 6);
        grad.addColorStop(0, `rgba(${e.color[0]}, ${e.color[1]}, ${e.color[2]}, ${e.alpha})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x + sway, e.y, e.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reduced) {
      drawFrame(0);
      return () => window.removeEventListener('resize', resize);
    }

    let raf;
    const tick = (t) => {
      for (const e of embers) {
        e.y -= e.vy;
        if (e.y < -20) Object.assign(e, makeEmber(width, height, false));
      }
      drawFrame(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
