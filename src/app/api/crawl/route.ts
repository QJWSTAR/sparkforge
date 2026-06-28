import { NextRequest, NextResponse } from 'next/server'
import { crawlAllSources } from '@/lib/signals'

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  
  if (apiKey !== process.env.CRON_API_KEY && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const result = await crawlAllSources()

    return NextResponse.json({
      success: true,
      data: result,
      message: `抓取完成：${result.total} 条新信号`,
    })
  } catch (error) {
    console.error('Crawl error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to crawl signals' },
      { status: 500 }
    )
  }
}
