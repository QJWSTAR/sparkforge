import { NextRequest, NextResponse } from 'next/server'
import { getLogs } from '@/lib/signals'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 100)
  const type = searchParams.get('type') || undefined

  try {
    const logs = await getLogs(limit, type)

    return NextResponse.json({
      success: true,
      data: logs,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Token 认证
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseAdmin = await getSupabaseAdmin()
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 500 })
  }

  const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = user.id

  const { title, content } = await request.json()

  if (!title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 })
  }

  try {
    const { data: log, error: insertError } = await supabaseAdmin
      .from('LogEntry')
      .insert({
        id: crypto.randomUUID(),
        userId,
        type: 'SYSTEM',
        title,
        content: content || null,
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({
      success: true,
      data: log,
    })
  } catch (error) {
    console.error('Failed to create log:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create log' },
      { status: 500 }
    )
  }
}
