import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Hero from '@/components/landing/Hero'
import Services from '@/components/landing/Services'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import ContactForm from '@/components/landing/ContactForm'
import { Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <Sparkles className="w-5 h-5 text-brand-500" />
            Done-For-You Claude
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="#services" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/portal/login"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Client Login
            </Link>
            <Link
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
      <ContactForm />

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <Sparkles className="w-5 h-5 text-brand-500" />
            Done-For-You Claude Setup
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Done-For-You Claude Setup. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/portal/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Client Portal
            </Link>
            <Link href="/admin/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
