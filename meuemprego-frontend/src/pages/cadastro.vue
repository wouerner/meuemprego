<template>
  <div>
    <!-- Header Banner -->
    <v-card class="glass-panel pa-6 pa-md-8 rounded-2xl mb-6" elevation="0">
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center gap-2 mb-2">
            <span class="glass-badge text-primary">Cadastro Gratuito</span>
            <span class="glass-badge text-accent">Perfil Protegido</span>
            <span class="glass-badge text-success">Validação de CPF & Credenciais</span>
          </div>
          <h1 class="text-h3 font-weight-black gradient-text mb-2">
            Gestão de Perfil Profissional
          </h1>
          <p class="text-subtitle-1 text-grey-lighten-1 mb-0 max-w-650">
            Cadastre seu perfil profissional ou de consultor gratuitamente. Preencha seu e-mail e crie uma senha segura para gerenciar sua conta no meuemprego.pro.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-end">
          <v-chip-group v-model="profileType" mandatory color="primary" class="d-inline-flex">
            <v-chip value="candidato" filter class="font-weight-bold">Perfil Profissional</v-chip>
            <v-chip value="hunter" filter class="font-weight-bold">Sou Job Hunter</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card>

    <v-row justify="center">
      <v-col cols="12" lg="10">
        <v-card class="glass-panel pa-6 pa-md-8 rounded-2xl" elevation="0">
          <v-form ref="formRef" v-model="isFormValid" @submit.prevent="submitForm">
            <!-- Form Header -->
            <div class="d-flex align-center justify-space-between mb-6">
              <div>
                <h2 class="text-h5 font-weight-bold gradient-text-subtle">
                  {{ profileType === 'candidato' ? 'Perfil Profissional' : 'Perfil do Job Hunter / Coach' }}
                </h2>
                <div class="text-caption text-grey">Preencha os campos obrigatórios (*) para criar seu login e cadastrar seu perfil.</div>
              </div>
              <v-avatar color="primary" size="48">
                <v-icon :icon="profileType === 'candidato' ? 'mdi-account-school' : 'mdi-account-tie'" size="28"></v-icon>
              </v-avatar>
            </div>

            <!-- Error Banner for Duplicate CPF -->
            <v-alert
              v-if="errorMessage"
              type="error"
              variant="tonal"
              closable
              rounded="xl"
              class="mb-4 font-weight-bold"
              @click:close="errorMessage = ''"
            >
              {{ errorMessage }}
            </v-alert>

            <v-row density="comfortable">
              <!-- Name, Email & CPF -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.name"
                  label="Nome Completo *"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.email"
                  label="E-mail Profissional *"
                  type="email"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formData.cpf"
                  label="CPF (Obrigatório - Anti-Duplicidade) *"
                  placeholder="000.000.000-00"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  hint="Protegido por criptografia sob LGPD"
                  persistent-hint
                  :rules="[rules.required, rules.cpfValid, rules.cpfNotDuplicate]"
                  @input="handleCpfInput"
                ></v-text-field>
              </v-col>

              <!-- PASSWORD & CONFIRM PASSWORD -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.password"
                  label="Senha de Acesso *"
                  placeholder="••••••••"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  :rules="[rules.required, rules.minLength]"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.confirmPassword"
                  label="Confirmar Senha *"
                  placeholder="••••••••"
                  prepend-inner-icon="mdi-lock-check-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  :rules="[rules.required, rules.passwordMatch]"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
              </v-col>

              <!-- Headline -->
              <v-col cols="12">
                <v-text-field
                  v-model="formData.headline"
                  label="Título Profissional (Headline) *"
                  placeholder="Ex: Engenheiro de Software Senior | Especialista Vue & Node"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <!-- MANDATORY CONTACT LINKS -->
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.linkedInUrl"
                  label="URL do Perfil no LinkedIn (Obrigatório) *"
                  placeholder="https://www.linkedin.com/in/seu-perfil"
                  prepend-inner-icon="mdi-linkedin"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  :rules="[rules.required, rules.url]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="formData.whatsappNumber"
                  label="Número do WhatsApp com DDD (Obrigatório) *"
                  placeholder="5511999998888"
                  prepend-inner-icon="mdi-whatsapp"
                  variant="outlined"
                  density="comfortable"
                  rounded="lg"
                  hint="Apenas números incluindo código do país (55)"
                  persistent-hint
                  :rules="[rules.required, rules.phone]"
                ></v-text-field>
              </v-col>

              <!-- PROFESSIONAL PROFILE SPECIFIC FIELDS -->
              <template v-if="profileType === 'candidato'">
                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.seniority"
                    :items="seniorityOptions"
                    label="Senioridade Atual *"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.area"
                    :items="areaOptions"
                    label="Área de Atuação *"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.professionalMoment"
                    :items="momentOptions"
                    label="Momento Profissional *"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="formData.careerGoal"
                    label="Objetivo de Carreira *"
                    placeholder="Descreva a vaga ou cadeira almejada (ex: Transição para vaga de Tech Lead internacional remota)"
                    rows="3"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.required]"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <div class="glass-panel pa-4 rounded-xl border-accent">
                    <v-switch
                      v-model="formData.requestHunterContact"
                      color="secondary"
                      hide-details
                    >
                      <template #label>
                        <div>
                          <strong class="text-white">Solicitar contato de Hunters (Exibir na Vitrine de Profissionais)</strong>
                          <div class="text-caption text-grey">
                            Ao marcar esta opção, seu perfil profissional aparecerá na Vitrine para que Job Hunters entrem em contato diretamente.
                          </div>
                        </div>
                      </template>
                    </v-switch>
                  </div>
                </v-col>
              </template>

              <!-- HUNTER SPECIFIC FIELDS -->
              <template v-else>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.specialties"
                    :items="areaOptions"
                    label="Especializações de Atendimento *"
                    multiple
                    chips
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.arrayRequired]"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.serviceModel"
                    :items="serviceModelOptions"
                    label="Modelo Principal de Atendimento *"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.required]"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="formData.bio"
                    label="Biografia e Metodologia de Assessoria *"
                    rows="3"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    :rules="[rules.required]"
                  ></v-textarea>
                </v-col>
              </template>

              <!-- LGPD & CPF PRIVACY CONSENT -->
              <v-col cols="12" class="mt-2">
                <div class="glass-panel pa-4 rounded-xl">
                  <v-checkbox
                    v-model="formData.lgpdConsent"
                    color="success"
                    hide-details
                    :rules="[rules.mustBeTrue]"
                  >
                    <template #label>
                      <div class="text-caption text-grey-lighten-1">
                        Li e concordo com os <a class="text-secondary cursor-pointer" @click.stop="showLgpdModal = true">Termos de Privacidade e Proteção de Dados (LGPD)</a>. O meu CPF será utilizado exclusivamente para validação anti-duplicidade e NUNCA será exibido publicamente.
                      </div>
                    </template>
                  </v-checkbox>
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-6 opacity-20"></v-divider>

            <!-- Form Actions -->
            <div class="d-flex justify-end gap-3">
              <v-btn
                type="submit"
                class="glass-btn-primary px-8"
                size="large"
                rounded="pill"
                :disabled="!isFormValid"
                prepend-icon="mdi-check-circle-outline"
              >
                Salvar Perfil e Credenciais
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Success Snackbar -->
    <v-snackbar v-model="showSnackbar" color="success" timeout="3000" rounded="pill">
      <v-icon icon="mdi-check-circle" start></v-icon>
      Perfil e credenciais salvos com sucesso!
    </v-snackbar>

    <!-- LGPD Modal Dialog -->
    <v-dialog v-model="showLgpdModal" max-width="600">
      <v-card class="glass-panel pa-6 rounded-2xl" elevation="0">
        <div class="d-flex align-center justify-space-between mb-4">
          <h3 class="text-h6 font-weight-bold gradient-text">Termos de Privacidade e Validação de CPF</h3>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showLgpdModal = false"></v-btn>
        </div>

        <div class="text-body-2 text-grey-lighten-1 space-y-3 mb-4 max-h-350 overflow-y-auto pr-2">
          <p>
            <strong>1. Coleta de Dados e CPF:</strong> Coletamos seu nome, CPF, e-mail, perfil do LinkedIn e WhatsApp para validar a autenticidade e evitar a criação de perfis duplicados na plataforma meuemprego.pro.
          </p>
          <p>
            <strong>2. Sigilo Absoluto do CPF:</strong> Seu CPF é um dado protegido. Ele é utilizado unicamente em rotinas internas de verificação de unicidade e Jamais será compartilhado ou exposto para consultores ou terceiros.
          </p>
          <p>
            <strong>3. Direitos do Titular:</strong> Você tem o direito de solicitar a exclusão de seu cadastro e dados associados a qualquer momento.
          </p>
        </div>

        <div class="d-flex justify-end">
          <v-btn class="glass-btn-primary" rounded="pill" @click="showLgpdModal = false">Compreendi</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useCandidatesStore } from '@/stores/candidates'
