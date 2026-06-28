import { NextRequest, NextResponse } from 'next/server'
import { scoreSignal } from '@/lib/scoring'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { signalId } = await request.json()

    if (!signalId) {
      return NextResponse.json(
        { success: false, error: 'signalId is required' },
        { status: 400 }
      )
    }

    const { data: signal, error: fetchError } = await supabaseAdmin
      .from('Signal')
      .select('*')
      .eq('id', signalId)
      .single()

    if (fetchError || !signal) {
      return NextResponse.json(
        { success: false, error: 'Signal not found' },
        { status: 404 }
      )
    }

    const scoreResult = await scoreSignal({
      title: signal.title,
      description: signal.description || '',
      url: signal.url,
      tags: signal.tags,
      source: signal.source,
      hotScore: signal.hotScore,
    })

    const { error: updateError } = await supabaseAdmin
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
      .eq('id', signalId)

    if (updateError) {
      console.error('Failed to update signal score:', updateError)
    }

    return NextResponse.json({
      success: true,
      data: scoreResult,
    })
  } catch (error) {
    console.error('Scoring API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to score signal' },
      { status: 500 }
    )
  }
}
