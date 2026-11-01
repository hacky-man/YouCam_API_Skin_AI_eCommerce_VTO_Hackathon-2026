import { CheckCircle2, Moon, Sparkles, Sun, type LucideIcon } from 'lucide-react';
import type { DailyRoutine, RoutineStep } from '@/src/lib/skin-analysis-types';

interface RoutinePlanProps {
  routine: DailyRoutine;
}

export function RoutinePlan({ routine }: RoutinePlanProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-900 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Your personal plan
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{routine.headline}</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-300">{routine.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {routine.focusAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RoutineColumn title="Morning" icon={Sun} accent="text-amber-300" steps={routine.morning} />
        <RoutineColumn title="Evening" icon={Moon} accent="text-sky-300" steps={routine.evening} />
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-slate-50">Athlete tips</h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {routine.athleteTips.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm leading-relaxed text-slate-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface RoutineColumnProps {
  title: string;
  icon: LucideIcon;
  accent: string;
  steps: RoutineStep[];
}

function RoutineColumn({ title, icon: Icon, accent, steps }: RoutineColumnProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:p-8">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-50">
        <Icon className={`h-5 w-5 ${accent}`} aria-hidden="true" />
        {title} routine
      </h3>
      <ol className="mt-6 space-y-5">
        {steps.map((step, index) => (
          <li key={step.name} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
              {index + 1}
            </span>
            <div>
              <p className="font-semibold text-slate-50">{step.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.purpose}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.instruction}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
