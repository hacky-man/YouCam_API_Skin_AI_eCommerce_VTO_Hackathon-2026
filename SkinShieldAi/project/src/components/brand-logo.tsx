import { ScanFace } from 'lucide-react';

interface BrandLogoProps {
  tone?: 'on-dark' | 'on-light';
}

export function BrandLogo({ tone = 'on-dark' }: BrandLogoProps) {
  const isLight = tone === 'on-light';

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${
          isLight ? 'bg-emerald-800 ring-emerald-800' : 'bg-emerald-500/15 ring-emerald-400/40'
        }`}
      >
        <ScanFace className={`h-5 w-5 ${isLight ? 'text-stone-50' : 'text-emerald-400'}`} aria-hidden="true" />
      </span>
      <span className={`text-base font-semibold tracking-tight ${isLight ? 'text-slate-900' : 'text-slate-50'}`}>
        SkinShield <span className={isLight ? 'text-emerald-800' : 'text-emerald-400'}>AI</span>
      </span>
    </div>
  );
}
