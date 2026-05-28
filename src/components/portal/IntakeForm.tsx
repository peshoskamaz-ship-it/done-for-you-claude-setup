'use client'

import { useState, FormEvent } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { IntakeFormData } from '@/types'

const steps = [
  { title: 'Business Basics', fields: ['businessName', 'businessType', 'targetAudience'] },
  { title: 'Your Challenges', fields: ['mainChallenge', 'currentTools'] },
  { title: 'Goals & Style', fields: ['desiredOutcomes', 'tonePreference'] },
]

const defaultForm: IntakeFormData = {
  businessName: '',
  businessType: '',
  targetAudience: '',
  mainChallenge: '',
  currentTools: '',
  desiredOutcomes: '',
  tonePreference: '',
  package: 'starter',
}

export default function IntakeForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<IntakeFormData>(defaultForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  function update(field: keyof IntakeFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      }
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Intake Submitted!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Your AI is being generated. You&apos;ll receive your deliverables within 5–7 business days.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center gap-2 flex-1">
            <div
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                i <= step
                  ? 'bg-brand-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
            {i < steps.length - 1 && null}
          </div>
        ))}
      </div>
      <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mb-1">
        Step {step + 1} of {steps.length}
      </p>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        {steps[step].title}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {step === 0 && (
          <>
            <Field label="Business Name" required>
              <input
                type="text"
                required
                value={form.businessName}
                onChange={(e) => update('businessName', e.target.value)}
                className={inputClass}
                placeholder="e.g., Bloom Floral Studio"
              />
            </Field>
            <Field label="What type of business do you run?" required>
              <input
                type="text"
                required
                value={form.businessType}
                onChange={(e) => update('businessType', e.target.value)}
                className={inputClass}
                placeholder="e.g., Floral design and event decoration"
              />
            </Field>
            <Field label="Who is your target audience/ideal client?" required>
              <input
                type="text"
                required
                value={form.targetAudience}
                onChange={(e) => update('targetAudience', e.target.value)}
                className={inputClass}
                placeholder="e.g., Brides, event planners, corporate clients"
              />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="What is your biggest business challenge right now?" required>
              <textarea
                required
                rows={3}
                value={form.mainChallenge}
                onChange={(e) => update('mainChallenge', e.target.value)}
                className={inputClass + ' resize-none'}
                placeholder="e.g., Spending too much time responding to the same client questions..."
              />
            </Field>
            <Field label="What tools do you currently use?" required>
              <input
                type="text"
                required
                value={form.currentTools}
                onChange={(e) => update('currentTools', e.target.value)}
                className={inputClass}
                placeholder="e.g., Gmail, Google Docs, Slack, Instagram"
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="What outcomes do you most want from AI?" required>
              <textarea
                required
                rows={3}
                value={form.desiredOutcomes}
                onChange={(e) => update('desiredOutcomes', e.target.value)}
                className={inputClass + ' resize-none'}
                placeholder="e.g., Save 5 hours per week, write better proposals, faster client responses..."
              />
            </Field>
            <Field label="How would you describe your brand tone?" required>
              <select
                required
                value={form.tonePreference}
                onChange={(e) => update('tonePreference', e.target.value)}
                className={inputClass}
              >
                <option value="">Select a tone...</option>
                <option value="Warm and friendly">Warm and friendly</option>
                <option value="Professional and formal">Professional and formal</option>
                <option value="Direct and results-focused">Direct and results-focused</option>
                <option value="Playful and energetic">Playful and energetic</option>
                <option value="Calm and trustworthy">Calm and trustworthy</option>
                <option value="Motivational and inspiring">Motivational and inspiring</option>
              </select>
            </Field>
          </>
        )}

        <div className="flex items-center justify-between pt-4">
          {step > 0 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep((s) => s - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : step < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              'Submit & Generate'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'
