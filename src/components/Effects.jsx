import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Effects() {
  const glowRef = useRef(null);
  const progressRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Cursor-following glow (rAF-throttled)
    let raf = null;
    let tx = 0, ty = 0;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate(${tx}px, ${ty}px)`;
        }
        raf = null;
      });
    };
    window.addEventListener('pointermove', onMove);

    // Scroll progress + scroll-to-top visibility
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (progressRef.current) progressRef.current.style.width = `${scrolled}%`;
      setShowTop(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <button
        className={`to-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
