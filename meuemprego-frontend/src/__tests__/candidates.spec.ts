import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCandidatesStore } from '@/stores/candidates'
import { useAuthStore } from '@/stores/auth'
import { isValidCPF } from '@/types'

describe('RF-002, RF-005, RF-008, RF-010 & RNF-001: Candidates, LGPD, CPF e Pausa de Contatos', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('deve validar algoritmicamente números de CPF (RF-008)', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false) // Dígitos repetidos
    expect(isValidCPF('123.456.789-00')).toBe(false) // Dígito verificador inválido
    expect(isValidCPF('123456789')).toBe(false) // Menos de 11 dígitos
    expect(isValidCPF('529.982.247-25')).toBe(true) // CPF Válido com algoritmo real
  })

  it('deve rejeitar cadastro duplicado com o mesmo CPF para outro candidato (RF-008)', () => {
    const store = useCandidatesStore()

    const duplicateCandidate = () => {
      store.registerCandidate({
        name: 'Tentativa Duplicada',
        cpf: '529.982.247-25', // CPF já existente no Carlos Eduardo
        email: 'outra.pessoa@email.com',
        avatar: 'https://example.com/avatar.jpg',
        headline: 'Developer',
        seniority: 'Pleno',
        area: 'Tecnologia da Informação',
        careerGoal: 'Nova Vaga',
        professionalMoment: 'Aberto a Propostas',
        requestHunterContact: true,
        linkedInUrl: 'https://linkedin.com/in/duplicado',
        whatsappNumber: '5511999991111',
        lgpdConsent: true,
      })
    }

    expect(duplicateCandidate).toThrowError(/CPF já cadastrado/)
  })

  it('deve ocultar o candidato da vitrine de talentos quando o mesmo pausar os contatos (RF-010)', () => {
    const authStore = useAuthStore()
    const candidatesStore = useCandidatesStore()

    const initialVisible = candidatesStore.visibleTalentPool.length
    expect(authStore.candidateUser.requestHunterContact).toBe(true)
    expect(candidatesStore.visibleTalentPool.some(c => c.id === authStore.candidateUser.id)).toBe(true)

    // Candidato desativa/pausa solicitações de contato
    authStore.toggleCandidateContactRequest(false)

    expect(authStore.candidateUser.requestHunterContact).toBe(false)
    expect(candidatesStore.visibleTalentPool.length).toBe(initialVisible - 1)
    expect(candidatesStore.visibleTalentPool.some(c => c.id === authStore.candidateUser.id)).toBe(false)
  })

  it('deve exibir na vitrine pública apenas candidatos que solicitaram contato de Hunters e possuem consentimento LGPD (RF-005, RNF-001)', () => {
    const store = useCandidatesStore()
    const pool = store.visibleTalentPool

    expect(pool.every(c => c.requestHunterContact && c.lgpdConsent && c.isApproved)).toBe(true)
  })

  it('deve permitir cadastro de novo candidato com CPF único e opt-in ativo (RF-002, RF-008)', () => {
    const store = useCandidatesStore()
    const initialCount = store.candidates.length

    const newCandidate = store.registerCandidate({
      name: 'Novo Talent',
      cpf: '999.888.777-66', // CPF Único
      email: 'novo.talent@email.com',
      avatar: 'https://example.com/avatar.jpg',
      headline: 'Software Engineer',
      seniority: 'Senior',
      area: 'Tecnologia da Informação',
      careerGoal: 'Vaga de Staff Engineer',
      professionalMoment: 'Aberto a Propostas',
      requestHunterContact: true,
      linkedInUrl: 'https://linkedin.com/in/novotalent',
      whatsappNumber: '5511999990000',
      lgpdConsent: true,
    })

    expect(store.candidates.length).toBe(initialCount + 1)
    expect(newCandidate.id).toBeDefined()
    expect(store.visibleTalentPool.some(c => c.id === newCandidate.id)).toBe(true)
  })
})
