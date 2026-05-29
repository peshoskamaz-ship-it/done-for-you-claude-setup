import { getDeliverablesByClientId, getClients } from '@/lib/data'
import IntakeForm from '@/components/portal/IntakeForm'
import DeliverablesList from '@/components/portal/DeliverablesList'
import { FileText, Package, ClipboardList, CheckCircle, Clock, Zap } from 'lucide-react'

const DEMO_CLIENT_ID = 'client-001'

const stages = [
  { key: 'intake', label: 'Intake' },
  { key: 'generating', label: 'Generating' },
  { key: 'review', label: 'Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'delivered', label: 'Delivered' },
]

const stageOrder = ['intake', 'generating', 'review', 'approved', 'delivered']

export default async function PortalDashboard() {
  const [clients, deliverables] = await Promise.all([
    getClients(),
    getDeliverablesByClientId(DEMO_CLIENT_ID),
  ])
  const client = clients.find(c => c.id === DEMO_CLIENT_ID)
  const currentStageIdx = stageOrder.indexOf(client?.status ?? 'intake')
  const approvedCount = deliverables.filter(d => d.status === 'approved').length

  return (
    <div className="p-8">
      {/* Welcome banner */}
      <div className="relative bg-gradient-to-r from-purple-DEFAULT/20 via-purple-DEFAULT/10 to-transparent border border-purple-DEFAULT/20 rounded-3xl p-8 mb-8 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-purple-DEFAULT/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="text-purple-light text-sm font-semibold mb-2">Welcome back 👋</p>
          <h1 className="text-3xl font-black text-white mb-2">{client?.name ?? 'Client'}</h1>
          <p className="text-gray-400">
            {client?.company} · <span className="capitalize text-purple-light">{client?.package} Package</span>
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Package', value: client?.package ?? '—', icon: Package, color: 'text-purple-DEFAULT', bg: 'bg-purple-DEFAULT/10' },
          { label: 'Deliverables Ready', value: `${approvedCount}/${deliverables.length}`, icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Days to Delivery', value: '5–7', icon: Clock, color: 'text-orange', bg: 'bg-orange/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className={`inline-flex p-2 rounded-xl ${bg} mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div className="text-xl font-black text-white capitalize">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Progress tracker */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-400 mb-6">Project Progress</h2>
        <div className="flex items-start gap-0">
          {stages.map((stage, i) => {
            const done = i < currentStageIdx
            const active = i === currentStageIdx
            return (
              <div key={stage.key} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                    active ? 'bg-purple-DEFAULT text-white shadow-glow-sm' :
                    done ? 'bg-purple-DEFAULT/30 text-purple-light' :
                    'bg-white/5 text-gray-600'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs whitespace-nowrap hidden sm:block ${
                    active ? 'text-white font-semibold' : done ? 'text-purple-light' : 'text-gray-600'
                  }`}>
                    {stage.label}
                  </span>
                </div>
                {i < stages.length - 1 && (
                  <div className={`flex-1 h-px mb-5 mx-2 transition-all ${i < currentStageIdx ? 'bg-purple-DEFAULT/50' : 'bg-white/5'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-1">Submit Intake Form</h2>
          <p className="text-sm text-gray-500 mb-6">Tell us about your business to get started.</p>
          <IntakeForm />
        </div>

        <div id="deliverables" className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-1">Your Deliverables</h2>
          <p className="text-sm text-gray-500 mb-6">View and download your custom AI assets.</p>
          <DeliverablesList deliverables={deliverables} />
        </div>
      </div>
    </div>
  )
}
