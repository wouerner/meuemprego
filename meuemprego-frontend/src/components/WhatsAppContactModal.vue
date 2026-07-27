<template>
  <v-dialog :model-value="modelValue" max-width="560" @update:model-value="$emit('update:modelValue', $event)">
    <v-card class="glass-panel pa-6 rounded-2xl" elevation="0" v-if="targetProfile">
      <div class="d-flex align-center justify-space-between mb-4">
        <div class="d-flex align-center gap-3">
          <v-avatar color="success" size="44">
            <v-icon icon="mdi-whatsapp" color="white" size="26"></v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h6 font-weight-bold gradient-text pa-0 ma-0">Iniciar Abordagem via WhatsApp</h3>
            <div class="text-caption text-grey">Destinatário: {{ targetProfile.name }}</div>
          </div>
        </div>
        <v-btn icon="mdi-close" variant="text" size="small" @click="closeModal"></v-btn>
      </div>

      <p class="text-body-2 text-grey-lighten-1 mb-4">
        Selecione um modelo de mensagem pré-formatada ou personalize o texto que será enviado na conversa do WhatsApp:
      </p>

      <!-- Message Templates Chips -->
      <div class="mb-4">
        <div class="text-caption font-weight-bold text-white mb-2">Sugestões de Mensagens:</div>
        <div class="d-flex flex-wrap gap-2">
          <v-chip
            v-for="(tpl, idx) in availableTemplates"
            :key="idx"
            size="small"
            variant="outlined"
            :color="selectedTemplateIndex === idx ? 'secondary' : 'grey'"
            class="cursor-pointer"
            @click="selectTemplate(idx)"
          >
            {{ tpl.label }}
          </v-chip>
        </div>
      </div>

      <!-- Message Text Area -->
      <v-textarea
        v-model="customMessage"
        label="Mensagem Pré-Formatada"
        variant="outlined"
        rows="4"
        rounded="lg"
        class="mb-4"
        density="comfortable"
        hint="Você pode personalizar a mensagem antes de redirecionar para o aplicativo."
        persistent-hint
      ></v-textarea>

      <div class="d-flex justify-end gap-2 mt-2">
        <v-btn variant="text" rounded="pill" @click="closeModal">Cancelar</v-btn>
        <v-btn
          color="success"
          variant="flat"
          rounded="pill"
          prepend-icon="mdi-whatsapp"
          class="font-weight-bold px-6"
          @click="confirmAndRedirect"
        >
          Abrir WhatsApp Agora
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useMetricsStore } from '@/stores/metrics'
import { useAuthStore } from '@/stores/auth'
import { useHuntersStore } from '@/stores/hunters'
import type { CandidateProfile, HunterProfile } from '@/types'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  targetProfile: { type: Object as () => CandidateProfile | HunterProfile | null, default: null },
  targetType: { type: String as () => 'hunter' | 'candidate', required: true },
})

const emit = defineEmits(['update:modelValue'])

const metricsStore = useMetricsStore()
const authStore = useAuthStore()
const huntersStore = useHuntersStore()

const selectedTemplateIndex = ref(0)
const customMessage = ref('')

const availableTemplates = computed(() => {
  if (!props.targetProfile) return []

  if (props.targetType === 'hunter') {
    return [
      {
        label: 'Apresentação Inicial',
        text: `Olá ${props.targetProfile.name}, vi seu perfil no meuemprego.pro e gostaria de agendar uma conversa sobre assessoria de carreira para ${props.targetProfile.headline}.`,
      },
      {
        label: 'Dúvida sobre Serviços',
        text: `Olá ${props.targetProfile.name}, gostaria de saber mais detalhes sobre seu modelo de atendimento (${(props.targetProfile as HunterProfile).serviceModel}).`,
      },
      {
        label: 'Solicitação de Mentoria',
        text: `Olá ${props.targetProfile.name}, estou buscando recolocação/transição e gostaria de saber suas vagas e disponibilidade de agenda.`,
      },
    ]
  } else {
    return [
      {
        label: 'Abordagem Profissional',
        text: `Olá ${props.targetProfile.name}, vi que você ativou o opt-in no meuemprego.pro para o objetivo: "${(props.targetProfile as CandidateProfile).careerGoal}". Teria disponibilidade para conversarmos no WhatsApp?`,
      },
      {
        label: 'Apresentação de Oportunidade',
        text: `Olá ${props.targetProfile.name}, sou Job Hunter e estou trabalhando em oportunidades alinhadas com sua senioridade (${(props.targetProfile as CandidateProfile).seniority}). Podemos falar?`,
      },
      {
        label: 'Agendamento de Diagnóstico',
        text: `Olá ${props.targetProfile.name}, analisei seu título (${props.targetProfile.headline}) e gostaria de oferecer um diagnóstico inicial de carreira.`,
      },
    ]
  }
})

watch(
  () => props.targetProfile,
  () => {
    if (availableTemplates.value.length > 0) {
      selectedTemplateIndex.value = 0
      customMessage.value = availableTemplates.value[0].text
    }
  },
  { immediate: true }
)

function selectTemplate(index: number) {
  selectedTemplateIndex.value = index
  if (availableTemplates.value[index]) {
    customMessage.value = availableTemplates.value[index].text
  }
}

function closeModal() {
  emit('update:modelValue', false)
}

function confirmAndRedirect() {
  if (!props.targetProfile) return

  if (props.targetType === 'hunter') {
    huntersStore.incrementHunterContact(props.targetProfile.id)
  }

  metricsStore.triggerContactRedirection(
    props.targetType,
    props.targetProfile.id,
    props.targetProfile.name,
    'whatsapp',
    props.targetProfile.whatsappNumber,
    customMessage.value,
    authStore.currentRole
  )

  closeModal()
}
</script>

<style scoped>
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
</style>
