import React, { useMemo } from 'react';
import './Rain.css';

/* Weighted pool: skills rain counts double, so it shows up most often */
const MODES = [
  ['none', 1],
  ['neon', 1],
  ['calico', 1],
  ['faces', 1],
  ['skills', 2],
];

export function rollRainMode(exclude) {
  const pool = MODES.filter(([id]) => id !== exclude);
  const total = pool.reduce((sum, [, w]) => sum + w, 0);
  let r = Math.random() * total;
  for (const [id, w] of pool) {
    if ((r -= w) < 0) return id;
  }
  return pool[pool.length - 1][0];
}

/* --- Neon paws (solid, glowing) ------------------------------------- */
const NEON_COLORS = ['#00f2fe', '#4facfe', '#f093fb', '#7c5cff'];

/* --- Calico paws: light fur, orange/black patches, pink beans -------- */
const FUR_BASES = ['#fbf3e6', '#f7ede0', '#d8d2de'];
const PATCH_COLORS = ['#e2914a', '#c96f2f', '#f0a95e', '#241f2b', '#37303f', '#6b6470'];
const BEAN_PINKS = ['#f6a8c0', '#fda4af', '#e88ca6'];
const BEAN_DARK = '#2e2837';

/* --- Skill logos (brand-colored SVGs from /public/logos) ------------- */
const SKILL_LOGOS = [
  '/logos/react.svg',
  '/logos/vite.svg',
  '/logos/javascript.svg',
  '/logos/typescript.svg',
  '/logos/css3.svg',
  '/logos/tailwindcss.svg',
  '/logos/vuedotjs.svg',
  '/logos/laravel.svg',
  '/logos/php.svg',
  '/logos/python.svg',
  '/logos/go.svg',
  '/logos/mysql.svg',
  '/logos/postgresql.svg',
  '/logos/nodedotjs.svg',
  '/logos/flutter.svg',
  '/logos/electron.svg',
];

/* Toe positions shared by the silhouette, the clip and the beans */
const TOES = [
  { cx: 12, cy: 17, rot: -22 },
  { cx: 26, cy: 10, rot: -7 },
  { cx: 40, cy: 10, rot: 7 },
  { cx: 54, cy: 17, rot: 22 },
];

const PawShape = () => (
  <>
    {TOES.map((t, i) => (
      <circle key={i} cx={t.cx} cy={t.cy} r="9.5" />
    ))}
    <ellipse cx="32" cy="41" rx="27" ry="21" />
  </>
);

const Claws = ({ fill }) =>
  TOES.map((t, i) => (
    <path
      key={i}
      d={`M${t.cx - 2} ${t.cy - 8} l2 -7 l3 7 z`}
      fill={fill}
      transform={`rotate(${t.rot} ${t.cx} ${t.cy})`}
    />
  ));

function SolidPaw({ color, dog }) {
  return (
    <svg viewBox="0 0 64 64" style={{ color }} fill="currentColor" aria-hidden="true">
      {dog && <Claws fill={color} />}
      <PawShape />
    </svg>
  );
}

function CalicoPaw({ clipId, base, patches, beans, dog }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <PawShape />
        </clipPath>
      </defs>
      {dog && <Claws fill={base} />}
      <g fill={base}>
        <PawShape />
      </g>
      <g clipPath={`url(#${clipId})`}>
        {patches.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={p.color}
            transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
          />
        ))}
      </g>
      {TOES.map((t, i) => (
        <ellipse
          key={i}
          cx={t.cx}
          cy={t.cy}
          rx="4.2"
          ry="5.8"
          fill={beans[i]}
          transform={`rotate(${t.rot} ${t.cx} ${t.cy})`}
        />
      ))}
      <path
        d="M32 31c-8 0-14 5-14 11 0 5 6 9 14 9s14-4 14-9c0-6-6-11-14-11z"
        fill={beans[4]}
      />
    </svg>
  );
}

const DARK = '#241f2b';

