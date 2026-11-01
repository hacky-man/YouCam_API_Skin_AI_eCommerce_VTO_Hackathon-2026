import type {
  DailyRoutine,
  MetricKey,
  MetricStatus,
  RoutineStep,
  SkinAnalysis,
} from './skin-analysis-types';

type MetricStatusMap = Partial<Record<MetricKey, MetricStatus>>;

function statusMap(analysis: SkinAnalysis): MetricStatusMap {
  return Object.fromEntries(analysis.metrics.map((metric) => [metric.key, metric.status]));
}

function needsCare(status: MetricStatus | undefined): boolean {
  return status === 'moderate' || status === 'needs_attention' || status === 'low';
}

function buildHeadline(score: number): string {
  if (score >= 85) return 'Excellent base, precise maintenance';
  if (score >= 70) return 'Solid foundation, targeted upkeep';
  return 'Your skin needs focused repair';
}

function buildSummary(statuses: MetricStatusMap, score: number): string {
  const concerns: string[] = [];
  if (statuses.moisture === 'low') concerns.push('low moisture');
  if (statuses.texture === 'needs_attention') concerns.push('uneven texture');
  if (statuses.spots === 'moderate') concerns.push('visible spots');

  const concernText =
    concerns.length > 0
      ? `Your main priorities are ${concerns.join(' and ')}.`
      : 'No major concerns were flagged today.';

  const wrinkleText =
    statuses.wrinkles === 'good'
      ? 'Fine lines are well controlled, so the plan focuses on maintenance.'
      : 'Fine lines need active support alongside your daily protection.';

  return `With a skin score of ${score}, ${concernText} ${wrinkleText}`;
}

function buildMorning(statuses: MetricStatusMap): RoutineStep[] {
  const steps: RoutineStep[] = [
    {
      name: 'Gentle hydrating cleanser',
      purpose: 'Refresh overnight oil without stripping the skin barrier.',
      instruction: 'Massage for 30 seconds with lukewarm water, then pat dry.',
    },
  ];

  if (needsCare(statuses.spots)) {
    steps.push({
      name: 'Vitamin C brightening serum',
      purpose: 'Evens tone and softens the look of spots.',
      instruction: 'Apply 3 to 4 drops to damp skin before moisturizer.',
    });
  }

  if (needsCare(statuses.moisture)) {
    steps.push({
      name: 'Hyaluronic acid hydrator',
      purpose: 'Pulls water into the skin to counter low moisture.',
      instruction: 'Press into skin while still damp for the best absorption.',
    });
  }

  steps.push({
    name: 'Broad-spectrum SPF 50',
    purpose: 'Blocks UVA and UVB rays during training and commutes.',
    instruction: 'Use a generous layer and reapply every two hours outdoors.',
  });

  return steps;
}

function buildEvening(statuses: MetricStatusMap): RoutineStep[] {
  const steps: RoutineStep[] = [
    {
      name: 'Double cleanse',
      purpose: 'Lifts sunscreen, sweat, and trail grime from the day.',
      instruction: 'Start with an oil cleanser, then follow with your gentle cleanser.',
    },
  ];

  if (statuses.texture === 'needs_attention') {
    steps.push({
      name: 'Niacinamide refining serum',
      purpose: 'Minimizes pores and smooths rough surface texture over time.',
      instruction: 'Apply a pea-sized amount nightly. Start every other night if skin feels sensitive.',
    });
  }

  if (statuses.wrinkles === 'good') {
    steps.push({
      name: 'Peptide firming serum',
      purpose: 'Maintains collagen support and keeps fine lines in check.',
      instruction: 'Apply after cleansing while skin is still slightly damp.',
    });
  } else {
    steps.push({
      name: 'Retinol treatment',
      purpose: 'Stimulates collagen to reduce the appearance of fine lines.',
      instruction: 'Use two to three nights a week and build up slowly.',
    });
  }

  steps.push({
    name: statuses.moisture === 'low' ? 'Ceramide barrier cream' : 'Lightweight night moisturizer',
    purpose:
      statuses.moisture === 'low'
        ? 'Locks in moisture and rebuilds the barrier while you sleep.'
        : 'Keeps hydration steady overnight.',
    instruction: 'Apply a generous layer as the final step of your routine.',
  });

  return steps;
}

function buildAthleteTips(statuses: MetricStatusMap): string[] {
  const tips = [
    'Rinse sweat off within 30 minutes of finishing a workout to prevent breakouts and irritation.',
    'Wear a cap or sunglasses on long runs to protect the delicate skin around your eyes.',
  ];

  if (statuses.moisture === 'low') {
    tips.push('Drink water steadily through the day, since wind and altitude draw moisture from skin.');
  }

  if (statuses.spots === 'moderate') {
    tips.push('Choose a sunscreen with an SPF of 50 or higher on training days to prevent new spots.');
  }

  tips.push('Aim for seven to nine hours of sleep, when skin repairs itself most efficiently.');

  return tips;
}

function buildFocusAreas(statuses: MetricStatusMap): string[] {
  const areas: string[] = [];
  if (statuses.moisture === 'low') areas.push('Hydration');
  if (statuses.texture === 'needs_attention') areas.push('Texture');
  if (statuses.spots === 'moderate') areas.push('Tone');
  if (statuses.wrinkles !== 'good') areas.push('Anti-aging');
  areas.push('Sun protection');
  return areas;
}

export function generateDailyRoutine(analysis: SkinAnalysis): DailyRoutine {
  const statuses = statusMap(analysis);

  return {
    headline: buildHeadline(analysis.skinScore),
    summary: buildSummary(statuses, analysis.skinScore),
    focusAreas: buildFocusAreas(statuses),
    morning: buildMorning(statuses),
    evening: buildEvening(statuses),
    athleteTips: buildAthleteTips(statuses),
  };
}
