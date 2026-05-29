'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: "What exactly is a Claude \"system prompt\"?",
    a: "A system prompt is a set of instructions given to Claude before any conversation starts. It defines the AI's personality, expertise, boundaries, and behavior. We craft one deeply tailored to your specific business — so Claude responds like a knowledgeable team member who knows your brand inside out.",
  },
  {
    q: 'How long does the setup process take?',
    a: 'From the moment you submit your intake form, we deliver your custom AI package within 5–7 business days. Rush delivery (2–3 days) is available for an additional fee. Enterprise clients get a dedicated timeline during the strategy session.',
  },
  {
    q: 'Do I need any technical knowledge to use this?',
    a: "Zero. We build everything for you and explain exactly how to use it in plain English. If you can copy and paste text, you can use your custom Claude setup. We also include a video walkthrough with Pro and Enterprise packages.",
  },
  {
    q: "What if I'm not happy with the deliverables?",
    a: "Pro packages include one full revision round and Enterprise includes two. For Starter, we offer a 50% credit toward a revision if you're not satisfied. We're committed to getting it right for your specific business.",
  },
  {
    q: 'Do I need a Claude/Anthropic subscription?',
    a: "Yes — you'll need access to Claude.ai (about $20/month for Pro) or the Anthropic API if you're embedding it in tools. Your setup works with both. We recommend the Claude.ai Pro plan for most small business owners.",
  },
  {
    q: 'Can I use this for my whole team?',
    a: "Absolutely. Enterprise includes a team onboarding session where we walk your entire team through using the prompts and SOPs. The Prompt Playbook is designed to be shared and used by multiple people consistently.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-32 bg-navy relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <p className="text-purple-DEFAULT font-semibold text-sm tracking-widest uppercase mb-4">FAQ</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Questions?{' '}
            <span className="gradient-text">We have answers.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i
                  ? 'border-purple-DEFAULT/50 bg-purple-DEFAULT/5'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-semibold text-[15px] ${open === i ? 'text-white' : 'text-gray-200'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  open === i ? 'bg-purple-DEFAULT text-white' : 'bg-white/5 text-gray-400'
                }`}>
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
