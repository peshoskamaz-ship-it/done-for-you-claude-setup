import { getClients, getDeliverables } from '@/lib/data'
import ClientTable from '@/components/admin/ClientTable'
import DeliverableReview from '@/components/admin/DeliverableReview'
import { Card } from '@/components/ui/Card'
import { Users, FileCheck, Clock, DollarSign } from 'lucide-react'
import type { ProjectStatus } from '@/types'

const packageRevenue: Record<string, number> = {
  starter: 800,
  pro: 1500,
  enterprise: 2500,
}

export default async function AdminDashboard() {
  const [clients, deliverables] = await Promise.all([getClients(), getDeliverables()])

  const totalRevenue = clients.reduce((sum, c) => sum + (packageRevenue[c.package] ?? 0), 0)
  const pendingDeliverables = deliverables.filter((d) => d.status === 'pending')
  const activeProjects = clients.filter(
    (c) => !['delivered', 'approved'].includes(c.status as ProjectStatus)
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage clients, review deliverables, and track project status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
              <Users className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{clients.length}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeProjects.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FileCheck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingDeliverables.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Clients */}
      <Card className="mb-8" id="clients">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">All Clients</h2>
        <ClientTable clients={clients} />
      </Card>

      {/* Deliverable Review */}
      <Card id="deliverables">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Deliverable Review
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Approve or reject AI-generated deliverables before they go live for clients.
        </p>
        <DeliverableReview deliverables={deliverables} clients={clients} />
      </Card>
    </div>
  )
}
