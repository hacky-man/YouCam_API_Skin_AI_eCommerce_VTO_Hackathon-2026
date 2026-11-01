import { StartScanButton } from '@/src/components/landing/start-scan-button';
import { TrailIllustration } from '@/src/components/landing/trail-illustration';

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-12 sm:px-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-32 lg:pt-20">
      <div className="animate-fade-up lg:col-span-7">
        <p className="flex items-center gap-3 text-sm font-medium text-stone-600">
          <span className="h-px w-8 bg-amber-600" aria-hidden="true" />
          Skin analysis for people who train outdoors
        </p>
        <h1 className="mt-8 font-display text-5xl font-medium leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
          The weather has been reading your skin all season.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-700">
          SkinShield AI reviews one selfie for wrinkles, spots, texture, and moisture, then turns the
          results into a morning and evening routine built for wind, UV, and sweat.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <StartScanButton onStart={onStart} />
          <p className="text-sm text-stone-600">About 10 seconds. Your photo is analyzed, not stored.</p>
        </div>
      </div>

      <figure className="animate-fade-up relative lg:col-span-5 [animation-delay:150ms]">
        <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-sm border border-amber-600/40" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-sm bg-amber-100">
          <TrailIllustration className="block h-auto w-full" />
        </div>
        <figcaption className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-stone-600">
          <span>Pre-dawn trail run</span>
          <span>Field notes</span>
        </figcaption>
      </figure>
    </section>
  );
}
