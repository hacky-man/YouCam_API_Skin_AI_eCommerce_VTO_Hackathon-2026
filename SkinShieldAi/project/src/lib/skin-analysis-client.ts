import type { SkinAnalysisResult } from './skin-analysis-types';

const VALID_STATUSES = ['good', 'moderate', 'needs_attention', 'low'];

function isSkinAnalysisResult(value: unknown): value is SkinAnalysisResult {
  if (typeof value !== 'object' || value === null) return false;
  const { analysis, routine } = value as Record<string, unknown>;
  if (typeof analysis !== 'object' || analysis === null || typeof routine !== 'object' || routine === null) {
    return false;
  }

  const { skinScore, metrics } = analysis as Record<string, unknown>;
  const { morning, evening, athleteTips, focusAreas } = routine as Record<string, unknown>;

  return (
    typeof skinScore === 'number' &&
    Array.isArray(metrics) &&
    metrics.every(
      (metric) =>
        typeof metric === 'object' &&
        metric !== null &&
        typeof (metric as { score?: unknown }).score === 'number' &&
        VALID_STATUSES.includes((metric as { status?: string }).status ?? ''),
    ) &&
    Array.isArray(morning) &&
    Array.isArray(evening) &&
    Array.isArray(athleteTips) &&
    Array.isArray(focusAreas)
  );
}

export async function requestSkinAnalysis(imageDataUrl: string, fileName: string): Promise<SkinAnalysisResult> {
  const response = await fetch('/api/skin-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageDataUrl, fileName }),
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && 'error' in payload
        ? String((payload as { error: unknown }).error)
        : 'Skin analysis failed. Please try again.';
    throw new Error(message);
  }

  if (!isSkinAnalysisResult(payload)) {
    throw new Error('We received an unexpected response. Please try again.');
  }

  return payload;
}
