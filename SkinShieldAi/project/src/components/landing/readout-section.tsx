import { METRIC_STATUS_LABELS, type MetricStatus } from '@/src/lib/skin-analysis-types';

const READOUT_ROWS: { label: string; status: MetricStatus; score: number; note: string }[] = [
  { label: 'Wrinkles', status: 'good', score: 78, note: 'Fine lines are well controlled' },
  { label: 'Spots', status: 'moderate', score: 56, note: 'Sun spots are forming on the cheeks' },
  { label: 'Texture', status: 'needs_attention', score: 38, note: 'Rough patches show after long rides' },
  { label: 'Moisture', status: 'low', score: 27, note: 'Wind is pulling water from the surface' },
];

const BAR_STYLES: Record<MetricStatus, string> = {
  good: 'bg-emerald-700',
  moderate: 'bg-amber-500',
  needs_attention: 'bg-amber-700',
  low: 'bg-rose-700',
};

const TEXT_STYLES: Record<MetricStatus, string> = {
  good: 'text-emerald-800',
  moderate: 'text-amber-800',
  needs_attention: 'text-amber-900',
  low: 'text-rose-800',
};

export function ReadoutSection() {
  return (
    <section className="border-t border-stone-300 bg-stone-100/60">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="lg:col-span-4">
          <p className="text-sm font-medium text-stone-600">A sample readout</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            Four numbers that decide your routine.
          </h2>
          <p className="mt-6 leading-relaxed text-stone-700">
            Every scan is scored against the same four measures, so you can see exactly where your skin is
            holding up and where it needs help before the next big effort.
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="flex items-end justify-between border-b border-stone-400 pb-6">
            <p className="text-sm font-medium text-stone-600">Overall skin score</p>
            <p className="font-display text-6xl font-medium tracking-tight text-slate-900">
              84<span className="text-2xl text-stone-500"> / 100</span>
            </p>
          </div>

          <ul>
            {READOUT_ROWS.map((row) => (
              <li key={row.label} className="grid gap-4 border-b border-stone-300 py-6 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-8">
                <div>
                  <p className="font-semibold text-slate-900">{row.label}</p>
                  <p className={`mt-1 text-sm font-medium ${TEXT_STYLES[row.status]}`}>
                    {METRIC_STATUS_LABELS[row.status]}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-300" role="presentation">
                      <div className={`h-full rounded-full ${BAR_STYLES[row.status]}`} style={{ width: `${row.score}%` }} />
                    </div>
                    <span className="w-12 text-right text-sm tabular-nums text-stone-700">{row.score}</span>
                  </div>
                  <p className="mt-2 text-sm text-stone-600">{row.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
