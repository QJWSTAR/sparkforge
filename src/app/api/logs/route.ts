import { NextRequest, NextResponse } from 'next/server'
import { getLogs } from '@/lib/signals'

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
