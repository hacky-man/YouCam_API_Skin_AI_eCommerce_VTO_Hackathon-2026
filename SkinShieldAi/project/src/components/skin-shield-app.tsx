'use client';

import { useState } from 'react';
import { LandingPage } from '@/src/components/landing/landing-page';
import { AnalyzingSkeleton } from '@/src/components/scan/analyzing-skeleton';
import { UploadStage } from '@/src/components/scan/upload-stage';
import { ResultsDashboard } from '@/src/components/dashboard/results-dashboard';
import { requestSkinAnalysis } from '@/src/lib/skin-analysis-client';
import { prepareImageForUpload } from '@/src/lib/prepare-image';
import type { SkinAnalysisResult } from '@/src/lib/skin-analysis-types';

type Stage =
  | { view: 'landing' }
  | { view: 'upload'; errorMessage: string | null }
  | { view: 'analyzing'; previewUrl: string }
  | { view: 'results'; result: SkinAnalysisResult };

export function SkinShieldApp() {
  const [stage, setStage] = useState<Stage>({ view: 'landing' });

  const startAnalysis = async (photo: File) => {
    const previewUrl = URL.createObjectURL(photo);
    setStage({ view: 'analyzing', previewUrl });

    try {
      const imageDataUrl = await prepareImageForUpload(photo);
      const result = await requestSkinAnalysis(imageDataUrl, photo.name);
      setStage({ view: 'results', result });
    } catch (error) {
      setStage({
        view: 'upload',
        errorMessage: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const goToUpload = () => setStage({ view: 'upload', errorMessage: null });

  return (
    <>
      {stage.view === 'landing' && <LandingPage onStart={goToUpload} />}
      {stage.view === 'upload' && (
        <UploadStage
          errorMessage={stage.errorMessage}
          onPhotoReady={startAnalysis}
          onBack={() => setStage({ view: 'landing' })}
        />
      )}
      {stage.view === 'analyzing' && <AnalyzingSkeleton previewUrl={stage.previewUrl} />}
      {stage.view === 'results' && (
        <ResultsDashboard result={stage.result} onRescan={goToUpload} />
      )}
    </>
  );
}
