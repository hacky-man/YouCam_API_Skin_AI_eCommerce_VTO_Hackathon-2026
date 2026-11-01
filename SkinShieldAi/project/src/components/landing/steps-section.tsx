import { StartScanButton } from '@/src/components/landing/start-scan-button';

const STEPS = [
  {
    title: 'Take one photo',
    description: 'Face the camera in even daylight. Use your phone camera or upload a picture you already have.',
  },
  {
    title: 'Read the biomarkers',
    description: 'The analysis checks fine lines, pigmentation, surface texture, and hydration in a few seconds.',
  },
  {
    title: 'Follow the plan',
    description: 'You get a morning and evening routine, plus tips for long runs, rides, and days on the water.',
  },
];

interface StepsSectionProps {
  onStart: () => void;
}

export function StepsSection({ onStart }: StepsSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10 lg:py-32">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-stone-600">How it works</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
            Three steps, one photo.
          </h2>
          <div className="mt-10">
            <StartScanButton onStart={onStart} />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[3rem_1fr] gap-4 border-t border-stone-300 py-8 first:border-t-0 first:pt-0 last:pb-0"
            >
              <span className="font-display text-2xl text-amber-700">0{index + 1}</span>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-700">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
