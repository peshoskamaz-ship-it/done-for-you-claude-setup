import { Bot, BookOpen, FileText, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'Custom System Prompts',
    description: 'A precisely engineered Claude personality built for your brand, industry, and goals. Your AI will sound like you — and know your business inside out.',
    benefits: ['Trained on your tone and voice', 'Industry-specific knowledge built in', 'Handles your most common tasks', 'Immediately ready to deploy'],
    gradient: 'from-purple-500/20 to-purple-900/5',
    iconBg: 'bg-purple-500/20 text-purple-400',
    tag: '01',
  },
  {
    icon: BookOpen,
    title: 'Prompt Playbooks',
    description: 'A curated library of ready-to-use prompts for every scenario in your business. Stop starting from scratch — just copy, paste, and customize.',
    benefits: ['20–50 business-specific prompts', 'Organized by workflow stage', 'Tested and refined for results', 'Includes examples and variations'],
    gradient: 'from-orange/20 to-orange/5',
    iconBg: 'bg-orange/20 text-orange',
    tag: '02',
  },
  {
    icon: FileText,
    title: 'AI-Integrated SOPs',
    description: 'Step-by-step operating procedures that embed Claude into your daily workflows. Turn repetitive tasks into efficient, AI-assisted processes.',
    benefits: ['Maps your current processes', 'Identifies AI automation points', 'Reduces errors and onboarding time', 'Scales with your team'],
    gradient: 'from-blue-500/20 to-blue-900/5',
    iconBg: 'bg-blue-500/20 text-blue-400',
    tag: '03',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <p className="text-purple-400 font-semibold text-sm tracking-widest uppercase mb-4">What You Get</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Three deliverables that{' '}
            <span className="gradient-text">transform your workflow</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Turn Claude from a generic tool into your dedicated business AI assistant.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/40 rounded-3xl p-8 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                {/* Tag */}
                <div className="absolute top-6 right-6 text-xs font-bold text-white/20">{service.tag}</div>

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-2xl mb-6 ${service.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm">{service.description}</p>

                <ul className="space-y-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {b}
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
