import { NextRequest, NextResponse } from 'next/server'
import { getSupabase, getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { userId, signalId } = await request.json()

  if (!userId || !signalId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId or signalId' },
      { status: 400 }
    )
  }

  const supabaseAdmin = await getSupabaseAdmin()
  if (!supabaseAdmin) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('UserSetting')
      .select('subscribedSignals')
      .eq('userId', userId)
      .single()

    const currentSubscriptions = existing?.subscribedSignals || []
    if (!currentSubscriptions.includes(signalId)) {
      currentSubscriptions.push(signalId)
    }

    const { error } = await supabaseAdmin
      .from('UserSetting')
      .upsert({
        userId,
        subscribedSignals: currentSubscriptions,
      })

    if (error) {
      throw error
    }

    return NextResponse.json({ 
      success: true,
      data: { subscribedSignals: currentSubscriptions }
    })
  } catch (error) {
    console.error('Failed to subscribe:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { userId, signalId } = await request.json()

  if (!userId || !signalId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId or signalId' },
      { status: 400 }
    )
  }

  const supabaseAdmin = await getSupabaseAdmin()
  if (!supabaseAdmin) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('UserSetting')
      .select('subscribedSignals')
      .eq('userId', userId)
      .single()

    const currentSubscriptions = (existing?.subscribedSignals || []) as string[]
    const updatedSubscriptions = currentSubscriptions.filter((id: string) => id !== signalId)

    const { error } = await supabaseAdmin
      .from('UserSetting')
      .upsert({
        userId,
        subscribedSignals: updatedSubscriptions,
      })

    if (error) {
      throw error
    }

    return NextResponse.json({ 
      success: true,
      data: { subscribedSignals: updatedSubscriptions }
    })
  } catch (error) {
    console.error('Failed to unsubscribe:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const token = authHeader.split(' ')[1]
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'Missing userId' },
      { status: 400 }
    )
  }

  const supabaseAdmin = await getSupabaseAdmin()
  if (!supabaseAdmin) {
    return NextResponse.json(
      { success: false, error: 'Database unavailable' },
      { status: 500 }
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
    return NextResponse.json(
      { success: false, error: 'Failed to get subscriptions' },
      { status: 500 }
    )
  }
}