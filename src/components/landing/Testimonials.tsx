import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Owner',
    company: 'Bloom Floral Studio',
    content: 'I went from spending 3 hours a day on client emails to under 45 minutes. The custom system prompt sounds exactly like me — my clients had no idea I was using AI. Best investment I made this year.',
    avatar: 'SJ',
    rating: 5,
    color: 'from-purple-500 to-blue-600',
  },
  {
    name: 'Marcus Rivera',
    role: 'Business Coach',
    company: 'Rivera Business Coaching',
    content: 'The prompt playbook alone is worth 10x the price. I have a ready-to-go prompt for literally every client scenario. My content calendar is now done in 2 hours instead of a full day.',
    avatar: 'MR',
    rating: 5,
    color: 'from-orange to-pink-600',
  },
  {
    name: 'Priya Patel',
    role: 'Founder',
    company: 'Clean Slate Accounting',
    content: 'I was skeptical AI could explain accounting concepts in a friendly way. They proved me wrong. My client education emails are now so clear that I get compliments on them weekly.',
    avatar: 'PP',
    rating: 5,
    color: 'from-green-500 to-teal-600',
  },
  {
    name: 'James Okonkwo',
    role: 'CEO',
    company: 'Okonkwo Legal Services',
    content: 'The SOP integration was game-changing for onboarding my new associate. Everything is documented, AI-assisted, and consistent. It saved us weeks of training time.',
    avatar: 'JO',
    rating: 5,
    color: 'from-blue-500 to-purple-600',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-[#0A0919] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-DEFAULT/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <p className="text-purple-DEFAULT font-semibold text-sm tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Real results from{' '}
            <span className="gradient-text">real businesses</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">Small business owners who took the leap — and never looked back.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-DEFAULT/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <Quote className="w-8 h-8 text-purple-DEFAULT/40 mb-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                ))}
              </div>
              <blockquote className="text-gray-300 leading-relaxed mb-8 text-[15px]">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
