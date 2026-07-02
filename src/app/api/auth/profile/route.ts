import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabaseAdmin = await getSupabaseAdmin()
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }

  const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name } = await request.json()

  const { error: insertError } = await supabaseAdmin
    .from('profiles')
    .upsert({ id: user.id, email: user.email, name: name || null }, { onConflict: 'id' })

  if (insertError) {
    console.error('[API] Failed to upsert profile:', insertError)
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}