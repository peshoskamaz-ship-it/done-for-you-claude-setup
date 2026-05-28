import { NextRequest, NextResponse } from 'next/server'
import { generateSystemPrompt, generateSOP } from '@/lib/anthropic'
import { saveClient, saveDeliverable, getClients } from '@/lib/data'
import type { IntakeFormData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const intake = (await request.json()) as IntakeFormData

    const [systemPrompt, sop] = await Promise.all([
      generateSystemPrompt(intake),
      generateSOP(intake),
    ])

    const clients = await getClients()
    const clientId = `client-${Date.now()}`

    await saveClient({
      id: clientId,
      name: intake.businessName,
      email: `demo@${intake.businessName.toLowerCase().replace(/\s+/g, '')}.com`,
      company: intake.businessName,
      package: intake.package,
      status: 'review',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      intake,
    })

    await saveDeliverable({
      id: `del-sp-${Date.now()}`,
      clientId,
      type: 'system-prompt',
      title: `Custom System Prompt for ${intake.businessName}`,
      content: systemPrompt,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    await saveDeliverable({
      id: `del-sop-${Date.now() + 1}`,
      clientId,
      type: 'sop',
      title: `AI Usage SOP for ${intake.businessName}`,
      content: sop,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    console.log(`[Agent] Generated deliverables for ${intake.businessName}`)
    console.log(`[Agent] Mock email: Welcome email sent to ${intake.businessName}`)

    return NextResponse.json({ success: true, clientId, deliverableCount: clients.length + 2 })
  } catch (error) {
    console.error('[generate-prompt] Error:', error)
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 })
  }
}
