import React, { useEffect, useRef, useState } from 'react';
import { createTechCoreScene } from './techCoreScene';
import './TechCoreCanvas.css';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function TechCoreCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startY: 0 });
  const [webglOk] = useState(supportsWebGL);

  useEffect(() => {
    if (!webglOk) return undefined;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rect = container.getBoundingClientRect();
    const scene = createTechCoreScene(canvas, {
      width: rect.width,
      height: rect.height,
      reducedMotion,
    });
    sceneRef.current = scene;

    const toNormalized = (clientX, clientY) => {
      const bounds = container.getBoundingClientRect();
      return {
        x: ((clientX - bounds.left) / bounds.width) * 2 - 1,
        y: ((clientY - bounds.top) / bounds.height) * 2 - 1,
      };
    };

    const handlePointerMove = (e) => {
      const { x, y } = toNormalized(e.clientX, e.clientY);
      if (dragRef.current.active) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
        scene.onDragMove(e.clientX, e.clientY);
      } else if (!reducedMotion) {
        scene.setPointer(x, y);
      }
    };

    const handlePointerDown = (e) => {
      dragRef.current = { active: true, moved: false, startX: e.clientX, startY: e.clientY };
      scene.onDragStart(e.clientX, e.clientY);
      container.setPointerCapture?.(e.pointerId);
    };

    const handlePointerUp = (e) => {
      if (dragRef.current.active && !dragRef.current.moved) scene.pulse();
      dragRef.current.active = false;
      scene.onDragEnd();
      container.releasePointerCapture?.(e.pointerId);
    };

    const handlePointerLeave = () => {
      if (!dragRef.current.active) scene.setPointer(0, 0);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) scene.resize(width, height);
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) scene.start();
        else scene.stop();
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      scene.dispose();
      sceneRef.current = null;
    };
  }, [webglOk]);

  if (!webglOk) {
    return (
      <div className="tech-core-canvas tech-core-fallback" aria-hidden="true">
        <div className="tech-core-fallback-glow" />
        <div className="tech-core-fallback-ring" />
      </div>
    );
  }

  return (
    <div className="tech-core-canvas" ref={containerRef}>
      <canvas ref={canvasRef} className="tech-core-canvas-el" aria-hidden="true" />
      <div className="tech-core-badge">
        <span className="tech-core-badge-dot" />
        Interactive 3D • Drag to explore
      </div>
    </div>
  );
}
