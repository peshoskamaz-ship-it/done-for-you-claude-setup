import { NextRequest, NextResponse } from 'next/server'
import { updateDeliverableStatus } from '@/lib/data'

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    if (!id || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
    await updateDeliverableStatus(id, status)
    console.log(`[Admin] Deliverable ${id} marked as ${status}`)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
