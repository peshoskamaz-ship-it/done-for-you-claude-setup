import { getClients, getDeliverables } from '@/lib/data'
import ClientTable from '@/components/admin/ClientTable'
import DeliverableReview from '@/components/admin/DeliverableReview'
import { Users, FileCheck, Clock, DollarSign, TrendingUp } from 'lucide-react'

const packageRevenue: Record<string, number> = { starter: 800, pro: 1500, enterprise: 2500 }

export default async function AdminDashboard() {
  const [clients, deliverables] = await Promise.all([getClients(), getDeliverables()])

  const totalRevenue = clients.reduce((sum, c) => sum + (packageRevenue[c.package] ?? 0), 0)
  const pendingCount = deliverables.filter(d => d.status === 'pending').length
  const activeCount = clients.filter(c => !['delivered', 'approved'].includes(c.status)).length
  const approvedCount = deliverables.filter(d => d.status === 'approved').length

  const stats = [
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10', trend: `${clients.length} clients` },
    { label: 'Active Projects', value: activeCount.toString(), icon: Users, color: 'text-purple-DEFAULT', bg: 'bg-purple-DEFAULT/10', trend: `${clients.length} total` },
    { label: 'Pending Review', value: pendingCount.toString(), icon: Clock, color: 'text-orange', bg: 'bg-orange/10', trend: 'Needs attention' },
    { label: 'Approved', value: approvedCount.toString(), icon: FileCheck, color: 'text-blue-400', bg: 'bg-blue-500/10', trend: `of ${deliverables.length} total` },
  ]

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage clients, deliverables, and project status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg, trend }) => (
          <div key={label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
            <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs text-gray-500 mb-2">{label}</div>
            <div className="flex items-center gap-1 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </div>
          </div>
        ))}
      </div>

      {/* Clients table */}
      <div id="clients" className="bg-white/[0.03] border border-white/10 rounded-2xl mb-6 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">All Clients</h2>
          <p className="text-sm text-gray-500 mt-0.5">{clients.length} total clients</p>
        </div>
        <ClientTable clients={clients} />
      </div>

      {/* Deliverable review */}
      <div id="deliverables" className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">Deliverable Review</h2>
          <p className="text-sm text-gray-500 mt-0.5">Approve or reject AI-generated deliverables before they go live.</p>
        </div>
        <div className="p-6">
          <DeliverableReview deliverables={deliverables} clients={clients} />
        </div>
      </div>
    </div>
  )
}
