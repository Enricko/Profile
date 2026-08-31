import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Effects() {
  const glowRef = useRef(null);
  const progressRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointerFrame = null;
    let scrollFrame = null;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event) => {
      if (!finePointer || reducedMotion) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;

      pointerFrame = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
          glowRef.current.classList.add('is-active');
        }
        pointerFrame = null;
      });
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const scrollable = Math.max(root.scrollHeight - root.clientHeight, 1);
        const progress = Math.min(root.scrollTop / scrollable, 1);
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        setShowTop(root.scrollTop > 600);
        scrollFrame = null;
      });
    };

    const onVisibilityChange = () => {
      document.documentElement.classList.toggle('is-page-hidden', document.hidden);
    };

    onScroll();
    onVisibilityChange();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.documentElement.classList.remove('is-page-hidden');
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <button
        type="button"
        className={`to-top ${showTop ? 'show' : ''}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          document.querySelector('.logo')?.focus({ preventScroll: true });
        }}
        aria-label="Scroll back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
