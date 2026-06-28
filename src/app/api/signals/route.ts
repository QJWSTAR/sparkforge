import { NextRequest, NextResponse } from 'next/server'
import { getSignals } from '@/lib/signals'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const source = searchParams.get('source') || undefined
  const status = searchParams.get('status') || undefined
  const minScore = Number(searchParams.get('minScore')) || 0
  const sortBy = (searchParams.get('sortBy') as 'hot' | 'score' | 'newest') || 'score'
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 100)
  const offset = Number(searchParams.get('offset')) || 0
  const search = searchParams.get('search') || undefined

  try {
    const { signals, total } = await getSignals({
      source,
      status,
      minScore,
      sortBy,
      limit,
      offset,
      search,
    })

    return NextResponse.json({
      success: true,
      data: signals,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch signals' },
      { status: 500 }
    )
  }
}
