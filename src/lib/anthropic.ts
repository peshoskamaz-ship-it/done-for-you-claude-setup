import Anthropic from '@anthropic-ai/sdk'
import type { IntakeFormData } from '@/types'

let client: Anthropic | null = null

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return client
}

export async function generateSystemPrompt(intake: IntakeFormData): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return getMockSystemPrompt(intake)
  }

  const anthropic = getClient()

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: `You are an expert AI consultant creating a custom Claude system prompt for a small business owner.

Business Information:
- Business Name: ${intake.businessName}
- Business Type: ${intake.businessType}
- Target Audience: ${intake.targetAudience}
- Main Challenge: ${intake.mainChallenge}
- Current Tools: ${intake.currentTools}
- Desired Outcomes: ${intake.desiredOutcomes}
- Tone Preference: ${intake.tonePreference}
- Package: ${intake.package}

Create a comprehensive, ready-to-use system prompt that:
1. Defines a clear AI persona aligned with their brand and tone
2. Includes specific behavioral guidelines for their business context
3. Addresses their main challenge directly
4. Incorporates their desired outcomes
5. Uses concrete examples relevant to their industry

Format it professionally with clear sections. Make it immediately usable.`,
      },
    ],
  })

  const content = message.content[0]
  return content.type === 'text' ? content.text : getMockSystemPrompt(intake)
}

export async function generateSOP(intake: IntakeFormData): Promise<string> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return getMockSOP(intake)
  }

  const anthropic = getClient()

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `Create a Standard Operating Procedure (SOP) for using Claude AI in their daily business workflow.

Business: ${intake.businessName} (${intake.businessType})
Challenge: ${intake.mainChallenge}
Goals: ${intake.desiredOutcomes}
Tone: ${intake.tonePreference}

Create a practical SOP with:
1. Daily workflow integration steps
2. 3-5 ready-to-use Claude prompts specific to their business
3. Best practices for their industry
4. A weekly AI usage checklist

Make it actionable and specific to their business type.`,
      },
    ],
  })

  const content = message.content[0]
  return content.type === 'text' ? content.text : getMockSOP(intake)
}

function getMockSystemPrompt(intake: IntakeFormData): string {
  return `# Custom AI System Prompt for ${intake.businessName}

You are a professional AI assistant for ${intake.businessName}, a ${intake.businessType}.

## Your Identity
You represent ${intake.businessName} with a ${intake.tonePreference} tone. You are knowledgeable, helpful, and always focused on serving ${intake.targetAudience}.

## Core Responsibilities
- Address the primary challenge: ${intake.mainChallenge}
- Always align responses with the goal of: ${intake.desiredOutcomes}
- Maintain consistency with existing tools: ${intake.currentTools}

## Behavioral Guidelines
1. Always greet clients warmly and professionally
2. Ask clarifying questions before providing solutions
3. Offer specific, actionable advice tailored to ${intake.businessType}
4. Keep responses concise but comprehensive
5. End every interaction with a clear next step

## Tone & Voice
- Style: ${intake.tonePreference}
- Audience: ${intake.targetAudience}
- Focus: Solutions-oriented, results-driven

## Never Do
- Provide information outside your area of expertise
- Make promises you cannot keep
- Use jargon unfamiliar to your audience
- Give generic, one-size-fits-all responses

Always remember: every interaction is an opportunity to demonstrate the value of ${intake.businessName}.`
}

function getMockSOP(intake: IntakeFormData): string {
  return `# AI Usage SOP for ${intake.businessName}

## Overview
This Standard Operating Procedure outlines how to integrate Claude AI into your daily ${intake.businessType} workflow.

## Daily Workflow Integration

### Morning Routine (15 mins)
1. Review pending client communications
2. Use Claude to draft responses using your custom system prompt
3. Personalize and send

### Client Communication Prompts

**Prompt 1: New Inquiry Response**
"Using the ${intake.businessName} system prompt, respond to this new inquiry: [paste inquiry]. Keep it ${intake.tonePreference} and end with a clear next step."

**Prompt 2: Follow-Up Message**
"Write a follow-up message to [client name] who we spoke with [X days ago] about [topic]. Reference our previous conversation and offer a clear next step."

**Prompt 3: Proposal Draft**
"Create a professional proposal for [client name] for [service/product]. Include an overview, what's included, timeline, and next steps."

## Weekly Checklist
- [ ] Review and update system prompt if needed
- [ ] Document new use cases that worked well
- [ ] Create templates for repeated requests
- [ ] Measure time saved vs. previous week

## Best Practices for ${intake.businessType}
1. Always review AI output before sending
2. Personalize with specific client details
3. Keep a library of your best prompts
4. Track which prompts get the best client responses`
}
