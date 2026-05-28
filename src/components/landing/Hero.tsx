import Link from 'next/link'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-20 pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-brand-950 dark:via-gray-950 dark:to-purple-950/20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          AI-Powered Business Systems for Small Business Owners
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          Your Business,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">
            Supercharged
          </span>{' '}
          with Claude AI
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
          We build custom Claude AI configurations — system prompts, prompt playbooks, and SOPs —
          tailored specifically to your business. Skip the learning curve. Get results from day one.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-600/30 text-lg"
          >
            View Packages
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-lg"
          >
            Book a Free Call
          </Link>
        </div>

        {/* Social proof bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-500" />
            <span>Setup in 5–7 days</span>
          </div>
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-500" />
            <span>100% custom to your business</span>
          </div>
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-500" />
            <span>Save 5–10 hours per week</span>
          </div>
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-500" />
            <span>50+ businesses served</span>
          </div>
        </div>
      </div>
    </section>
  )
}
