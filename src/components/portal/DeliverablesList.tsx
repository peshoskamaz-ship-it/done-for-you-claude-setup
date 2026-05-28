'use client'

import { useState } from 'react'
import { FileText, BookOpen, Bot, Download, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge, statusBadgeVariant } from '@/components/ui/Badge'
import type { Deliverable } from '@/types'

const typeConfig = {
  'system-prompt': { icon: Bot, label: 'System Prompt', color: 'text-brand-500' },
  playbook: { icon: BookOpen, label: 'Prompt Playbook', color: 'text-purple-500' },
  sop: { icon: FileText, label: 'SOP Document', color: 'text-green-500' },
}

interface Props {
  deliverables: Deliverable[]
}

export default function DeliverablesList({ deliverables }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (deliverables.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
        <p className="font-medium">No deliverables yet</p>
        <p className="text-sm mt-1">Your custom AI assets will appear here once generated.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {deliverables.map((d) => {
        const config = typeConfig[d.type]
        const Icon = config.icon
        const isExpanded = expanded === d.id

        return (
          <div
            key={d.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
              onClick={() => setExpanded(isExpanded ? null : d.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{d.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {config.label} · {new Date(d.createdAt).toLocaleDateString()}
                  </p>
                </div>
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
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed max-h-80 overflow-y-auto">
                  {d.content}
                </pre>
                {d.status === 'approved' && (
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
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
