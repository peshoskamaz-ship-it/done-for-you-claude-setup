import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Done-For-You Claude Setup | Custom AI for Small Businesses',
  description: 'We build custom Claude AI configurations — system prompts, prompt playbooks, and SOPs — tailored to your business. Save hours every week.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
