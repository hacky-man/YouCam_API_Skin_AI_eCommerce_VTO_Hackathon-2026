export type MetricKey = 'wrinkles' | 'spots' | 'texture' | 'moisture';

export type MetricStatus = 'good' | 'moderate' | 'needs_attention' | 'low';

export interface SkinMetric {
  key: MetricKey;
  label: string;
  score: number;
  status: MetricStatus;
}

export interface SkinAnalysis {
  requestId: string;
  skinScore: number;
  metrics: SkinMetric[];
  analyzedAt: string;
}

export interface RoutineStep {
  name: string;
  purpose: string;
  instruction: string;
}

export interface DailyRoutine {
  headline: string;
  summary: string;
  focusAreas: string[];
  morning: RoutineStep[];
  evening: RoutineStep[];
  athleteTips: string[];
}

export interface SkinAnalysisResult {
  analysis: SkinAnalysis;
  routine: DailyRoutine;
}

export const METRIC_STATUS_LABELS: Record<MetricStatus, string> = {
  good: 'Good',
  moderate: 'Moderate',
  needs_attention: 'Needs Attention',
  low: 'Low',
};
