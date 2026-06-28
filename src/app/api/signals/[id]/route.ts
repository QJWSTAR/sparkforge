import { NextRequest, NextResponse } from 'next/server'
import { getSignalById } from '@/lib/signals'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const signal = await getSignalById(id)

    if (!signal) {
      return NextResponse.json(
        { success: false, error: 'Signal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: signal,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch signal' },
      { status: 500 }
    )
  }
}