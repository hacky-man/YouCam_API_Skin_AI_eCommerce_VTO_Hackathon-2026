import { BrandLogo } from '@/src/components/brand-logo';
import { HeroSection } from '@/src/components/landing/hero-section';
import { ReadoutSection } from '@/src/components/landing/readout-section';
import { StartScanButton } from '@/src/components/landing/start-scan-button';
import { StepsSection } from '@/src/components/landing/steps-section';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <BrandLogo tone="on-light" />
          <button
            type="button"
            onClick={onStart}
            className="text-sm font-semibold text-emerald-800 underline-offset-4 transition-colors hover:text-emerald-600 hover:underline"
          >
            Start a scan
          </button>
        </div>
      </header>

      <main>
        <HeroSection onStart={onStart} />
        <ReadoutSection />
        <StepsSection onStart={onStart} />

        <section className="border-t border-stone-300">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 sm:px-10 md:flex-row md:items-end md:justify-between lg:py-24">
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Start with one photo before your next long effort.
            </h2>
            <StartScanButton onStart={onStart} />
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <BrandLogo tone="on-light" />
          <p>SkinShield AI is a wellness tool and does not replace a dermatologist.</p>
        </div>
      </footer>
    </div>
  );
}
