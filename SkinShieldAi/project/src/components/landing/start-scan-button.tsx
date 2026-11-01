import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartScanButtonProps {
  label?: string;
  className?: string;
  onStart: () => void;
}

export function StartScanButton({ label = 'Start Free Skin Scan', className = '', onStart }: StartScanButtonProps) {
  return (
    <Button
      onClick={onStart}
      className={`group h-14 rounded-md bg-emerald-800 px-7 text-base font-semibold text-stone-50 shadow-sm transition-colors duration-300 hover:bg-emerald-700 ${className}`}
    >
      {label}
      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Button>
  );
}
