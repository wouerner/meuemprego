import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { HunterProfile, HunterApprovalStatus, SeniorityLevel } from '@/types'

export const useHuntersStore = defineStore('hunters', () => {
  const hunters = ref<HunterProfile[]>([
    {
      id: 'hunt-1',
      name: 'Juliana Mendes',
      cpf: '987.654.321-09',
      email: 'juliana.mendes@career.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      headline: 'Executive Headhunter & Coach de Carreira Tech',
      bio: 'Especialista em recolocação de executivos de TI, Tech Leads e Product Managers em grandes tech companies e startups globais.',
      specialties: ['Tecnologia da Informação', 'Produto', 'Engenharia de Software'],
      senioritiesServed: ['Senior', 'Especialista', 'Liderança / C-Level'],
      serviceModel: 'Assessoria Completa',
      linkedInUrl: 'https://www.linkedin.com/in/juliana-mendes-headhunter',
      whatsappNumber: '5511988887777',
      status: 'Aprovado',
      rating: 4.9,
      totalContactsCount: 142,
      createdAt: '2026-07-01',
    },
    {
      id: 'hunt-2',
      name: 'Roberto Andrade',
      cpf: '222.333.444-55',
      email: 'roberto.andrade@huntcareers.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
      headline: 'Job Hunter Sênior para Mercado Financeiro & Vendas',
      bio: 'Foco total em transição de carreira para Gerentes de Contas, Diretores Comerciais e Analistas do setor bancário/fintechs.',
      specialties: ['Finanças', 'Vendas / Comercial', 'Gestão de Negócios'],
      senioritiesServed: ['Pleno', 'Senior', 'Liderança / C-Level'],
      serviceModel: 'Mentoria de Carreira',
      linkedInUrl: 'https://www.linkedin.com/in/roberto-andrade-hunter',
      whatsappNumber: '5511977776666',
      status: 'Aprovado',
      rating: 4.8,
      totalContactsCount: 98,
      createdAt: '2026-07-05',
    },
    {
      id: 'hunt-3',
      name: 'Camila Vasconcelos',
      cpf: '333.444.555-66',
      email: 'camila.v@jobhunter.io',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
      headline: 'Especialista em Otimização de LinkedIn & Entrevistas em Inglês',
      bio: 'Ajudo profissionais brasileiros a conquistarem vagas remotas pagas em dólares e euros através de currículos e perfis campeões.',
      specialties: ['Carreira Internacional', 'Tecnologia da Informação', 'Marketing'],
      senioritiesServed: ['Junior', 'Pleno', 'Senior', 'Especialista'],
      serviceModel: 'Revisão de LinkedIn/CV',
      linkedInUrl: 'https://www.linkedin.com/in/camila-vasconcelos-coach',
      whatsappNumber: '5521999887766',
      status: 'Aprovado',
      rating: 5.0,
      totalContactsCount: 215,
      createdAt: '2026-07-10',
    },
    {
      id: 'hunt-4',
      name: 'Fernando Garcia',
      cpf: '444.555.666-77',
      email: 'fernando.garcia@talentconsulting.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80',
      headline: 'Headhunter para Recursos Humanos & Operations',
      bio: 'Conecto profissionais de RH, People Ops e Operações com empresas que valorizam cultura e diversidade.',
      specialties: ['Recursos Humanos', 'Operações & Logística'],
      senioritiesServed: ['Pleno', 'Senior'],
      serviceModel: 'Sessão Individual',
      linkedInUrl: 'https://www.linkedin.com/in/fernando-garcia-hunter',
      whatsappNumber: '5531987654321',
      status: 'Pendente',
      rating: 4.7,
      totalContactsCount: 34,
      createdAt: '2026-07-22',
    },
    {
      id: 'hunt-5',
      name: 'Luciana Rocha',
      cpf: '555.666.777-88',
      email: 'luciana.rocha@techhunters.com',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=250&q=80',
      headline: 'Career Strategist para Data Science & AI',
      bio: 'Especializada no ecossistema de Ciência de Dados, Engenharia de Dados e Inteligência Artificial.',
      specialties: ['Data & Analytics', 'Tecnologia da Informação'],
      senioritiesServed: ['Senior', 'Especialista'],
      serviceModel: 'Assessoria Completa',
      linkedInUrl: 'https://www.linkedin.com/in/luciana-rocha-ai',
      whatsappNumber: '5511976543210',
      status: 'Pendente',
      rating: 4.9,
      totalContactsCount: 12,
      createdAt: '2026-07-23',
    },
  ])

  // Filters State
  const searchQuery = ref('')
  const selectedSpecialty = ref<string | null>(null)
  const selectedSeniority = ref<SeniorityLevel | null>(null)
  const selectedServiceModel = ref<string | null>(null)

  // Anti-Duplication Check (RF-008)
  function isCpfRegistered(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '')
    return hunters.value.some(h => h.cpf.replace(/\D/g, '') === cleanCPF)
  }

  // Approved Hunters Catálogo
  const approvedHunters = computed(() => {
    return hunters.value.filter(h => h.status === 'Aprovado')
  })

  // Filtered Hunters (< 1s execution time RNF-003)
  const filteredHunters = computed(() => {
    return approvedHunters.value.filter(h => {
      const matchesSearch = !searchQuery.value ||
        h.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        h.headline.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        h.specialties.some(s => s.toLowerCase().includes(searchQuery.value.toLowerCase()))

      const matchesSpecialty = !selectedSpecialty.value || h.specialties.includes(selectedSpecialty.value)
      const matchesSeniority = !selectedSeniority.value || h.senioritiesServed.includes(selectedSeniority.value)
      const matchesModel = !selectedServiceModel.value || h.serviceModel === selectedServiceModel.value

      return matchesSearch && matchesSpecialty && matchesSeniority && matchesModel
    })
  })

  // Pending Hunters for Admin Approval (RF-003)
  const pendingHunters = computed(() => {
    return hunters.value.filter(h => h.status === 'Pendente')
  })

  function setHunterStatus(id: string, newStatus: HunterApprovalStatus) {
    const hunter = hunters.value.find(h => h.id === id)
    if (hunter) {
      hunter.status = newStatus
    }
  }

  function incrementHunterContact(id: string) {
    const hunter = hunters.value.find(h => h.id === id)
    if (hunter) {
      hunter.totalContactsCount += 1
    }
  }

  function registerHunter(newHunter: Omit<HunterProfile, 'id' | 'status' | 'rating' | 'totalContactsCount' | 'createdAt'>) {
    if (isCpfRegistered(newHunter.cpf)) {
      throw new Error('CPF já cadastrado na plataforma para outro Job Hunter.')
    }

    const hunter: HunterProfile = {
      ...newHunter,
      id: `hunt-${Date.now()}`,
      status: 'Pendente', // Admins approve RF-003
      rating: 5.0,
      totalContactsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    hunters.value.unshift(hunter)
    return hunter
  }

  return {
    hunters,
    searchQuery,
    selectedSpecialty,
    selectedSeniority,
    selectedServiceModel,
    approvedHunters,
    filteredHunters,
    pendingHunters,
    isCpfRegistered,
    setHunterStatus,
    incrementHunterContact,
    registerHunter,
  }
})
