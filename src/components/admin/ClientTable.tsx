import { Badge, statusBadgeVariant } from '@/components/ui/Badge'
import type { Client } from '@/types'

const packageLabels: Record<string, string> = {
  starter: 'Starter',
  pro: 'Pro',
  enterprise: 'Enterprise',
}

const packageColors: Record<string, string> = {
  starter: 'default',
  pro: 'info',
  enterprise: 'purple',
}

interface Props {
  clients: Client[]
}

export default function ClientTable({ clients }: Props) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No clients yet.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Client</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Company</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Package</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Date</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="font-medium text-gray-900 dark:text-white">{client.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{client.email}</div>
              </td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{client.company}</td>
              <td className="py-3 px-4">
                <Badge variant={packageColors[client.package] as 'default' | 'info' | 'purple'}>
                  {packageLabels[client.package]}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge variant={statusBadgeVariant(client.status)}>
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </Badge>
              </td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                {new Date(client.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
