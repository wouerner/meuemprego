// Common Base Profile Interface
export type UserRole = 'candidato' | 'hunter' | 'admin' | 'visitante'

export interface BaseProfile {
  id: string
  name: string
  cpf: string
  email: string
  avatar: string
  headline: string
  linkedInUrl: string
  whatsappNumber: string
  createdAt: string
  password?: string
}

// Seniority Levels
export type SeniorityLevel = 'Junior' | 'Pleno' | 'Senior' | 'Especialista' | 'Liderança / C-Level'

// Professional Moment Status
export type CandidateStatus = 'Ativo' | 'Em Transição' | 'Buscando recolocação' | 'Aberto a Propostas'

// Candidate / Professional Profile (RF-002)
export interface CandidateProfile extends BaseProfile {
  seniority: SeniorityLevel
  area: string
  careerGoal: string
  professionalMoment: CandidateStatus
  requestHunterContact: boolean // Opt-in for Talent Pool
  lgpdConsent: boolean
  isApproved: boolean
}

export type HunterApprovalStatus = 'Pendente' | 'Aprovado' | 'Rejeitado'

// Job Hunter / Career Coach Profile (RF-004)
export interface HunterProfile extends BaseProfile {
  bio: string
  specialties: string[]
  senioritiesServed: SeniorityLevel[]
  serviceModel: 'Assessoria Completa' | 'Mentoria de Carreira' | 'Revisão de LinkedIn/CV' | 'Sessão Individual'
  status: HunterApprovalStatus
  rating: number
  totalContactsCount: number
}

// Interaction Event Metric (RF-007)
export interface MetricEvent {
  id: string
  targetType: 'hunter' | 'candidate'
  targetId: string
  targetName: string
  channel: 'whatsapp' | 'linkedin'
  timestamp: string
  initiatedByRole: UserRole
}

// Algorithmic CPF Checksum Validation Helper (RF-008)
export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false
  const cleanCPF = cpf.replace(/\D/g, '')

  if (cleanCPF.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false // Reject repetitive digits like 111.111.111-11

  let sum = 0
  let remainder: number

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false

  return true
}

// CPF Formatting Helper
export function formatCPF(cpf: string): string {
  const clean = cpf.replace(/\D/g, '').substring(0, 11)
  return clean
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}
