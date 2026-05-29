'use client'

import { useState, FormEvent } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle, Loader2 } from 'lucide-react'
import type { IntakeFormData } from '@/types'

const steps = [
  { title: 'Business Basics', subtitle: 'Tell us about your business' },
  { title: 'Your Challenges', subtitle: 'What are you struggling with?' },
  { title: 'Goals & Style', subtitle: 'What outcomes do you want?' },
]

const defaultForm: IntakeFormData = {
  businessName: '', businessType: '', targetAudience: '',
  mainChallenge: '', currentTools: '', desiredOutcomes: '',
  tonePreference: '', package: 'starter',
}

const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-purple-500/60 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm'

export default function IntakeForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<IntakeFormData>(defaultForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  function update(field: keyof IntakeFormData, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (step < steps.length - 1) { setStep(s => s + 1); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('success')
      else setStatus('idle')
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="inline-flex p-4 bg-green-500/10 rounded-2xl mb-4">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Intake Submitted!</h3>
        <p className="text-gray-400 text-sm">Your custom AI is being generated. Deliverables arrive in 5–7 business days.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-purple' : 'bg-white/10'}`} />
        ))}
      </div>
      <p className="text-xs text-purple-400 font-semibold mb-0.5">Step {step + 1} of {steps.length}</p>
      <h3 className="text-base font-bold text-white mb-1">{steps[step].title}</h3>
      <p className="text-xs text-gray-500 mb-5">{steps[step].subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 0 && <>
          <input required type="text" placeholder="Business Name" value={form.businessName} onChange={e => update('businessName', e.target.value)} className={inputClass} />
          <input required type="text" placeholder="Type of business (e.g. floral studio, coaching)" value={form.businessType} onChange={e => update('businessType', e.target.value)} className={inputClass} />
          <input required type="text" placeholder="Target audience / ideal client" value={form.targetAudience} onChange={e => update('targetAudience', e.target.value)} className={inputClass} />
        </>}
        {step === 1 && <>
          <textarea required rows={3} placeholder="Your biggest business challenge right now..." value={form.mainChallenge} onChange={e => update('mainChallenge', e.target.value)} className={inputClass + ' resize-none'} />
          <input required type="text" placeholder="Tools you currently use (Gmail, Notion, etc.)" value={form.currentTools} onChange={e => update('currentTools', e.target.value)} className={inputClass} />
        </>}
        {step === 2 && <>
          <textarea required rows={3} placeholder="What outcomes do you want from AI?" value={form.desiredOutcomes} onChange={e => update('desiredOutcomes', e.target.value)} className={inputClass + ' resize-none'} />
          <select required value={form.tonePreference} onChange={e => update('tonePreference', e.target.value)} className={inputClass + ' appearance-none'}>
            <option value="" className="bg-gray-900">Brand tone...</option>
            <option value="Warm and friendly" className="bg-gray-900">Warm and friendly</option>
            <option value="Professional and formal" className="bg-gray-900">Professional and formal</option>
            <option value="Direct and results-focused" className="bg-gray-900">Direct and results-focused</option>
            <option value="Playful and energetic" className="bg-gray-900">Playful and energetic</option>
            <option value="Calm and trustworthy" className="bg-gray-900">Calm and trustworthy</option>
            <option value="Motivational and inspiring" className="bg-gray-900">Motivational and inspiring</option>
          </select>
        </>}

        <div className="flex items-center justify-between pt-2">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}
          <button type="submit" disabled={status === 'loading'} className="flex items-center gap-1.5 px-5 py-2.5 bg-purple hover:bg-purple-dark text-white text-sm font-bold rounded-xl transition-all hover:shadow-glow-sm disabled:opacity-50">
            {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> :
             step < steps.length - 1 ? <>Next <ChevronRight className="w-4 h-4" /></> :
             'Submit & Generate'}
          </button>
        </div>
      </form>
    </div>
  )
}
