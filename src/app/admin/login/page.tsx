'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ShieldCheck } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin123')) {
      sessionStorage.setItem('admin-auth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password. Try: admin123')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-8">
        <Sparkles className="w-5 h-5 text-brand-500" />
        Done-For-You Claude
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <ShieldCheck className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Access</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Sign in to manage clients and deliverables
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          )}

          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo password: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">admin123</code>
        </p>
      </div>
    </div>
  )
}
