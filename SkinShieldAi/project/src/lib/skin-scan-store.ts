import { createClient } from '@supabase/supabase-js';
import type { DailyRoutine, SkinAnalysis } from './skin-analysis-types';

export async function saveSkinScan(analysis: SkinAnalysis, routine: DailyRoutine): Promise<void> {
  const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_ANON_KEY ?? '', {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from('skin_scans').insert({
    skin_score: analysis.skinScore,
    metrics: analysis.metrics,
    routine,
  });

  if (error) {
    throw new Error(`Failed to save skin scan: ${error.message}`);
  }
}
