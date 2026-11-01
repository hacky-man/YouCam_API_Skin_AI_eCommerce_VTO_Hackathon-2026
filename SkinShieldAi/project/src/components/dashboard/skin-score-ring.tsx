'use client';

import { useEffect, useState } from 'react';

interface SkinScoreRingProps {
  score: number;
}

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function SkinScoreRing({ score }: SkinScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => setProgress(score), 100);
    return () => window.clearTimeout(timeout);
  }, [score]);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const offset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div className="relative flex h-56 w-56 items-center justify-center">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="rgb(30 41 59)" strokeWidth="12" />
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke="url(#score-gradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] ease-out [transition-duration:1200ms]"
        />
        <defs>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(52 211 153)" />
            <stop offset="100%" stopColor="rgb(251 191 36)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <p className="text-6xl font-semibold tabular-nums tracking-tight text-slate-50">{displayScore}</p>
        <p className="mt-1 text-sm text-slate-400">out of 100</p>
      </div>
    </div>
  );
}
