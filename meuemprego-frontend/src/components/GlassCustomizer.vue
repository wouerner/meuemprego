<template>
  <v-card class="glass-panel pa-6 rounded-xl h-100" elevation="0">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h5 font-weight-bold gradient-text">Laboratório Glassmorphism</h3>
        <p class="text-subtitle-2 text-grey">Ajuste os parâmetros de desfoque e opacidade ao vivo</p>
      </div>
      <v-avatar color="secondary" size="40">
        <v-icon icon="mdi-tune-variant" color="white"></v-icon>
      </v-avatar>
    </div>

    <v-row class="mt-2">
      <!-- Controls -->
      <v-col cols="12" md="6">
        <div class="mb-4">
          <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
            <span>Desfoque de Fundo (Blur)</span>
            <span class="text-secondary">{{ blur }}px</span>
          </div>
          <v-slider
            v-model="blur"
            min="0"
            max="40"
            step="1"
            color="secondary"
            track-color="rgba(255,255,255,0.1)"
            hide-details
          ></v-slider>
        </div>

        <div class="mb-4">
          <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
            <span>Opacidade do Fundo</span>
            <span class="text-primary">{{ opacity }}%</span>
          </div>
          <v-slider
            v-model="opacity"
            min="5"
            max="95"
            step="5"
            color="primary"
            track-color="rgba(255,255,255,0.1)"
            hide-details
          ></v-slider>
        </div>

        <div class="mb-4">
          <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
            <span>Opacidade da Borda</span>
            <span class="text-accent">{{ borderOpacity }}%</span>
          </div>
          <v-slider
            v-model="borderOpacity"
            min="0"
            max="80"
            step="5"
            color="accent"
            track-color="rgba(255,255,255,0.1)"
            hide-details
          ></v-slider>
        </div>

        <div class="mb-4">
          <div class="d-flex justify-space-between text-caption font-weight-bold mb-1">
            <span>Raio da Borda</span>
            <span class="text-info">{{ borderRadius }}px</span>
          </div>
          <v-slider
            v-model="borderRadius"
            min="0"
            max="40"
            step="2"
            color="info"
            track-color="rgba(255,255,255,0.1)"
            hide-details
          ></v-slider>
        </div>
      </v-col>

      <!-- Live Preview -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <div
          class="custom-preview-card pa-6 w-100 d-flex flex-column align-center justify-center text-center"
          :style="computedCardStyle"
        >
          <v-icon icon="mdi-sparkles" size="36" color="amber-accent-2" class="mb-2"></v-icon>
          <div class="text-h6 font-weight-bold">Preview em Tempo Real</div>
          <div class="text-caption text-grey-lighten-1 mb-4">
            Custom Glass Component
          </div>
          <button class="glass-btn-primary px-5 py-2 rounded-pill text-caption font-weight-bold">
            Ação Interativa
          </button>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const blur = ref(16)
const opacity = ref(40)
const borderOpacity = ref(20)
const borderRadius = ref(24)

const computedCardStyle = computed(() => {
  return {
    background: `rgba(255, 255, 255, ${opacity.value / 100})`,
    backdropFilter: `blur(${blur.value}px) saturate(180%)`,
    webkitBackdropFilter: `blur(${blur.value}px) saturate(180%)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity.value / 100})`,
    borderRadius: `${borderRadius.value}px`,
    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, ${borderOpacity.value / 100})`,
    minHeight: '200px',
    transition: 'all 0.15s ease',
  }
})
</script>

<style scoped>
.custom-preview-card {
  position: relative;
  overflow: hidden;
}
</style>
