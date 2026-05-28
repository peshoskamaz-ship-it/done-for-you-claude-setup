import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import type { Package } from '@/types'

const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 800,
    description: 'Perfect for solopreneurs ready to leverage AI in their daily work.',
    features: [
      '1 Custom System Prompt',
      '10-prompt Playbook',
      'Basic AI Usage SOP',
      '30-min onboarding call',
      '2 weeks of email support',
      'PDF delivery',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1500,
    description: 'For growing businesses that need a complete AI toolkit.',
    features: [
      '3 Custom System Prompts',
      '30-prompt Playbook',
      'Full workflow SOP (3 processes)',
      '60-min strategy session',
      '45 days of email support',
      'Client portal access',
      'One revision round',
      'Video walkthrough',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2500,
    description: 'Complete AI transformation for teams and complex operations.',
    features: [
      'Unlimited System Prompts',
      '50+ prompt Playbook',
      'Full company SOP overhaul',
      '90-min deep-dive strategy session',
      '90 days of priority support',
      'Team onboarding session',
      'Two revision rounds',
      'Custom AI workflow design',
      'Monthly check-in call',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            One-time investment. Lifetime of efficiency. Choose the package that fits your stage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-8 ${
                pkg.highlighted
                  ? 'bg-brand-600 text-white shadow-2xl shadow-brand-600/30 relative'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    pkg.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    pkg.highlighted ? 'text-brand-100' : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {pkg.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-bold ${
                      pkg.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span
                    className={`text-sm ${
                      pkg.highlighted ? 'text-brand-200' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    one-time
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        pkg.highlighted ? 'text-brand-200' : 'text-brand-500'
                      }`}
                    />
                    <span
                      className={
                        pkg.highlighted ? 'text-brand-50' : 'text-gray-600 dark:text-gray-300'
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`#contact?package=${pkg.id}`}
                className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  pkg.highlighted
                    ? 'bg-white text-brand-600 hover:bg-brand-50'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          Not sure which package is right for you?{' '}
          <Link href="#contact" className="text-brand-600 hover:underline font-medium">
            Book a free 20-minute discovery call
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
