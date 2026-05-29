'use client'

import { useState, FormEvent } from 'react'
import { Send, CheckCircle, Mail, Building, User, MessageSquare } from 'lucide-react'

const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-purple-DEFAULT/60 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-DEFAULT/20 transition-all text-sm'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '', package: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="contact" className="py-32 bg-[#0A0919]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="inline-flex p-5 bg-green-500/10 rounded-3xl mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h3 className="text-3xl font-black text-white mb-3">Message Received!</h3>
          <p className="text-gray-400 text-lg">We&apos;ll be in touch within 24 hours to schedule your free discovery call.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-32 bg-[#0A0919] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-DEFAULT/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-purple-DEFAULT font-semibold text-sm tracking-widest uppercase mb-4">Get Started</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Let&apos;s build your{' '}
            <span className="gradient-text">AI setup</span>
          </h2>
          <p className="text-xl text-gray-400">Fill out the form and we&apos;ll schedule your free 20-minute discovery call.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
              <input type="text" required placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputClass + ' pl-10'} />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
              <input type="email" required placeholder="Email Address" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className={inputClass + ' pl-10'} />
            </div>
          </div>

          <div className="relative mb-4">
            <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
            <input type="text" required placeholder="Business Name" value={form.business} onChange={e => setForm(f => ({...f, business: e.target.value}))} className={inputClass + ' pl-10'} />
          </div>

          <div className="mb-4">
            <select value={form.package} onChange={e => setForm(f => ({...f, package: e.target.value}))} className={inputClass + ' appearance-none'}>
              <option value="" className="bg-gray-900">Package Interest (optional)</option>
              <option value="starter" className="bg-gray-900">Starter — $800</option>
              <option value="pro" className="bg-gray-900">Pro — $1,500</option>
              <option value="enterprise" className="bg-gray-900">Enterprise — $2,500</option>
            </select>
          </div>

          <div className="relative mb-8">
            <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
            <textarea required rows={4} placeholder="What's your biggest challenge? What would you love AI to help with?" value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} className={inputClass + ' pl-10 resize-none'} />
          </div>

          {status === 'error' && <p className="text-red-400 text-sm mb-4">Something went wrong. Please try again.</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-4 bg-purple-DEFAULT hover:bg-purple-dark text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-glow disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
