'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, Lock, ArrowRight } from 'lucide-react'

const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-purple-DEFAULT/60 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-DEFAULT/20 transition-all text-sm'

export default function PortalLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (password === 'client123') {
        sessionStorage.setItem('portal-auth', 'true')
        router.push('/portal/dashboard')
      } else {
        setError('Invalid credentials. Demo password: client123')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-DEFAULT/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 bg-purple-DEFAULT rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-white text-lg">Done-For-You Claude</span>
        </Link>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <div className="mb-8">
            <div className="inline-flex p-3 bg-purple-DEFAULT/10 rounded-2xl mb-4">
              <Lock className="w-5 h-5 text-purple-DEFAULT" />
            </div>
            <h1 className="text-2xl font-black text-white">Client Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to access your deliverables</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className={inputClass} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={inputClass} />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-purple-DEFAULT hover:bg-purple-dark text-white font-bold rounded-2xl transition-all hover:shadow-glow disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Demo: <code className="bg-white/5 px-2 py-0.5 rounded-lg text-gray-400">client123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
