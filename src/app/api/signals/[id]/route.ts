import { NextRequest, NextResponse } from 'next/server'
import { getSignalById } from '@/lib/signals'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const { signal, dbAvailable } = await getSignalById(id)

    if (!signal) {
      return NextResponse.json(
        { success: false, error: '信号不存在', data: null },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: signal,
      dbAvailable,
    })
  } catch (error) {
    console.error('[API] Unexpected error in signal detail endpoint:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        data: null,
      },
      { status: 500 }
    )
  }
}