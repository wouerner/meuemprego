import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserRole, CandidateProfile, HunterProfile } from '@/types'
import { useCandidatesStore } from '@/stores/candidates'

export const useAuthStore = defineStore('auth', () => {
  const currentRole = ref<UserRole>('candidato')

  const candidateUser = ref<CandidateProfile>({
    id: 'cand-user-1',
    name: 'Carlos Eduardo',
    cpf: '529.982.247-25',
    email: 'carlos.eduardo@email.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    headline: 'Engenheiro de Software Senior | Especialista Vue & Node',
    seniority: 'Senior',
    area: 'Tecnologia da Informação',
    careerGoal: 'Transição para Liderança Técnica / Tech Lead em Tech Company global',
    professionalMoment: 'Aberto a Propostas',
    requestHunterContact: true,
    linkedInUrl: 'https://www.linkedin.com/in/carlos-eduardo-demo',
    whatsappNumber: '5511998765432',
    lgpdConsent: true,
    createdAt: '2026-07-20',
    isApproved: true,
  })

  const hunterUser = ref<HunterProfile>({
    id: 'hunt-user-1',
    name: 'Juliana Mendes',
    cpf: '111.444.777-35',
    email: 'juliana.mendes@careerhunter.com.br',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    headline: 'Executive Headhunter & Coach de Carreira Tech',
    bio: 'Mais de 10 anos recolocando lideranças e especialistas de tecnologia nos maiores ecossistemas de inovação.',
    specialties: ['Tecnologia da Informação', 'Produtos & Design', 'Liderança Executiva'],
    senioritiesServed: ['Senior', 'Especialista', 'Liderança / C-Level'],
    serviceModel: 'Assessoria Completa',
    linkedInUrl: 'https://www.linkedin.com/in/juliana-mendes-headhunter',
    whatsappNumber: '5511988887777',
    status: 'Aprovado',
    rating: 4.9,
    totalContactsCount: 142,
    createdAt: '2026-07-01',
  })

  const currentUser = computed(() => {
    if (currentRole.value === 'hunter') return hunterUser.value
    if (currentRole.value === 'candidato') return candidateUser.value
    return {
      id: 'admin-1',
      name: 'Administrador da Plataforma',
      cpf: '000.000.000-00',
      email: 'admin@meuemprego.pro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    }
  })

  function setRole(role: UserRole) {
    currentRole.value = role
  }

  function updateCandidateProfile(updated: Partial<CandidateProfile>) {
    candidateUser.value = { ...candidateUser.value, ...updated }
    // Sync with candidates store
    const candidatesStore = useCandidatesStore()
    candidatesStore.updateCandidateInStore(candidateUser.value.id, updated)
  }

  function toggleCandidateContactRequest(enabled: boolean) {
    candidateUser.value.requestHunterContact = enabled
    const candidatesStore = useCandidatesStore()
    candidatesStore.updateCandidateInStore(candidateUser.value.id, { requestHunterContact: enabled })
  }

  function updateHunterProfile(updated: Partial<HunterProfile>) {
    hunterUser.value = { ...hunterUser.value, ...updated }
  }

  return {
    currentRole,
    candidateUser,
    hunterUser,
    currentUser,
    setRole,
    updateCandidateProfile,
    toggleCandidateContactRequest,
    updateHunterProfile,
  }
})
