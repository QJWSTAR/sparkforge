import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { userId, signalId } = await request.json()

  if (!userId || !signalId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId or signalId' },
      { status: 400 }
    )
  }

  try {
    const { error } = await supabaseAdmin
      .from('UserSetting')
      .upsert({
        userId,
        subscribedSignals: supabaseAdmin.rpc('array_append', {
          array: 'subscribedSignals',
          value: signalId,
        }),
      })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to subscribe:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { userId, signalId } = await request.json()

  if (!userId || !signalId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId or signalId' },
      { status: 400 }
    )
  }

  try {
    const { error } = await supabaseAdmin
      .from('UserSetting')
      .upsert({
        userId,
        subscribedSignals: supabaseAdmin.rpc('array_remove', {
          array: 'subscribedSignals',
          value: signalId,
        }),
      })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to unsubscribe:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId' },
      { status: 400 }
    )
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('UserSetting')
      .select('subscribedSignals')
      .eq('userId', userId)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      data: {
        subscribedSignals: data?.subscribedSignals || [],
      },
    })
  } catch (error) {
    console.error('Failed to get subscriptions:', error)
    return NextResponse.json({
      success: true,
      data: { subscribedSignals: [] },
    })
  }
}