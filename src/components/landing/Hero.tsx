import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Shield, Clock } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0F0E17] text-white">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange/10 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl animate-pulse-glow" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(rgba(108,99,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          Done-For-You AI Setup for Small Businesses
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6 animate-fade-in-up-delay-1">
          Your Business,{' '}
          <span className="gradient-text">Supercharged</span>
          <br />
          with Claude AI
        </h1>

        <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-400 leading-relaxed mb-12 animate-fade-in-up-delay-2">
          We build custom Claude AI configurations — system prompts, prompt playbooks, and SOPs —
          tailored specifically to your business. Get results from day one.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up-delay-3">
          <Link
            href="#pricing"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-purple hover:bg-purple-dark text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-glow text-lg"
          >
            View Packages
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 text-white font-bold rounded-2xl transition-all duration-300 text-lg"
          >
            Book a Free Call
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
          {[
            { icon: Clock, text: 'Setup in 5–7 days' },
            { icon: Zap, text: '100% custom to your business' },
            { icon: Shield, text: 'Save 5–10 hours/week' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-purple-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Floating stat cards */}
        <div className="mt-20 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: '50+', label: 'Businesses Served' },
            { value: '10hrs', label: 'Saved Per Week' },
            { value: '100%', label: 'Custom Built' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
