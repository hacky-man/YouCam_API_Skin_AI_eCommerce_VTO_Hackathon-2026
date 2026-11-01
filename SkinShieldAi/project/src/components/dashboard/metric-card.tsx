'use client';

import { useEffect, useState } from 'react';
import { METRIC_STATUS_LABELS, type MetricStatus, type SkinMetric } from '@/src/lib/skin-analysis-types';

const STATUS_STYLES: Record<MetricStatus, { bar: string; text: string; badge: string }> = {
  good: {
    bar: 'bg-emerald-400',
    text: 'text-emerald-300',
    badge: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  },
  moderate: {
    bar: 'bg-amber-300',
    text: 'text-amber-200',
    badge: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
  },
  needs_attention: {
    bar: 'bg-amber-500',
    text: 'text-amber-400',
    badge: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  },
  low: {
    bar: 'bg-rose-400',
    text: 'text-rose-300',
    badge: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
  },
};

interface MetricCardProps {
  metric: SkinMetric;
  index: number;
}

export function MetricCard({ metric, index }: MetricCardProps) {
  const [width, setWidth] = useState(0);
  const styles = STATUS_STYLES[metric.status];

  useEffect(() => {
    const timeout = window.setTimeout(() => setWidth(metric.score), 150 + index * 120);
    return () => window.clearTimeout(timeout);
  }, [metric.score, index]);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition-colors duration-300 hover:border-white/20">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-50">{metric.label}</h3>
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
          {METRIC_STATUS_LABELS[metric.status]}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <span className="text-sm text-slate-400">Score</span>
        <span className={`text-sm font-semibold tabular-nums ${styles.text}`}>{metric.score}/100</span>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
        aria-label={`${metric.label} score`}
        aria-valuenow={metric.score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${styles.bar} transition-[width] duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
