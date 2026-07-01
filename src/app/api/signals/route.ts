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
    const { signals, total, fromCache, dbAvailable, error } = await getSignals({
      source,
      status,
      minScore,
      sortBy,
      limit,
      offset,
      search,
    })

    const response: Record<string, any> = {
      success: true,
      data: signals,
      total,
      limit,
      offset,
    }

    if (!dbAvailable) {
      response.dbStatus = 'unavailable'
      response.message = 'Database is currently unavailable, showing cached data'
      response.fromCache = fromCache
    } else {
      response.dbStatus = 'available'
    }

    if (error) {
      response.warnings = [{ message: error }]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('[API] Unexpected error in signals endpoint:', error)
    
    return NextResponse.json(
      {
        success: false,
        data: [],
        total: 0,
        limit,
        offset,
        dbStatus: 'unavailable',
        message: 'An unexpected error occurred, database connection may be unstable',
        error: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error') 
          : 'Internal server error'
      },
      { status: 500 }
    )
  }
}