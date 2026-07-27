import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMetricsStore } from '@/stores/metrics'

describe('RF-006, RF-007 & RF-009: Store de Métricas, Redirecionamento e Paginação de Logs', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('deve gerar link de WhatsApp pré-formatado corretamente (RF-006)', () => {
    const store = useMetricsStore()
    const url = store.createWhatsAppUrl('5511998765432', 'Olá Juliana, gostaria de saber mais.')

    expect(url).toContain('https://wa.me/5511998765432')
    expect(url).toContain('text=Ol%C3%A1%20Juliana%2C%20gostaria%20de%20saber%20mais.')
  })

  it('deve registrar o evento de transbordo e incrementar as métricas (RF-007)', () => {
    const store = useMetricsStore()
    const initialTotal = store.totalInteractions

    store.trackInteraction('hunter', 'hunt-1', 'Juliana Mendes', 'whatsapp', 'candidato')

    expect(store.totalInteractions).toBe(initialTotal + 1)
    expect(store.events[0].targetId).toBe('hunt-1')
    expect(store.events[0].channel).toBe('whatsapp')
    expect(store.events[0].initiatedByRole).toBe('candidato')
  })

  it('deve permitir a filtragem e cálculo de páginas para logs de transbordo (RF-009)', () => {
    const store = useMetricsStore()
    store.selectedChannelFilter = 'whatsapp'

    const filtered = store.filteredEvents
    expect(filtered.every(e => e.channel === 'whatsapp')).toBe(true)

    const itemsPerPage = 5
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    expect(totalPages).toBeGreaterThanOrEqual(1)
  })
})
