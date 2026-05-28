import { Star } from 'lucide-react'
import type { Testimonial } from '@/types'

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Owner',
    company: 'Bloom Floral Studio',
    content:
      'I went from spending 3 hours a day on client emails to under 45 minutes. The custom system prompt sounds exactly like me — my clients had no idea I was using AI. Best investment I made this year.',
    avatar: 'SJ',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Rivera',
    role: 'Business Coach',
    company: 'Rivera Business Coaching',
    content:
      'The prompt playbook alone is worth 10x the price. I have a ready-to-go prompt for literally every client scenario. My content calendar is now done in 2 hours instead of a full day.',
    avatar: 'MR',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Founder',
    company: 'Clean Slate Accounting',
    content:
      'I was skeptical AI could explain accounting concepts in a friendly way. They proved me wrong. My client education emails are now so clear that I get compliments on them weekly.',
    avatar: 'PP',
    rating: 5,
  },
  {
    id: '4',
    name: 'James Okonkwo',
    role: 'CEO',
    company: 'Okonkwo Legal Services',
    content:
      'The SOP integration was game-changing for onboarding my new associate. Everything is documented, AI-assisted, and consistent. It saved us weeks of training time.',
    avatar: 'JO',
    rating: 5,
  },
]

const avatarColors = [
  'bg-brand-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-orange-500',
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real results from real small business owners who took the leap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <blockquote className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${avatarColors[i % avatarColors.length]}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
