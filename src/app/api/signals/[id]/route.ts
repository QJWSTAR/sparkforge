import { NextRequest, NextResponse } from 'next/server'
import { getSignalById } from '@/lib/signals'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const { signal, dbAvailable } = await getSignalById(id)

    if (!signal) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Signal not found',
          dbStatus: dbAvailable ? 'available' : 'unavailable'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: signal,
      dbStatus: dbAvailable ? 'available' : 'unavailable'
    })

  } catch (error) {
    console.error('[API] Unexpected error in signal detail endpoint:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch signal',
        dbStatus: 'unavailable',
        message: 'An unexpected error occurred, database connection may be unstable',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error') 
          : undefined
      },
      { status: 500 }
    )
  }
}