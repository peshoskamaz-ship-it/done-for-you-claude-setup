import type { Client } from '@/types'

const pkgStyle: Record<string, string> = {
  starter: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  pro: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  enterprise: 'bg-orange/10 text-orange border-orange/20',
}

const statusStyle: Record<string, string> = {
  intake: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  generating: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  review: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  delivered: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function ClientTable({ clients }: { clients: Client[] }) {
  if (clients.length === 0) {
    return <div className="p-6 text-center text-gray-600 text-sm">No clients yet.</div>
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {['Client', 'Company', 'Package', 'Status', 'Joined'].map(h => (
              <th key={h} className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {clients.map(client => (
            <tr key={client.id} className="hover:bg-white/[0.02] transition-colors group">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple to-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {client.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{client.name}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-400">{client.company}</td>
              <td className="py-4 px-6">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold capitalize ${pkgStyle[client.package] ?? pkgStyle.starter}`}>
                  {client.package}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium capitalize ${statusStyle[client.status] ?? statusStyle.intake}`}>
                  {client.status}
                </span>
              </td>
              <td className="py-4 px-6 text-gray-500 text-xs">
                {new Date(client.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
