import Link from 'next/link'
import { Sparkles, LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react'

const navItems = [
  { href: '/portal/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/portal/dashboard#deliverables', icon: FileText, label: 'Deliverables' },
  { href: '/portal/dashboard#settings', icon: Settings, label: 'Settings' },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy flex">
      <aside className="w-64 bg-[#0A0919] border-r border-white/5 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-DEFAULT rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Done-For-You</div>
              <div className="text-gray-500 text-xs">Client Portal</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
            >
              <Icon className="w-4 h-4 group-hover:text-purple-DEFAULT transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  )
}
