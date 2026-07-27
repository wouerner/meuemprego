<template>
  <v-card class="glass-panel glass-panel-hover pa-5 rounded-xl h-100" elevation="0">
    <div class="d-flex align-center justify-space-between mb-4">
      <div class="d-flex align-center gap-3">
        <v-avatar :color="iconColor" size="48" class="elevation-4">
          <v-icon :icon="icon" color="white" size="26"></v-icon>
        </v-avatar>
        <div>
          <div class="text-caption text-uppercase font-weight-bold text-grey-lighten-1 tracking-wider">{{ title }}</div>
          <div class="text-h4 font-weight-black gradient-text-subtle mt-1">{{ value }}</div>
        </div>
      </div>
    </div>

    <div class="d-flex align-center justify-space-between pt-2">
      <div class="d-flex align-center text-caption font-weight-bold" :class="isPositive ? 'text-success' : 'text-error'">
        <v-icon :icon="isPositive ? 'mdi-trending-up' : 'mdi-trending-down'" class="mr-1"></v-icon>
        <span>{{ change }}</span>
        <span class="text-grey ml-1">vs. mês anterior</span>
      </div>

      <span class="glass-badge" :style="{ borderColor: badgeColor }">
        {{ badgeText }}
      </span>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, required: true },
  isPositive: { type: Boolean, default: true },
  icon: { type: String, default: 'mdi-chart-line' },
  iconColor: { type: String, default: 'primary' },
  badgeText: { type: String, default: 'Live' },
})

const badgeColor = computed(() => (props.isPositive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'))
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
.tracking-wider {
  letter-spacing: 1px;
}
</style>
