'use client'

import { useState } from 'react'
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge, statusBadgeVariant } from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { Deliverable, Client } from '@/types'

interface Props {
  deliverables: Deliverable[]
  clients: Client[]
}

export default function DeliverableReview({ deliverables, clients }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [localDeliverables, setLocalDeliverables] = useState(deliverables)

  function getClientName(clientId: string): string {
    return clients.find((c) => c.id === clientId)?.name ?? 'Unknown'
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    setUpdating(id)
    try {
      await fetch('/api/admin/deliverables', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setLocalDeliverables((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status } : d))
      )
    } finally {
      setUpdating(null)
    }
  }

  if (localDeliverables.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        No deliverables to review.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {localDeliverables.map((d) => {
        const isExpanded = expanded === d.id
        return (
          <div
            key={d.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 cursor-pointer"
              onClick={() => setExpanded(isExpanded ? null : d.id)}
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{d.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {getClientName(d.clientId)} · {d.type}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={statusBadgeVariant(d.status)}>
                  {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                </Badge>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed max-h-64 overflow-y-auto mb-4">
                  {d.content}
                </pre>
                {d.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      onClick={() => updateStatus(d.id, 'approved')}
                      disabled={updating === d.id}
                    >
                      <Check className="w-3.5 h-3.5 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => updateStatus(d.id, 'rejected')}
                      disabled={updating === d.id}
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
