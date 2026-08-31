import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'contributions', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export default function Effects() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const progressRef = useRef(null);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pointerFrame = null;
    let scrollFrame = null;
    let ringFrame = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;

    const animateRing = () => {
      ringX += (pointerX - ringX) * 0.17;
      ringY += (pointerY - ringY) * 0.17;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      ringFrame = requestAnimationFrame(animateRing);
    };

    const onPointerMove = (event) => {
      if (!finePointer || reducedMotion) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;

      pointerFrame = requestAnimationFrame(() => {
        const interactive = event.target instanceof Element && Boolean(event.target.closest('a, button, input, textarea, [role="button"]'));
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
          dotRef.current.classList.toggle('is-interactive', interactive);
          dotRef.current.classList.add('is-active');
        }
        ringRef.current?.classList.toggle('is-interactive', interactive);
        ringRef.current?.classList.add('is-active');
        pointerFrame = null;
      });
    };

    const onPointerLeave = () => {
      dotRef.current?.classList.remove('is-active');
      ringRef.current?.classList.remove('is-active');
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const scrollable = Math.max(root.scrollHeight - root.clientHeight, 1);
        const progress = Math.min(root.scrollTop / scrollable, 1);
        if (progressRef.current) progressRef.current.style.transform = `scaleY(${progress})`;
        setShowTop(root.scrollTop > 700);

        const marker = window.scrollY + window.innerHeight * 0.42;
        let current = SECTIONS[0].id;
        SECTIONS.forEach(({ id }) => {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= marker) current = id;
        });
        setActiveSection(current);
        scrollFrame = null;
      });
    };

    const onVisibilityChange = () => {
      document.documentElement.classList.toggle('is-page-hidden', document.hidden);
    };

    onScroll();
    onVisibilityChange();
    if (finePointer && !reducedMotion) ringFrame = requestAnimationFrame(animateRing);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.documentElement.classList.remove('is-page-hidden');
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      if (ringFrame) cancelAnimationFrame(ringFrame);
    };
  }, []);

  const activeIndex = Math.max(SECTIONS.findIndex((section) => section.id === activeSection), 0);

  return (
    <>
      <a className="skip-link" href="#about">Skip to profile content</a>
      <div className="backdrop" aria-hidden="true">
        <div className="liquid-field">
          <span className="liquid-wave wave-bronze" />
          <span className="liquid-wave wave-sapphire" />
          <span className="liquid-wave wave-shadow" />
        </div>
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />

      <nav className="section-rail" aria-label="Page sections">
        <span className="rail-current" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')}</span>
        <div className="rail-track" aria-hidden="true"><span ref={progressRef} /></div>
        <ol>
          {SECTIONS.map((section, index) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className={activeSection === section.id ? 'is-active' : ''} aria-label={`Go to ${section.label}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

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
        <ArrowUp size={18} />
      </button>
    </>
  );
}
