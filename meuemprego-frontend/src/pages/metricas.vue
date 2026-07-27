<template>
  <div>
    <!-- Header Banner -->
    <v-card class="glass-panel pa-6 pa-md-8 rounded-2xl mb-6" elevation="0">
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center gap-2 mb-2">
            <span class="glass-badge text-accent">Métricas de Transbordo</span>
            <span class="glass-badge text-primary">Relatórios Ativos</span>
            <span class="glass-badge text-success">Engajamento Paginado</span>
          </div>
          <h1 class="text-h3 font-weight-black gradient-text mb-2">
            Relatório de Tração & Conexões
          </h1>
          <p class="text-subtitle-1 text-grey-lighten-1 mb-0 max-w-650">
            Acompanhe o volume de redirecionamentos bidirecionais efetuados para o LinkedIn e WhatsApp com logs paginados.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-end">
          <v-btn
            color="success"
            variant="flat"
            rounded="pill"
            size="large"
            prepend-icon="mdi-download"
            class="font-weight-bold"
            @click="metricsStore.exportMetricsCsv"
          >
            Exportar Relatório CSV
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Key Metrics Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="text-caption text-grey font-weight-bold">Redirecionamentos WhatsApp</div>
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-h3 font-weight-black text-success">{{ metricsStore.whatsappClicks }}</div>
            <v-avatar color="success" size="48">
              <v-icon icon="mdi-whatsapp" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="text-caption text-grey font-weight-bold">Redirecionamentos LinkedIn</div>
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-h3 font-weight-black text-info">{{ metricsStore.linkedinClicks }}</div>
            <v-avatar color="info" size="48">
              <v-icon icon="mdi-linkedin" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="text-caption text-grey font-weight-bold">Profissional ➔ Hunter</div>
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-h3 font-weight-black text-primary">{{ metricsStore.candidateToHunterClicks }}</div>
            <v-avatar color="primary" size="48">
              <v-icon icon="mdi-arrow-right-bold-circle-outline" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="text-caption text-grey font-weight-bold">Hunter ➔ Profissional</div>
          <div class="d-flex align-center justify-space-between mt-2">
            <div class="text-h3 font-weight-black text-accent">{{ metricsStore.hunterToCandidateClicks }}</div>
            <v-avatar color="accent" size="48">
              <v-icon icon="mdi-account-arrow-right-outline" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Filters and Detailed Events Log Table -->
    <v-card class="glass-panel pa-6 rounded-2xl" elevation="0">
      <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-3">
        <div>
          <h3 class="text-h5 font-weight-bold gradient-text-subtle pa-0 ma-0">Log em Tempo Real (Paginado)</h3>
          <p class="text-caption text-grey pa-0 ma-0">Eventos de redirecionamento salvos no sistema</p>
        </div>

        <!-- Filter controls -->
        <div class="d-flex gap-2 flex-wrap" style="min-width: 320px;">
          <v-select
            v-model="metricsStore.selectedChannelFilter"
            :items="['whatsapp', 'linkedin']"
            label="Canal"
            variant="outlined"
            density="compact"
            hide-details
            rounded="pill"
            clearable
            style="width: 140px;"
            @update:model-value="page = 1"
          ></v-select>

          <v-select
            v-model="metricsStore.selectedTargetTypeFilter"
            :items="['hunter', 'candidate']"
            label="Tipo de Alvo"
            variant="outlined"
            density="compact"
            hide-details
            rounded="pill"
            clearable
            style="width: 160px;"
            @update:model-value="page = 1"
          ></v-select>
        </div>
      </div>

      <v-table class="bg-transparent text-grey-lighten-1">
        <thead>
          <tr>
            <th class="text-left font-weight-bold text-white">Data / Hora</th>
            <th class="text-left font-weight-bold text-white">Fluxo de Origem</th>
            <th class="text-left font-weight-bold text-white">Canal Acionado</th>
            <th class="text-left font-weight-bold text-white">Perfil Destinatário</th>
            <th class="text-left font-weight-bold text-white">Tipo de Alvo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in paginatedEvents" :key="event.id">
            <td class="text-caption font-weight-bold text-white">
              {{ formatDate(event.timestamp) }}
            </td>
            <td>
              <v-chip size="x-small" color="primary" variant="flat" class="text-uppercase font-weight-bold">
                {{ event.initiatedByRole === 'candidato' ? 'profissional' : event.initiatedByRole }}
              </v-chip>
            </td>
            <td>
              <v-chip
                size="small"
                :color="event.channel === 'whatsapp' ? 'success' : 'info'"
                variant="outlined"
                class="font-weight-bold"
              >
                <v-icon :icon="event.channel === 'whatsapp' ? 'mdi-whatsapp' : 'mdi-linkedin'" start size="16"></v-icon>
                {{ event.channel === 'whatsapp' ? 'WhatsApp' : 'LinkedIn' }}
              </v-chip>
            </td>
            <td class="font-weight-bold text-white">
              {{ event.targetName }}
            </td>
            <td>
              <span class="glass-badge" :class="event.targetType === 'hunter' ? 'text-secondary' : 'text-accent'">
                {{ event.targetType === 'hunter' ? 'Job Hunter' : 'Perfil Profissional' }}
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>

      <!-- Pagination Controls for Metrics Logs -->
      <div v-if="totalPages > 1" class="d-flex align-center justify-space-between mt-6 flex-wrap gap-2 pt-2 border-top-glass">
        <div class="text-caption text-grey">
          Mostrando {{ paginatedEvents.length }} de {{ metricsStore.filteredEvents.length }} registros de transbordo
        </div>

        <v-pagination
          v-model="page"
          :length="totalPages"
          rounded="circle"
          active-color="primary"
          color="white"
          elevation="0"
          density="comfortable"
          class="glass-panel pa-1 rounded-pill"
        ></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useMetricsStore } from '@/stores/metrics'

const metricsStore = useMetricsStore()

const page = ref(1)
const itemsPerPage = ref(5)

const totalPages = computed(() => Math.ceil(metricsStore.filteredEvents.length / itemsPerPage.value))

const paginatedEvents = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return metricsStore.filteredEvents.slice(start, end)
})

function formatDate(isoStr: string) {
  try {
    const d = new Date(isoStr)
    return d.toLocaleString('pt-BR')
  } catch {
    return isoStr
  }
}
</script>

<style scoped>
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.max-w-650 { max-width: 650px; }
.border-top-glass {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
