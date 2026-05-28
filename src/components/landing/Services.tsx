import { Bot, BookOpen, FileText, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'Custom System Prompts',
    description:
      'A precisely engineered Claude personality built for your brand, industry, and goals. Your AI will sound like you — and know your business inside out.',
    benefits: [
      'Trained on your tone and voice',
      'Industry-specific knowledge built in',
      'Handles your most common tasks',
      'Immediately ready to deploy',
    ],
    color: 'brand',
  },
  {
    icon: BookOpen,
    title: 'Prompt Playbooks',
    description:
      'A curated library of ready-to-use prompts for every scenario in your business. Stop starting from scratch — just copy, paste, and customize.',
    benefits: [
      '20–50 business-specific prompts',
      'Organized by workflow stage',
      'Tested and refined for results',
      'Includes examples and variations',
    ],
    color: 'purple',
  },
  {
    icon: FileText,
    title: 'AI-Integrated SOPs',
    description:
      'Step-by-step operating procedures that embed Claude into your daily workflows. Turn repetitive tasks into efficient, AI-assisted processes.',
    benefits: [
      'Maps your current processes',
      'Identifies AI automation points',
      'Reduces errors and onboarding time',
      'Scales with your team',
    ],
    color: 'green',
  },
]

const colorMap: Record<string, string> = {
  brand: 'bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What You Get
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Three core deliverables that turn Claude from a generic tool into your dedicated
            business AI assistant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-xl mb-6 ${colorMap[service.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
