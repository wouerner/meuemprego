import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MetricEvent, UserRole } from '@/types'

export const useMetricsStore = defineStore('metrics', () => {
  const events = ref<MetricEvent[]>([
    {
      id: 'm-1',
      timestamp: '2026-07-23T09:14:00',
      targetType: 'hunter',
      targetId: 'hunt-1',
      targetName: 'Juliana Mendes',
      channel: 'whatsapp',
      initiatedByRole: 'candidato',
    },
    {
      id: 'm-2',
      timestamp: '2026-07-23T09:30:00',
      targetType: 'candidate',
      targetId: 'cand-1',
      targetName: 'Carlos Eduardo',
      channel: 'linkedin',
      initiatedByRole: 'hunter',
    },
    {
      id: 'm-3',
      timestamp: '2026-07-23T10:05:00',
      targetType: 'hunter',
      targetId: 'hunt-3',
      targetName: 'Camila Vasconcelos',
      channel: 'whatsapp',
      initiatedByRole: 'candidato',
    },
    {
      id: 'm-4',
      timestamp: '2026-07-23T10:45:00',
      targetType: 'candidate',
      targetId: 'cand-2',
      targetName: 'Mariana Silva',
      channel: 'whatsapp',
      initiatedByRole: 'hunter',
    },
    {
      id: 'm-5',
      timestamp: '2026-07-23T10:55:00',
      targetType: 'hunter',
      targetId: 'hunt-1',
      targetName: 'Juliana Mendes',
      channel: 'linkedin',
      initiatedByRole: 'candidato',
    },
    {
      id: 'm-6',
      timestamp: '2026-07-23T11:15:00',
      targetType: 'candidate',
      targetId: 'cand-3',
      targetName: 'Gabriel Santos',
      channel: 'whatsapp',
      initiatedByRole: 'hunter',
    },
  ])

  // Filters for metrics report
  const selectedChannelFilter = ref<string | null>(null)
  const selectedTargetTypeFilter = ref<string | null>(null)

  // Computed Filtered Events
  const filteredEvents = computed(() => {
    return events.value.filter(e => {
      const matchChannel = !selectedChannelFilter.value || e.channel === selectedChannelFilter.value
      const matchTarget = !selectedTargetTypeFilter.value || e.targetType === selectedTargetTypeFilter.value
      return matchChannel && matchTarget
    })
  })

  // Computed Totals (RF-007)
  const totalInteractions = computed(() => events.value.length)

  const whatsappClicks = computed(() => {
    return events.value.filter(e => e.channel === 'whatsapp').length
  })

  const linkedinClicks = computed(() => {
    return events.value.filter(e => e.channel === 'linkedin').length
  })

  const candidateToHunterClicks = computed(() => {
    return events.value.filter(e => e.targetType === 'hunter').length
  })

  const hunterToCandidateClicks = computed(() => {
    return events.value.filter(e => e.targetType === 'candidate').length
  })

  function trackInteraction(
    targetType: 'hunter' | 'candidate',
    targetId: string,
    targetName: string,
    channel: 'whatsapp' | 'linkedin',
    initiatedByRole: UserRole | 'visitante'
  ) {
    const newEvent: MetricEvent = {
      id: `m-${Date.now()}`,
      timestamp: new Date().toISOString(),
      targetType,
      targetId,
      targetName,
      channel,
      initiatedByRole,
    }
    events.value.unshift(newEvent)
  }

  // Format pre-formatted WhatsApp URLs (RF-006)
  function createWhatsAppUrl(phone: string, textMessage: string): string {
    const cleanPhone = phone.replace(/\D/g, '')
    const encodedText = encodeURIComponent(textMessage)
    return `https://wa.me/${cleanPhone}?text=${encodedText}`
  }

  // Trigger Redirection with Metric Tracking (RF-006 & RF-007)
  function triggerContactRedirection(
    targetType: 'hunter' | 'candidate',
    targetId: string,
    targetName: string,
    channel: 'whatsapp' | 'linkedin',
    contactUrlOrPhone: string,
    customMessage: string,
    initiatedByRole: UserRole | 'visitante'
  ) {
    trackInteraction(targetType, targetId, targetName, channel, initiatedByRole)

    let finalUrl = contactUrlOrPhone
    if (channel === 'whatsapp') {
      finalUrl = createWhatsAppUrl(contactUrlOrPhone, customMessage)
    }

    if (typeof window !== 'undefined') {
      window.open(finalUrl, '_blank', 'noopener,noreferrer')
    }
    return finalUrl
  }

  // Export Metrics as CSV Report (RF-007 Enhancement)
  function exportMetricsCsv() {
    const headers = 'ID,Timestamp,Destinatario,Tipo,Canal,IniciadoPor\n'
    const rows = events.value.map(e =>
      `"${e.id}","${e.timestamp}","${e.targetName}","${e.targetType}","${e.channel}","${e.initiatedByRole}"`
    ).join('\n')

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows)
    if (typeof window !== 'undefined') {
      const link = document.createElement('a')
      link.setAttribute('href', csvContent)
      link.setAttribute('download', `relatorio_transbordo_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return {
    events,
    selectedChannelFilter,
    selectedTargetTypeFilter,
    filteredEvents,
    totalInteractions,
    whatsappClicks,
    linkedinClicks,
    candidateToHunterClicks,
    hunterToCandidateClicks,
    trackInteraction,
    createWhatsAppUrl,
    triggerContactRedirection,
    exportMetricsCsv,
  }
})
