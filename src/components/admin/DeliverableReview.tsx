'use client'

import { useState } from 'react'
import { Check, X, ChevronDown, ChevronUp, Bot, BookOpen, FileText } from 'lucide-react'
import type { Deliverable, Client } from '@/types'

const typeConfig = {
  'system-prompt': { icon: Bot, label: 'System Prompt', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  playbook: { icon: BookOpen, label: 'Playbook', color: 'text-orange', bg: 'bg-orange/10' },
  sop: { icon: FileText, label: 'SOP', color: 'text-blue-400', bg: 'bg-blue-500/10' },
}

const statusStyle: Record<string, string> = {
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function DeliverableReview({ deliverables, clients }: { deliverables: Deliverable[]; clients: Client[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [local, setLocal] = useState(deliverables)

  function getClient(clientId: string) {
    return clients.find(c => c.id === clientId)?.name ?? 'Unknown'
  }

  async function updateStatus(id: string, status: 'approved' | 'rejected') {
    setUpdating(id)
    try {
      await fetch('/api/admin/deliverables', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setLocal(prev => prev.map(d => d.id === id ? { ...d, status } : d))
    } finally {
      setUpdating(null)
    }
  }

  if (local.length === 0) {
    return <div className="text-center py-8 text-gray-600 text-sm">No deliverables to review.</div>
  }

  return (
    <div className="space-y-3">
      {local.map(d => {
        const cfg = typeConfig[d.type]
        const Icon = cfg.icon
        const isOpen = expanded === d.id
        return (
          <div key={d.id} className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-purple-500/30' : 'border-white/10 hover:border-white/20'}`}>
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : d.id)}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${cfg.bg}`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{d.title}</p>
                  <p className="text-xs text-gray-500">{getClient(d.clientId)} · {cfg.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium capitalize ${statusStyle[d.status] ?? statusStyle.pending}`}>
                  {d.status}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </div>
            {isOpen && (
              <div className="px-4 pb-4 border-t border-white/5 pt-4">
                <pre className="text-xs text-gray-400 whitespace-pre-wrap font-sans leading-relaxed max-h-56 overflow-y-auto bg-black/20 rounded-xl p-4 mb-4">{d.content}</pre>
                {d.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(d.id, 'approved')}
                      disabled={updating === d.id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-bold rounded-xl border border-green-500/20 transition-all disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(d.id, 'rejected')}
                      disabled={updating === d.id}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-xl border border-red-500/20 transition-all disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
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
