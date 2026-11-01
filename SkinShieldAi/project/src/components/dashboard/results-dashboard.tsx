import { RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/src/components/brand-logo';
import { MetricCard } from '@/src/components/dashboard/metric-card';
import { RoutinePlan } from '@/src/components/dashboard/routine-plan';
import { SkinScoreRing } from '@/src/components/dashboard/skin-score-ring';
import type { SkinAnalysisResult } from '@/src/lib/skin-analysis-types';

interface ResultsDashboardProps {
  result: SkinAnalysisResult;
  onRescan: () => void;
}

export function ResultsDashboard({ result, onRescan }: ResultsDashboardProps) {
  const { analysis, routine } = result;
  const scanDate = new Date(analysis.analyzedAt).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <BrandLogo />
          <Button
            onClick={onRescan}
            variant="outline"
            className="h-9 rounded-full border-slate-700 bg-transparent px-4 text-sm font-medium text-slate-100 transition-colors hover:border-emerald-400/60 hover:bg-slate-900 hover:text-emerald-300"
          >
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            New scan
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-5 py-10 sm:px-8 sm:py-14">
        <section className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
          <div className="flex justify-center">
            <SkinScoreRing score={analysis.skinScore} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">{scanDate}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              Your skin health dashboard
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-300">
              Your overall score blends four diagnostic metrics. Review the breakdown below, then follow
              your routine to protect and repair your skin through training season.
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Wellness guidance only. Consult a dermatologist for persistent concerns.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-50">Diagnostic metrics</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {analysis.metrics.map((metric, index) => (
              <MetricCard key={metric.key} metric={metric} index={index} />
            ))}
          </div>
        </section>

        <RoutinePlan routine={routine} />
      </main>
    </div>
  );
}
