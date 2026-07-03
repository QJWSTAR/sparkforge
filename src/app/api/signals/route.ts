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
      response.message = '数据库暂时不可用，正在显示缓存数据'
      response.fromCache = fromCache
    } else {
      response.dbStatus = 'available'
    }

    if (error) {
      response.warnings = [{ message: error }]
    }

    // 如果数据库不可用且没有缓存数据，返回 503 而非 200
    if (!dbAvailable && (!signals || signals.length === 0)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          total: 0,
          limit,
          offset,
          dbStatus: 'unavailable',
          error: '数据库不可用且无缓存数据可用',
        },
        { status: 503 }
      )
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
        message: '发生未知错误，数据库连接可能不稳定',
        error: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : '未知错误') 
          : '服务器暂时开小差，请稍后重试'
      },
      { status: 500 }
    )
  }
}