'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'

const inputClass = 'w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-orange/60 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all text-sm'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (password === 'admin123') {
        sessionStorage.setItem('admin-auth', 'true')
        router.push('/admin/dashboard')
      } else {
        setError('Invalid password. Demo: admin123')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-DEFAULT/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-DEFAULT to-orange rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-white text-lg">Admin Access</span>
        </Link>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
          <div className="mb-8">
            <div className="inline-flex p-3 bg-orange/10 rounded-2xl mb-4">
              <ShieldCheck className="w-5 h-5 text-orange" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Restricted access — admins only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin password" className={inputClass} />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-purple-DEFAULT to-purple-dark text-white font-bold rounded-2xl transition-all hover:shadow-glow disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Demo: <code className="bg-white/5 px-2 py-0.5 rounded-lg text-gray-400">admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
