import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CandidateProfile, SeniorityLevel, CandidateStatus } from '@/types'

export const useCandidatesStore = defineStore('candidates', () => {
  const candidates = ref<CandidateProfile[]>([
    {
      id: 'cand-user-1',
      name: 'Carlos Eduardo',
      cpf: '529.982.247-25',
      email: 'carlos.eduardo@email.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      headline: 'Engenheiro de Software Senior | Fullstack (Vue.js, Node.js)',
      seniority: 'Senior',
      area: 'Tecnologia da Informação',
      careerGoal: 'Transição para Tech Lead ou Engenheiro Staff em empresa global de tecnologia.',
      professionalMoment: 'Aberto a Propostas',
      requestHunterContact: true,
      linkedInUrl: 'https://www.linkedin.com/in/carlos-eduardo-demo',
      whatsappNumber: '5511998765432',
      lgpdConsent: true,
      createdAt: '2026-07-20',
      isApproved: true,
    },
    {
      id: 'cand-2',
      name: 'Mariana Silva',
      cpf: '111.444.777-35',
      email: 'mariana.silva@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
      headline: 'Product Manager Pleno | Experiência em Fintechs & B2B SaaS',
      seniority: 'Pleno',
      area: 'Produtos & Design',
      careerGoal: 'Aceleração para cadeira de Senior Product Manager com liderança de squad.',
      professionalMoment: 'Em Transição',
      requestHunterContact: true,
      linkedInUrl: 'https://www.linkedin.com/in/mariana-silva-pm',
      whatsappNumber: '5511987654321',
      lgpdConsent: true,
      createdAt: '2026-07-18',
      isApproved: true,
    },
    {
      id: 'cand-3',
      name: 'Gabriel Santos',
      cpf: '222.333.444-55',
      email: 'gabriel.santos@email.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      headline: 'Diretor de Vendas & Expansion | Growth B2B',
      seniority: 'Liderança / C-Level',
      area: 'Vendas / Comercial',
      careerGoal: 'Colocação executiva como VP of Sales ou Chief Revenue Officer (CRO).',
      professionalMoment: 'Buscando recolocação',
      requestHunterContact: true,
      linkedInUrl: 'https://www.linkedin.com/in/gabriel-santos-cro',
      whatsappNumber: '5511976543219',
      lgpdConsent: true,
      createdAt: '2026-07-15',
      isApproved: true,
    },
    {
      id: 'cand-4',
      name: 'Beatriz Lima',
      cpf: '333.444.555-66',
      email: 'beatriz.lima@email.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      headline: 'Cientista de Dados Pleno | Python, Machine Learning & SQL',
      seniority: 'Pleno',
      area: 'Data & Analytics',
      careerGoal: 'Conquistar primeira oportunidade internacional remota em IA e Data Science.',
      professionalMoment: 'Ativo',
      requestHunterContact: true,
      linkedInUrl: 'https://www.linkedin.com/in/beatriz-lima-ds',
      whatsappNumber: '5521998877665',
      lgpdConsent: true,
      createdAt: '2026-07-21',
      isApproved: true,
    },
    {
      id: 'cand-5',
      name: 'Felipe Oliveira',
      cpf: '444.555.666-77',
      email: 'felipe.oliveira@email.com',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80',
      headline: 'Especialista de RH & Business Partner (HRBP)',
      seniority: 'Especialista',
      area: 'Recursos Humanos',
      careerGoal: 'Mentoria para reformulação estratégica de currículo e entrevistas em multinacionais.',
      professionalMoment: 'Aberto a Propostas',
      requestHunterContact: true,
      linkedInUrl: 'https://www.linkedin.com/in/felipe-oliveira-hrbp',
      whatsappNumber: '5531988776655',
      lgpdConsent: true,
      createdAt: '2026-07-22',
      isApproved: true,
    },
  ])

  // Filters State
  const searchQuery = ref('')
  const selectedArea = ref<string | null>(null)
  const selectedSeniority = ref<SeniorityLevel | null>(null)
  const selectedMoment = ref<CandidateStatus | null>(null)

  // Anti-Duplication Check (RF-008)
  function isCpfRegistered(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '')
    return candidates.value.some(c => c.cpf.replace(/\D/g, '') === cleanCPF)
  }

  // Visible Talent Pool (Candidates requesting contact & approved & LGPD consent) RF-005 & RF-010
  const visibleTalentPool = computed(() => {
    return candidates.value.filter(c => c.requestHunterContact && c.isApproved && c.lgpdConsent)
  })

  // High Performance Filtered Candidates (< 1s RNF-003)
  const filteredCandidates = computed(() => {
    return visibleTalentPool.value.filter(c => {
      const matchesSearch = !searchQuery.value ||
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.headline.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.careerGoal.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesArea = !selectedArea.value || c.area === selectedArea.value
      const matchesSeniority = !selectedSeniority.value || c.seniority === selectedSeniority.value
      const matchesMoment = !selectedMoment.value || c.professionalMoment === selectedMoment.value

      return matchesSearch && matchesArea && matchesSeniority && matchesMoment
    })
  })

  function toggleCandidateApproval(id: string) {
    const candidate = candidates.value.find(c => c.id === id)
    if (candidate) {
      candidate.isApproved = !candidate.isApproved
    }
  }

  function updateCandidateInStore(id: string, updated: Partial<CandidateProfile>) {
    const candidate = candidates.value.find(c => c.id === id)
    if (candidate) {
      Object.assign(candidate, updated)
    }
  }

  function registerCandidate(newCandidate: Omit<CandidateProfile, 'id' | 'createdAt' | 'isApproved'>) {
    if (isCpfRegistered(newCandidate.cpf)) {
      throw new Error('CPF já cadastrado na plataforma para outro Candidato.')
    }

    const candidate: CandidateProfile = {
      ...newCandidate,
      id: `cand-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isApproved: true, // Approved by default or moderated by admin
    }
    candidates.value.unshift(candidate)
    return candidate
  }

  return {
    candidates,
    searchQuery,
    selectedArea,
    selectedSeniority,
    selectedMoment,
    visibleTalentPool,
    filteredCandidates,
    isCpfRegistered,
    toggleCandidateApproval,
    updateCandidateInStore,
    registerCandidate,
  }
})
