'use client';

import { useRef, useState, type DragEvent } from 'react';
import { ImagePlus, Upload } from 'lucide-react';

interface ImageUploadZoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function ImageUploadZone({ onFileSelected, disabled = false }: ImageUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFileSelected(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      className={`group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isDragging
          ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
          : 'border-slate-700 bg-slate-900/60 hover:border-emerald-400/60 hover:bg-slate-900'
      } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-400/30 transition-transform duration-300 group-hover:-translate-y-1">
        {isDragging ? (
          <ImagePlus className="h-7 w-7 text-emerald-400" aria-hidden="true" />
        ) : (
          <Upload className="h-7 w-7 text-emerald-400" aria-hidden="true" />
        )}
      </span>
      <p className="mt-6 text-lg font-semibold text-slate-50">
        {isDragging ? 'Drop your photo here' : 'Drag a selfie here, or click to browse'}
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
        Use a clear, front-facing JPG, PNG, or WebP photo in natural light with your face fully in frame.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />
    </div>
  );
}
