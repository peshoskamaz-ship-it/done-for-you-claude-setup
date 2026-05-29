'use client'

import { useState } from 'react'
import { FileText, BookOpen, Bot, Download, ChevronDown, ChevronUp, Lock } from 'lucide-react'
import type { Deliverable } from '@/types'

const typeConfig = {
  'system-prompt': { icon: Bot, label: 'System Prompt', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  playbook: { icon: BookOpen, label: 'Prompt Playbook', color: 'text-orange', bg: 'bg-orange/10' },
  sop: { icon: FileText, label: 'SOP Document', color: 'text-blue-400', bg: 'bg-blue-500/10' },
}

const statusStyle: Record<string, string> = {
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function DeliverablesList({ deliverables }: { deliverables: Deliverable[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (deliverables.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-4">
          <FileText className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-400 font-medium text-sm">No deliverables yet</p>
        <p className="text-gray-600 text-xs mt-1">Submit your intake form to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {deliverables.map(d => {
        const cfg = typeConfig[d.type]
        const Icon = cfg.icon
        const isOpen = expanded === d.id
        return (
          <div key={d.id} className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'border-purple-500/30 bg-purple-500/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'}`}>
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : d.id)}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${cfg.bg}`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{d.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{cfg.label}</p>
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
                <pre className="text-xs text-gray-400 whitespace-pre-wrap font-sans leading-relaxed max-h-60 overflow-y-auto bg-black/20 rounded-xl p-4">{d.content}</pre>
                {d.status === 'approved' ? (
                  <button
                    onClick={() => {
                      const blob = new Blob([d.content], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `${d.title.replace(/\s+/g, '-').toLowerCase()}.txt`
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-purple hover:bg-purple-dark text-white text-xs font-bold rounded-xl transition-all hover:shadow-glow-sm"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                ) : (
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-500 text-xs rounded-xl">
                    <Lock className="w-3.5 h-3.5" /> Pending approval
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
