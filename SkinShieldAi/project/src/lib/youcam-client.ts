import type { MetricKey, MetricStatus, SkinAnalysis, SkinMetric } from './skin-analysis-types';

const ANALYSIS_DELAY_MS = 3000;
const BASE_SCORE_MIN = 65;
const BASE_SCORE_SPAN = 31;
const VARIANCE_POINTS = 12;

const BIOMARKERS: { key: MetricKey; label: string; offset: number }[] = [
  { key: 'wrinkles', label: 'Wrinkles', offset: 2 },
  { key: 'spots', label: 'Spots', offset: -6 },
  { key: 'texture', label: 'Texture', offset: -4 },
  { key: 'moisture', label: 'Moisture', offset: -10 },
];

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function statusForScore(score: number): MetricStatus {
  if (score >= 70) return 'good';
  if (score >= 50) return 'moderate';
  if (score >= 35) return 'needs_attention';
  return 'low';
}

function randomVariance(): number {
  return (Math.random() * 2 - 1) * VARIANCE_POINTS;
}

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

/**
 * Simulates a server-to-server POST to the YouCam Skin AI API.
 * Runs only on the server (inside the /api/skin-analysis route).
 */
export async function requestYouCamSkinAnalysis(imageDataUrl: string, fileName: string): Promise<SkinAnalysis> {
  if (!imageDataUrl.startsWith('data:image/')) {
    throw new Error('Unsupported image payload');
  }

  await delay(ANALYSIS_DELAY_MS);

  const baseScore = BASE_SCORE_MIN + (fileName.length % BASE_SCORE_SPAN);

  const metrics: SkinMetric[] = BIOMARKERS.map(({ key, label, offset }) => {
    const score = clampScore(baseScore + offset + randomVariance());
    return { key, label, score, status: statusForScore(score) };
  });

  return {
    requestId: crypto.randomUUID(),
    skinScore: baseScore,
    metrics,
    analyzedAt: new Date().toISOString(),
  };
}
