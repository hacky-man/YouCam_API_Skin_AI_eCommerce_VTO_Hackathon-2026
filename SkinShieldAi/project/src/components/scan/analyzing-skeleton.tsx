'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const ANALYSIS_STEPS = [
  'Mapping facial landmarks',
  'Measuring fine lines and wrinkles',
  'Scanning pigmentation and spots',
  'Assessing surface texture',
  'Calculating hydration levels',
];

const SKELETON_ROWS = ['Wrinkles', 'Spots', 'Texture', 'Moisture'];

interface AnalyzingSkeletonProps {
  previewUrl: string;
}

export function AnalyzingSkeleton({ previewUrl }: AnalyzingSkeletonProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStepIndex((current) => Math.min(current + 1, ANALYSIS_STEPS.length - 1));
    }, 600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-emerald-400/40">
            <img src={previewUrl} alt="Your photo being analyzed" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent animate-scan-line" />
          </div>
          <p className="mt-8 flex items-center gap-2 text-xl font-semibold text-slate-50">
            <Sparkles className="h-5 w-5 animate-pulse text-amber-300" aria-hidden="true" />
            Analyzing Biomarkers...
          </p>
          <p className="mt-2 h-5 text-sm text-slate-400" aria-live="polite">
            {ANALYSIS_STEPS[stepIndex]}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {SKELETON_ROWS.map((label) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">{label}</span>
                <span className="h-4 w-14 animate-pulse rounded bg-slate-800" />
              </div>
              <div className="relative mt-5 h-2.5 overflow-hidden rounded-full bg-slate-800">
                <div className="absolute inset-y-0 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
              </div>
              <div className="mt-4 h-3 w-3/4 animate-pulse rounded bg-slate-800/80" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
