<template>
  <v-card class="glass-panel pa-6 rounded-xl h-100" elevation="0">
    <div class="d-flex align-center justify-space-between mb-6 flex-wrap gap-2">
      <div>
        <h3 class="text-h5 font-weight-bold gradient-text-subtle">Atividade de Rendimento</h3>
        <p class="text-subtitle-2 text-grey">Visão analítica dos acessos e transações</p>
      </div>

      <div class="d-flex gap-2">
        <v-btn
          v-for="tf in timeframes"
          :key="tf"
          size="small"
          rounded="pill"
          :class="selectedTimeframe === tf ? 'glass-btn-primary' : 'bg-transparent text-grey'"
          variant="flat"
          @click="selectedTimeframe = tf"
        >
          {{ tf }}
        </v-btn>
      </div>
    </div>

    <!-- Chart Visualization (SVG Glass Gradient Bars & Sparkline) -->
    <div class="chart-container py-4">
      <div class="bars-wrapper d-flex align-end justify-space-between h-100 gap-2 px-2">
        <div
          v-for="(bar, index) in activeData"
          :key="index"
          class="bar-item d-flex flex-column align-center flex-grow-1"
        >
          <div class="bar-tooltip text-caption font-weight-bold mb-2 opacity-0">{{ bar.value }}k</div>
          <div
            class="glass-bar w-100 rounded-t-lg"
            :style="{
              height: bar.height + '%',
              background: index === activeHover ? 'linear-gradient(180deg, #ec4899 0%, #8b5cf6 100%)' : 'linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, rgba(6, 182, 212, 0.3) 100%)'
            }"
            @mouseenter="activeHover = index"
            @mouseleave="activeHover = null"
          ></div>
          <span class="text-caption text-grey mt-2 font-weight-medium">{{ bar.label }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom Stat Summary -->
    <v-divider class="my-4 opacity-20"></v-divider>
    <div class="d-flex justify-space-around text-center pt-2">
      <div>
        <div class="text-caption text-grey">Média Diária</div>
        <div class="text-subtitle-1 font-weight-bold text-secondary">8.420 req/s</div>
      </div>
      <div>
        <div class="text-caption text-grey">Pico de Banda</div>
        <div class="text-subtitle-1 font-weight-bold text-accent">1.2 GB/s</div>
      </div>
      <div>
        <div class="text-caption text-grey">Disponibilidade</div>
        <div class="text-subtitle-1 font-weight-bold text-success">99.98%</div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const timeframes = ['7D', '30D', '1A']
const selectedTimeframe = ref('7D')
const activeHover = ref<number | null>(null)

const data7D = [
  { label: 'Seg', height: 45, value: '12.4' },
  { label: 'Ter', height: 65, value: '18.2' },
  { label: 'Qua', height: 85, value: '24.9' },
  { label: 'Qui', height: 55, value: '15.1' },
  { label: 'Sex', height: 95, value: '31.0' },
  { label: 'Sáb', height: 70, value: '21.5' },
  { label: 'Dom', height: 60, value: '17.8' },
]

const data30D = [
  { label: 'Sem 1', height: 50, value: '62.0' },
  { label: 'Sem 2', height: 75, value: '89.4' },
  { label: 'Sem 3', height: 90, value: '112.5' },
  { label: 'Sem 4', height: 68, value: '81.2' },
]

const data1A = [
  { label: 'Jan', height: 40, value: '210' },
  { label: 'Abr', height: 60, value: '340' },
  { label: 'Jul', height: 80, value: '490' },
  { label: 'Out', height: 100, value: '680' },
]

const activeData = computed(() => {
  if (selectedTimeframe.value === '30D') return data30D
  if (selectedTimeframe.value === '1A') return data1A
  return data7D
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
.chart-container {
  height: 220px;
  position: relative;
}
.glass-bar {
  min-height: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  cursor: pointer;
}
.glass-bar:hover {
  filter: brightness(1.2);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.5);
}
.bar-item:hover .bar-tooltip {
  opacity: 1 !important;
}
</style>
