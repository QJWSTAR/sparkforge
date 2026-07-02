import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
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

  try {
    const { data, error } = await supabaseAdmin
      .from('ForgeProject')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error) {
    console.error('Failed to fetch forge history:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forge history' },
      { status: 500 }
    )
  }
}