function CatFace({ clipId, base, patches }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d="M7 24 L12 3 L28 13 z" />
          <path d="M57 24 L52 3 L36 13 z" />
          <ellipse cx="32" cy="38" rx="26" ry="24" />
        </clipPath>
      </defs>
      <g fill={base}>
        <path d="M7 24 L12 3 L28 13 z" />
        <path d="M57 24 L52 3 L36 13 z" />
        <ellipse cx="32" cy="38" rx="26" ry="24" />
      </g>
      <g clipPath={`url(#${clipId})`}>
        {patches.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={p.color}
            transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
          />
        ))}
      </g>
      {/* inner ears */}
      <path d="M12 18 L14 8 L22 13 z" fill="#f6a8c0" />
      <path d="M52 18 L50 8 L42 13 z" fill="#f6a8c0" />
      {/* eyes, nose, mouth */}
      <ellipse cx="22" cy="36" rx="3.2" ry="3.6" fill={DARK} />
      <ellipse cx="42" cy="36" rx="3.2" ry="3.6" fill={DARK} />
      <path d="M29 44 h6 l-3 4.5 z" fill="#e88ca6" />
      <path
        d="M32 48.5 q-3 4 -7 2 M32 48.5 q3 4 7 2"
        stroke={DARK}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DogFace({ clipId, base, patches, earColor }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="32" cy="36" rx="24" ry="23" />
        </clipPath>
      </defs>
      {/* floppy ears */}
      <ellipse cx="9" cy="28" rx="8" ry="15" fill={earColor} transform="rotate(14 9 28)" />
      <ellipse cx="55" cy="28" rx="8" ry="15" fill={earColor} transform="rotate(-14 55 28)" />
      <ellipse cx="32" cy="36" rx="24" ry="23" fill={base} />
      <g clipPath={`url(#${clipId})`}>
        {patches.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx={p.rx}
            ry={p.ry}
            fill={p.color}
            transform={`rotate(${p.rot} ${p.cx} ${p.cy})`}
          />
        ))}
      </g>
      {/* muzzle, eyes, nose, mouth */}
      <ellipse cx="32" cy="46" rx="12" ry="9.5" fill="#fbf3e6" />
      <ellipse cx="22" cy="33" rx="3.4" ry="3.8" fill={DARK} />
      <ellipse cx="42" cy="33" rx="3.4" ry="3.8" fill={DARK} />
      <ellipse cx="32" cy="43" rx="4.6" ry="3.6" fill={DARK} />
      <path
        d="M32 46.5 q-3.5 4.5 -7.5 2 M32 46.5 q3.5 4.5 7.5 2"
        stroke={DARK}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const ITEM_COUNT = 36;
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const beanColor = () => (Math.random() < 0.68 ? pick(BEAN_PINKS) : BEAN_DARK);

export default function Rain({ mode }) {
  const items = useMemo(
    () =>
      Array.from({ length: ITEM_COUNT }, (_, i) => ({
        id: i,
        dog: Math.random() < 0.3,
        dogFace: Math.random() < 0.5,
        neon: pick(NEON_COLORS),
        base: pick(FUR_BASES),
        patches: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => ({
          cx: rand(0, 64),
          cy: rand(0, 64),
          rx: rand(9, 19),
          ry: rand(7, 14),
          rot: rand(0, 180),
          color: pick(PATCH_COLORS),
        })),
        beans: Array.from({ length: 5 }, beanColor),
        logo: pick(SKILL_LOGOS),
        left: `${Math.random() * 100}%`,
        size: 24 + Math.random() * 24,
        opacity: 0.6 + Math.random() * 0.35,
        duration: `${7 + Math.random() * 8}s`,
        delay: `${-Math.random() * 15}s`,
        sway: `${rand(-6, 6).toFixed(1)}vw`,
        rot: `${Math.random() < 0.5 ? '' : '-'}${180 + Math.floor(Math.random() * 360)}deg`,
      })),
    [mode]
  );

  if (mode === 'none') return null;

  return (
    <div className={`paw-rain mode-${mode}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className="paw"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            '--sway': p.sway,
            '--rot': p.rot,
          }}
        >
          {mode === 'neon' && <SolidPaw color={p.neon} dog={p.dog} />}
          {mode === 'faces' &&
            (p.dogFace ? (
              <DogFace
                clipId={`face-clip-${p.id}`}
                base={p.base}
                patches={p.patches}
                earColor={p.patches[0].color}
              />
            ) : (
              <CatFace clipId={`face-clip-${p.id}`} base={p.base} patches={p.patches} />
            ))}
          {mode === 'calico' && (
            <CalicoPaw
              clipId={`paw-clip-${p.id}`}
              base={p.base}
              patches={p.patches}
              beans={p.beans}
              dog={p.dog}
            />
          )}
          {mode === 'skills' && <img src={p.logo} alt="" loading="lazy" />}
        </span>
      ))}
    </div>
  );
}
