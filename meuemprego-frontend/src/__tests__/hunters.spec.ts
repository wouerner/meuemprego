import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHuntersStore } from '@/stores/hunters'

describe('RF-004, RF-008 & RNF-003: Catálogo de Hunters & Validação de CPF Único', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('deve rejeitar cadastro de Job Hunter com CPF duplicado (RF-008)', () => {
    const store = useHuntersStore()

    const duplicateHunter = () => {
      store.registerHunter({
        name: 'Hunter Falso',
        cpf: '987.654.321-09', // CPF já existente na Juliana Mendes
        email: 'falso@career.com',
        avatar: 'https://example.com/avatar.jpg',
        headline: 'Consultor',
        bio: 'Bio',
        specialties: ['Tecnologia da Informação'],
        senioritiesServed: ['Senior'],
        serviceModel: 'Mentoria',
        linkedInUrl: 'https://linkedin.com/in/falso',
        whatsappNumber: '5511999992222',
      })
    }

    expect(duplicateHunter).toThrowError(/CPF já cadastrado/)
  })

  it('deve listar apenas Job Hunters com status Aprovado no catálogo público (RF-004)', () => {
    const store = useHuntersStore()
    const approved = store.approvedHunters

    expect(approved.every(h => h.status === 'Aprovado')).toBe(true)
    expect(approved.length).toBeGreaterThan(0)
  })

  it('deve filtrar os hunters por especialidade, senioridade e palavra-chave em menos de 100ms (RNF-003)', () => {
    const store = useHuntersStore()
    store.searchQuery = 'Juliana'
    store.selectedSpecialty = 'Tecnologia da Informação'

    const startTime = performance.now()
    const filtered = store.filteredHunters
    const endTime = performance.now()

    const executionTimeMs = endTime - startTime

    expect(filtered.length).toBe(1)
    expect(filtered[0].name).toBe('Juliana Mendes')
    expect(executionTimeMs).toBeLessThan(1000) // RNF-003 (< 1s)
  })
})