import { useHuntersStore } from '@/stores/hunters'
import { isValidCPF, formatCPF } from '@/types'

const authStore = useAuthStore()
const candidatesStore = useCandidatesStore()
const huntersStore = useHuntersStore()

const profileType = ref<'candidato' | 'hunter'>(authStore.currentRole === 'hunter' ? 'hunter' : 'candidato')
const formRef = ref()
const isFormValid = ref(false)
const showSnackbar = ref(false)
const showLgpdModal = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const areaOptions = [
  'Tecnologia da Informação',
  'Produtos & Design',
  'Finanças',
  'Vendas / Comercial',
  'Recursos Humanos',
  'Data & Analytics',
]
const seniorityOptions = ['Junior', 'Pleno', 'Senior', 'Especialista', 'Liderança / C-Level']
const momentOptions = ['Ativo', 'Em Transição', 'Buscando recolocação', 'Aberto a Propostas']
const serviceModelOptions = ['Assessoria Completa', 'Mentoria de Carreira', 'Revisão de LinkedIn/CV', 'Sessão Individual']

const formData = reactive({
  name: authStore.candidateUser.name,
  cpf: authStore.candidateUser.cpf || '',
  email: authStore.candidateUser.email,
  password: authStore.candidateUser.password || 'password123',
  confirmPassword: authStore.candidateUser.password || 'password123',
  headline: authStore.candidateUser.headline,
  linkedInUrl: authStore.candidateUser.linkedInUrl,
  whatsappNumber: authStore.candidateUser.whatsappNumber,
  seniority: authStore.candidateUser.seniority,
  area: authStore.candidateUser.area,
  professionalMoment: authStore.candidateUser.professionalMoment,
  careerGoal: authStore.candidateUser.careerGoal,
  requestHunterContact: authStore.candidateUser.requestHunterContact,
  specialties: ['Tecnologia da Informação'],
  serviceModel: 'Assessoria Completa',
  bio: '',
  lgpdConsent: true,
})

