import { getSupabaseAdmin } from '@/lib/supabase';
import { apiSuccess } from '@/lib/api/response';

export async function GET() {
  const supabaseAdmin = await getSupabaseAdmin();

  if (!supabaseAdmin) {
    return apiSuccess({
      totalSignals: 0,
      todaySignals: 0,
      avgScore: 0,
      top10Count: 0,
      totalForgeProjects: 0,
      totalCanvasReports: 0,
      dbAvailable: false,
    });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      { count: totalSignals },
      { data: todayData },
      { data: avgData },
      { count: top10Count },
      { count: totalForgeProjects },
      { count: totalCanvasReports },
    ] = await Promise.all([
      supabaseAdmin.from('Signal').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('Signal').select('id').gte('createdAt', today.toISOString()),
      supabaseAdmin.from('Signal').select('finalScore').not('finalScore', 'is', null),
      supabaseAdmin.from('Signal').select('*', { count: 'exact', head: true }).eq('status', 'TOP10'),
      supabaseAdmin.from('ForgeProject').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('CanvasReport').select('*', { count: 'exact', head: true }),
    ]);

    const todaySignals = todayData?.length || 0;
    const scores = (avgData || []).map((s: { finalScore?: number }) => s.finalScore).filter(Boolean) as number[];
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    return apiSuccess({
      totalSignals: totalSignals || 0,
      todaySignals,
      avgScore,
      top10Count: top10Count || 0,
      totalForgeProjects: totalForgeProjects || 0,
      totalCanvasReports: totalCanvasReports || 0,
      dbAvailable: true,
    });
  } catch (error) {
    console.error('[Stats] Failed to fetch stats:', error);
    return apiSuccess({
      totalSignals: 0,
      todaySignals: 0,
      avgScore: 0,
      top10Count: 0,
      totalForgeProjects: 0,
      totalCanvasReports: 0,
      dbAvailable: false,
    });
  }
}