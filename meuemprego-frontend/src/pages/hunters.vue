<template>
  <div>
    <!-- Header Banner -->
    <v-card class="glass-panel pa-6 pa-md-8 rounded-2xl mb-6" elevation="0">
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center gap-2 mb-2">
            <span class="glass-badge text-primary">Catálogo Público</span>
            <span class="glass-badge text-secondary">Duplo Fluxo Gratuito</span>
            <span class="glass-badge text-success">
              <v-icon icon="mdi-flash-outline" size="14" start></v-icon>
              Busca em &lt; 100ms
            </span>
          </div>
          <h1 class="text-h3 font-weight-black gradient-text mb-2">
            Encontre seu Job Hunter Ideal
          </h1>
          <p class="text-subtitle-1 text-grey-lighten-1 mb-0 max-w-650">
            Conecte-se diretamente via LinkedIn ou WhatsApp com consultores de carreira especializados na sua área e nível de senioridade.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-end">
          <v-btn
            to="/cadastro"
            class="glass-btn-primary px-6"
            size="large"
            rounded="pill"
            prepend-icon="mdi-account-plus-outline"
          >
            Cadastrar Perfil Grátis
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Filters Section -->
    <v-card class="glass-panel pa-5 rounded-2xl mb-6" elevation="0">
      <v-row density="comfortable" align="center">
        <!-- Search Input -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="huntersStore.searchQuery"
            placeholder="Pesquisar por nome, especialidade..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            hide-details
            rounded="pill"
            clearable
            @update:model-value="page = 1"
          ></v-text-field>
        </v-col>

        <!-- Specialty Filter -->
        <v-col cols="12" sm="4" md="3">
          <v-select
            v-model="huntersStore.selectedSpecialty"
            :items="specialtyOptions"
            label="Especialização"
            variant="outlined"
            density="compact"
            hide-details
            rounded="pill"
            clearable
            @update:model-value="page = 1"
          ></v-select>
        </v-col>

        <!-- Seniority Filter -->
        <v-col cols="12" sm="4" md="3">
          <v-select
            v-model="huntersStore.selectedSeniority"
            :items="seniorityOptions"
            label="Senioridade Atendida"
            variant="outlined"
            density="compact"
            hide-details
            rounded="pill"
            clearable
            @update:model-value="page = 1"
          ></v-select>
        </v-col>

        <!-- Service Model Filter -->
        <v-col cols="12" sm="4" md="2">
          <v-select
            v-model="huntersStore.selectedServiceModel"
            :items="serviceModelOptions"
            label="Modelo"
            variant="outlined"
            density="compact"
            hide-details
            rounded="pill"
            clearable
            @update:model-value="page = 1"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>

    <!-- Results Count Bar -->
    <div class="d-flex align-center justify-space-between mb-4 px-2">
      <div class="text-subtitle-2 text-grey">
        Exibindo <strong class="text-white">{{ paginatedHunters.length }}</strong> de <strong class="text-white">{{ huntersStore.filteredHunters.length }}</strong> Job Hunters
      </div>
      <div class="text-caption text-grey d-flex align-center">
        <v-icon icon="mdi-shield-check" color="success" class="mr-1" size="16"></v-icon>
        Página {{ page }} de {{ totalPages || 1 }}
      </div>
    </div>

    <!-- Job Hunters Grid (RF-004 & RF-009) -->
    <v-row v-if="paginatedHunters.length > 0">
      <v-col
        v-for="hunter in paginatedHunters"
        :key="hunter.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="glass-panel glass-panel-hover pa-6 rounded-2xl h-100 d-flex flex-column" elevation="0">
          <div class="d-flex align-start gap-3 mb-4">
            <v-avatar size="64" class="elevation-4 border-glass cursor-pointer" @click="openDetailModal(hunter)">
              <v-img :src="hunter.avatar" :alt="hunter.name"></v-img>
            </v-avatar>
            <div class="flex-grow-1">
              <h3
                class="text-h6 font-weight-bold gradient-text-subtle pa-0 ma-0 cursor-pointer"
                @click="openDetailModal(hunter)"
              >
                {{ hunter.name }}
              </h3>
              <div class="text-caption text-secondary font-weight-bold mb-1">{{ hunter.serviceModel }}</div>
              <div class="d-flex align-center text-caption text-amber-accent-2">
                <v-icon icon="mdi-star" size="14" class="mr-1"></v-icon>
                <span class="font-weight-bold mr-2">{{ hunter.rating }}</span>
                <span class="text-grey">({{ hunter.totalContactsCount }} abordagens)</span>
              </div>
            </div>
          </div>

          <p class="text-body-2 text-grey-lighten-1 mb-4 flex-grow-1">
            {{ hunter.headline }}
          </p>

          <!-- Specialties Chips -->
          <div class="mb-4 d-flex flex-wrap gap-1">
            <span
              v-for="spec in hunter.specialties"
              :key="spec"
              class="glass-badge text-caption py-1 px-3"
            >
              {{ spec }}
            </span>
          </div>

          <!-- Seniority Chips -->
          <div class="mb-5">
            <div class="text-caption text-grey mb-1 font-weight-bold">Senioridades Atendidas:</div>
            <div class="d-flex flex-wrap gap-1">
              <v-chip
                v-for="sen in hunter.senioritiesServed"
                :key="sen"
                size="x-small"
                variant="outlined"
                color="secondary"
                class="font-weight-medium"
              >
                {{ sen }}
              </v-chip>
            </div>
          </div>

          <v-divider class="my-3 opacity-20"></v-divider>

          <!-- Redirection Buttons (RF-006 & RF-007) -->
          <div class="d-flex gap-2">
            <v-btn
              flex="1"
              color="success"
              variant="flat"
              rounded="pill"
              class="flex-grow-1 font-weight-bold"
              prepend-icon="mdi-whatsapp"
              @click="openWhatsAppModal(hunter)"
            >
              WhatsApp
            </v-btn>

            <v-btn
              color="info"
              variant="outlined"
              rounded="pill"
              class="font-weight-bold border-glass"
              prepend-icon="mdi-linkedin"
              @click="contactHunterLinkedIn(hunter)"
            >
              LinkedIn
            </v-btn>

            <v-btn
              icon="mdi-information-outline"
              variant="text"
              size="small"
              title="Ver detalhes"
              @click="openDetailModal(hunter)"
            ></v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-card v-else class="glass-panel pa-12 text-center rounded-2xl" elevation="0">
      <v-icon icon="mdi-account-search-outline" size="64" color="grey" class="mb-3"></v-icon>
      <h3 class="text-h6 font-weight-bold gradient-text-subtle mb-2">Nenhum Job Hunter encontrado</h3>
      <p class="text-body-2 text-grey mb-4">Tente ajustar os filtros de busca ou especialização.</p>
      <v-btn
        variant="outlined"
        rounded="pill"
        @click="resetFilters"
      >
        Limpar Filtros
      </v-btn>
    </v-card>

    <!-- Pagination Controls (RF-009) -->
    <div v-if="totalPages > 1" class="d-flex justify-center mt-6">
      <v-pagination
        v-model="page"
        :length="totalPages"
        rounded="circle"
        active-color="primary"
        color="white"
        elevation="0"
        class="glass-panel pa-1 rounded-pill"
      ></v-pagination>
    </div>

    <!-- WhatsApp Pre-Formatted Message Dialog (RF-006) -->
    <WhatsAppContactModal
      v-model="showWhatsAppDialog"
      :target-profile="selectedHunter"
      target-type="hunter"
    />

    <!-- Hunter Detail Dialog (RF-004) -->
    <v-dialog v-model="showDetailDialog" max-width="600">
      <v-card class="glass-panel pa-6 rounded-2xl" elevation="0" v-if="selectedHunter">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center gap-3">
            <v-avatar size="64" class="elevation-4">
              <v-img :src="selectedHunter.avatar"></v-img>
            </v-avatar>
            <div>
              <h3 class="text-h6 font-weight-bold gradient-text pa-0 ma-0">{{ selectedHunter.name }}</h3>
              <div class="text-caption text-secondary font-weight-bold">{{ selectedHunter.serviceModel }}</div>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showDetailDialog = false"></v-btn>
        </div>

        <div class="mb-4">
          <div class="text-subtitle-2 font-weight-bold text-white mb-1">Headline</div>
          <p class="text-body-2 text-grey-lighten-1">{{ selectedHunter.headline }}</p>
        </div>

        <div class="mb-4">
          <div class="text-subtitle-2 font-weight-bold text-white mb-1">Biografia e Metodologia</div>
          <p class="text-body-2 text-grey-lighten-1">{{ selectedHunter.bio }}</p>
        </div>

        <div class="d-flex justify-end gap-2">
          <v-btn variant="text" rounded="pill" @click="showDetailDialog = false">Fechar</v-btn>
          <v-btn color="success" rounded="pill" prepend-icon="mdi-whatsapp" @click="showDetailDialog = false; openWhatsAppModal(selectedHunter)">
            Chamar no WhatsApp
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useHuntersStore } from '@/stores/hunters'
import { useMetricsStore } from '@/stores/metrics'
import { useAuthStore } from '@/stores/auth'
import WhatsAppContactModal from '@/components/WhatsAppContactModal.vue'
import type { HunterProfile } from '@/types'

