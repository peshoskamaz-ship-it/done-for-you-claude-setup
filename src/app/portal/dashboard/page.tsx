import { getDeliverablesByClientId, getClients } from '@/lib/data'
import IntakeForm from '@/components/portal/IntakeForm'
import DeliverablesList from '@/components/portal/DeliverablesList'
import { Card } from '@/components/ui/Card'
import { Badge, statusBadgeVariant } from '@/components/ui/Badge'
import { FileText, ClipboardList, Package } from 'lucide-react'

const DEMO_CLIENT_ID = 'client-001'

export default async function PortalDashboard() {
  const [clients, deliverables] = await Promise.all([
    getClients(),
    getDeliverablesByClientId(DEMO_CLIENT_ID),
  ])
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)
  const approvedCount = deliverables.filter((d) => d.status === 'approved').length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {client?.name ?? 'Client'} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here&apos;s your project overview and deliverables.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
              <Package className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Package</p>
              <p className="font-semibold text-gray-900 dark:text-white capitalize">
                {client?.package ?? '—'}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Deliverables Ready</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {approvedCount} / {deliverables.length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <ClipboardList className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project Status</p>
              <Badge variant={statusBadgeVariant(client?.status ?? 'intake')}>
                {(client?.status ?? 'intake').charAt(0).toUpperCase() +
                  (client?.status ?? 'intake').slice(1)}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Intake Form */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Submit Your Intake Form
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Tell us about your business so we can build your custom AI setup.
          </p>
          <IntakeForm />
        </Card>

        {/* Deliverables */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Your Deliverables
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            View and download your custom AI assets below.
          </p>
          <DeliverablesList deliverables={deliverables} />
        </Card>
      </div>
    </div>
  )
}