function handleCpfInput() {
  formData.cpf = formatCPF(formData.cpf)
}

const rules = {
  required: (v: any) => !!v || 'Campo obrigatório',
  arrayRequired: (v: any[]) => (v && v.length > 0) || 'Selecione ao menos um item',
  minLength: (v: string) => (v && v.length >= 6) || 'Mínimo de 6 caracteres',
  passwordMatch: (v: string) => v === formData.password || 'As senhas não coincidem',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  url: (v: string) => /https?:\/\/.+/.test(v) || 'URL precisa iniciar com http:// ou https://',
  phone: (v: string) => /^\d{10,13}$/.test(v.replace(/\D/g, '')) || 'Informe apenas números com DDD (ex: 5511999998888)',
  cpfValid: (v: string) => isValidCPF(v) || 'CPF inválido. Verifique os dígitos digitados.',
  cpfNotDuplicate: (v: string) => {
    if (!v || !isValidCPF(v)) return true
    const isDupCandidate = profileType.value === 'candidato' && candidatesStore.isCpfRegistered(v) && v !== authStore.candidateUser.cpf
    const isDupHunter = profileType.value === 'hunter' && huntersStore.isCpfRegistered(v) && v !== authStore.hunterUser.cpf
    return (!isDupCandidate && !isDupHunter) || 'Este CPF já está cadastrado em outro perfil.'
  },
  mustBeTrue: (v: boolean) => v === true || 'É necessário aceitar os termos da LGPD',
}

watch(profileType, (newType) => {
  authStore.setRole(newType)
  errorMessage.value = ''
})

function submitForm() {
  errorMessage.value = ''

  try {
    if (profileType.value === 'candidato') {
      authStore.updateCandidateProfile({
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
        headline: formData.headline,
        linkedInUrl: formData.linkedInUrl,
        whatsappNumber: formData.whatsappNumber,
        seniority: formData.seniority as any,
        area: formData.area,
        professionalMoment: formData.professionalMoment as any,
        careerGoal: formData.careerGoal,
        requestHunterContact: formData.requestHunterContact,
        lgpdConsent: formData.lgpdConsent,
      })

      candidatesStore.registerCandidate({
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
        avatar: authStore.candidateUser.avatar,
        headline: formData.headline,
        seniority: formData.seniority as any,
        area: formData.area,
        careerGoal: formData.careerGoal,
        professionalMoment: formData.professionalMoment as any,
        requestHunterContact: formData.requestHunterContact,
        linkedInUrl: formData.linkedInUrl,
        whatsappNumber: formData.whatsappNumber,
        lgpdConsent: formData.lgpdConsent,
      })
    } else {
      huntersStore.registerHunter({
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
        avatar: authStore.hunterUser.avatar,
        headline: formData.headline,
        bio: formData.bio || 'Consultor de carreira especialista.',
        specialties: formData.specialties,
        senioritiesServed: ['Senior', 'Especialista'],
        serviceModel: formData.serviceModel as any,
        linkedInUrl: formData.linkedInUrl,
        whatsappNumber: formData.whatsappNumber,
      })
    }

    showSnackbar.value = true
  } catch (err: any) {
    errorMessage.value = err.message || 'Erro ao realizar cadastro.'
  }
}
</script>

<style scoped>
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.max-w-650 { max-width: 650px; }
.max-h-350 { max-height: 350px; }
.border-accent {
  border: 1px solid rgba(139, 92, 246, 0.4) !important;
}
</style>