const huntersStore = useHuntersStore()
const metricsStore = useMetricsStore()
const authStore = useAuthStore()

const page = ref(1)
const itemsPerPage = ref(6)

const totalPages = computed(() => Math.ceil(huntersStore.filteredHunters.length / itemsPerPage.value))

const paginatedHunters = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return huntersStore.filteredHunters.slice(start, end)
})

const showWhatsAppDialog = ref(false)
const showDetailDialog = ref(false)
const selectedHunter = ref<HunterProfile | null>(null)

const specialtyOptions = [
  'Tecnologia da Informação',
  'Produtos & Design',
  'Finanças',
  'Vendas / Comercial',
  'Recursos Humanos',
  'Carreira Internacional',
  'Data & Analytics',
]

const seniorityOptions = ['Junior', 'Pleno', 'Senior', 'Especialista', 'Liderança / C-Level']
const serviceModelOptions = ['Assessoria Completa', 'Mentoria de Carreira', 'Revisão de LinkedIn/CV', 'Sessão Individual']

function resetFilters() {
  huntersStore.searchQuery = ''
  huntersStore.selectedSpecialty = null
  huntersStore.selectedSeniority = null
  huntersStore.selectedServiceModel = null
  page.value = 1
}

function openWhatsAppModal(hunter: HunterProfile) {
  selectedHunter.value = hunter
  showWhatsAppDialog.value = true
}

function openDetailModal(hunter: HunterProfile) {
  selectedHunter.value = hunter
  showDetailDialog.value = true
}

function contactHunterLinkedIn(hunter: HunterProfile) {
  huntersStore.incrementHunterContact(hunter.id)
  metricsStore.triggerContactRedirection(
    'hunter',
    hunter.id,
    hunter.name,
    'linkedin',
    hunter.linkedInUrl,
    '',
    authStore.currentRole
  )
}
</script>

<style scoped>
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.max-w-650 { max-width: 650px; }
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px);
}
</style>
