import { NextRequest, NextResponse } from 'next/server'
import { scoreSignal } from '@/lib/scoring'
import { supabaseAdmin } from '@/lib/supabase'
import { addLogEntry } from '@/lib/signals'

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  
  if (apiKey !== process.env.CRON_API_KEY && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const { limit = 10 } = await request.json()

    const { data: signals, error } = await supabaseAdmin
      .from('Signal')
      .select('*')
      .eq('status', 'PENDING')
      .order('hotScore', { ascending: false })
      .limit(limit)

    if (error) {
      throw error
    }

    if (!signals || signals.length === 0) {
      return NextResponse.json({
        success: true,
        data: { scored: 0, total: 0 },
        message: 'No pending signals to score',
      })
    }

    let scoredCount = 0
    const results: Array<{ id: string; score: number }> = []

    for (const signal of signals) {
      try {
        const scoreResult = await scoreSignal({
          title: signal.title,
          description: signal.description || '',
          url: signal.url,
          tags: signal.tags,
          source: signal.source,
          hotScore: signal.hotScore,
        })

        await supabaseAdmin
          .from('Signal')
          .update({
            noveltyScore: scoreResult.noveltyScore,
            businessScore: scoreResult.businessScore,
            localScore: scoreResult.localScore,
            finalScore: scoreResult.finalScore,
            scoreVersion: scoreResult.version,
            status: 'SCORED',
            updatedAt: new Date().toISOString(),
          })
          .eq('id', signal.id)

        results.push({ id: signal.id, score: scoreResult.finalScore })
        scoredCount++
      } catch (err) {
        console.error(`Failed to score signal ${signal.id}:`, err)
      }
    }

    await addLogEntry({
      type: 'SYSTEM',
      title: `AI 批量评分完成`,
      content: `已完成 ${scoredCount}/${signals.length} 条信号的 AI 评分`,
      metadata: { results },
    })

    return NextResponse.json({
      success: true,
      data: {
        scored: scoredCount,
        total: signals.length,
        results,
      },
      message: `已完成 ${scoredCount} 条信号的 AI 评分`,
    })
  } catch (error) {
    console.error('Batch scoring error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to batch score signals' },
      { status: 500 }
    )
  }
}