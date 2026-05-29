import Link from 'next/link'
import { Sparkles, Twitter, Linkedin, Github } from 'lucide-react'
import Hero from '@/components/landing/Hero'
import Services from '@/components/landing/Services'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import ContactForm from '@/components/landing/ContactForm'

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Results' },
  { href: '#faq', label: 'FAQ' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-black text-white">
            <div className="w-8 h-8 bg-purple-DEFAULT rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm hidden sm:block">Done-For-You Claude</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-all">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/portal/login" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">
              Client Login
            </Link>
            <Link href="#contact" className="px-4 py-2 bg-purple-DEFAULT hover:bg-purple-dark text-white text-sm font-bold rounded-xl transition-all hover:shadow-glow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactForm />

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 font-black text-white mb-4">
                <div className="w-8 h-8 bg-purple-DEFAULT rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                Done-For-You Claude Setup
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                We build custom Claude AI configurations for small business owners who want results without the learning curve.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {[['#services', 'Services'], ['#pricing', 'Pricing'], ['#faq', 'FAQ'], ['/portal/login', 'Client Portal']].map(([href, label]) => (
                  <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {[['#contact', 'Contact'], ['/admin/login', 'Admin']].map(([href, label]) => (
                  <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-xs text-gray-600">© {new Date().getFullYear()} Done-For-You Claude Setup. All rights reserved.</p>
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
