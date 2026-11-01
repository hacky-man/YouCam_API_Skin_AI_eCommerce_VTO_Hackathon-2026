'use client';

import { useState } from 'react';
import { ArrowLeft, Camera, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/src/components/brand-logo';
import { CameraCapture } from '@/src/components/scan/camera-capture';
import { ImageUploadZone } from '@/src/components/scan/image-upload-zone';

interface UploadStageProps {
  errorMessage: string | null;
  onPhotoReady: (photo: File) => void;
  onBack: () => void;
}

export function UploadStage({ errorMessage, onPhotoReady, onBack }: UploadStageProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
          <BrandLogo />
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-900 hover:text-slate-100"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Step 1 of 2</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Add a photo of your face
        </h1>
        <p className="mt-3 max-w-xl text-slate-300">
          Face the camera with even, natural light. Remove sunglasses and hats for the most accurate reading.
        </p>

        {errorMessage && (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm text-amber-200"
          >
            {errorMessage}
          </div>
        )}

        <div className="mt-10">
          {isCameraOpen ? (
            <CameraCapture
              onCapture={(photo) => {
                setIsCameraOpen(false);
                onPhotoReady(photo);
              }}
              onClose={() => setIsCameraOpen(false)}
            />
          ) : (
            <div className="space-y-6">
              <ImageUploadZone onFileSelected={onPhotoReady} />
              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-wider text-slate-500">or</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <Button
                onClick={() => setIsCameraOpen(true)}
                variant="outline"
                className="h-14 w-full rounded-2xl border-slate-700 bg-slate-900/60 text-base font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:bg-slate-900 hover:text-emerald-300"
              >
                <Camera className="mr-2 h-5 w-5 text-emerald-400" aria-hidden="true" />
                Use my camera
              </Button>
            </div>
          )}
        </div>

        <p className="mt-10 flex items-center gap-2 text-sm text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          Your photo is analyzed and discarded. It is never stored.
        </p>
      </main>
    </div>
  );
}
