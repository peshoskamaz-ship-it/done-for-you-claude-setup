import { NextRequest, NextResponse } from 'next/server'
import type { ContactFormData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ContactFormData
    console.log('[Contact] New inquiry:', data)
    console.log(`[Contact] Mock email: Follow-up sent to ${data.email}`)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
