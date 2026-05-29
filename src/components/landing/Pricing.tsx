import Link from 'next/link'
import { CheckCircle, Zap, ArrowRight } from 'lucide-react'

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 800,
    description: 'Perfect for solopreneurs ready to leverage AI in their daily work.',
    features: ['1 Custom System Prompt', '10-prompt Playbook', 'Basic AI Usage SOP', '30-min onboarding call', '2 weeks email support', 'PDF delivery'],
    highlighted: false,
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1500,
    description: 'For growing businesses that need a complete AI toolkit.',
    features: ['3 Custom System Prompts', '30-prompt Playbook', 'Full workflow SOP (3 processes)', '60-min strategy session', '45 days email support', 'Client portal access', 'One revision round', 'Video walkthrough'],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2500,
    description: 'Complete AI transformation for teams and complex operations.',
    features: ['Unlimited System Prompts', '50+ prompt Playbook', 'Full company SOP overhaul', '90-min deep-dive session', '90 days priority support', 'Team onboarding session', 'Two revision rounds', 'Custom AI workflow design', 'Monthly check-in call'],
    highlighted: false,
    cta: 'Get Started',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <p className="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Simple,{' '}
            <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            One-time investment. Lifetime of efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-center">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? 'bg-purple shadow-glow-lg scale-105 border-0'
                  : 'bg-white/[0.03] border border-white/10 hover:border-purple-500/30 hover:shadow-card-hover hover:-translate-y-1'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-orange rounded-full text-navy text-xs font-black">
                  <Zap className="w-3 h-3" />
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-lg font-bold mb-1 ${pkg.highlighted ? 'text-white' : 'text-gray-300'}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${pkg.highlighted ? 'text-purple-100' : 'text-gray-500'}`}>
                  {pkg.description}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-6xl font-black leading-none text-white">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className={`text-sm mb-2 ${pkg.highlighted ? 'text-purple-200' : 'text-gray-500'}`}>
                    one-time
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-white/70' : 'text-purple-400'}`} />
                    <span className={pkg.highlighted ? 'text-purple-50' : 'text-gray-400'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  pkg.highlighted
                    ? 'bg-white text-purple hover:bg-gray-100'
                    : 'bg-purple hover:bg-purple-dark text-white hover:shadow-glow-sm'
                }`}
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-gray-500">
          Not sure which plan?{' '}
          <Link href="#contact" className="text-purple-400 hover:text-purple-300 font-medium">
            Book a free 20-min discovery call →
          </Link>
        </p>
      </div>
    </section>
  )
}
