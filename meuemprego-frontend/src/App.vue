<template>
  <div class="glass-wrapper" :class="{ 'theme-light': !isDark }">
    <!-- Ambient Animated Background Orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <v-app style="background: transparent;">
      <!-- Glass Navigation Drawer -->
      <v-navigation-drawer
        v-model="drawer"
        class="glass-drawer px-3 py-4"
        elevation="0"
        floating
      >
        <div class="d-flex align-center gap-3 px-3 mb-6 cursor-pointer" @click="$router.push('/')">
          <v-avatar color="purple-accent-3" size="44" class="elevation-6">
            <v-icon icon="mdi-briefcase-search-outline" color="white" size="26"></v-icon>
          </v-avatar>
          <div>
            <h2 class="text-h6 font-weight-black gradient-text pa-0 ma-0">meuemprego.pro</h2>
            <div class="text-caption text-grey">Marketplace Duplo Fluxo</div>
          </div>
        </div>

        <v-divider class="mb-4 opacity-20"></v-divider>

        <!-- Current Active Role Display (OCULTO TEMPORARIAMENTE)
        <div class="glass-panel pa-3 rounded-xl mb-4 text-center">
          <div class="text-caption text-grey font-weight-bold text-uppercase tracking-wider mb-1">Perfil Ativo</div>
          <v-chip
            :color="roleChipColor"
            variant="flat"
            size="small"
            class="font-weight-bold"
          >
            <v-icon :icon="roleChipIcon" start size="16"></v-icon>
            {{ roleDisplayName }}
          </v-chip>
        </div>
        -->

        <!-- Quick Toggle for Professional Profile to Pause/Activate Contact Requests -->
        <div v-if="authStore.currentRole === 'candidato'" class="glass-panel pa-3 rounded-xl mb-4">
          <div class="d-flex align-center justify-space-between mb-1">
            <span class="text-caption font-weight-bold text-white">Receber Abordagens</span>
            <v-switch
              :model-value="authStore.candidateUser.requestHunterContact"
              color="success"
              hide-details
              density="compact"
              @update:model-value="toggleContactStatus"
            ></v-switch>
          </div>
          <div class="text-caption text-grey">
            {{ authStore.candidateUser.requestHunterContact ? 'Seu perfil profissional está visível.' : 'Seu perfil profissional está OCULTO.' }}
          </div>
        </div>

        <!-- Navigation Menu -->
        <v-list nav density="compact" class="bg-transparent pa-0">
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.to"
            :value="item.title"
            color="primary"
            rounded="xl"
            class="mb-2"
          >
            <template #prepend>
              <v-icon :icon="item.icon" class="mr-3" color="secondary"></v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
            <template #append v-if="item.badge">
              <span class="glass-badge text-accent">{{ item.badge }}</span>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Glass Top App Bar -->
      <v-app-bar
        class="glass-appbar px-4"
        elevation="0"
        height="70"
      >
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          variant="text"
          rounded="circle"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold d-none d-sm-flex cursor-pointer" @click="$router.push('/')">
          <span class="gradient-text-subtle">meuemprego.pro</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Login Link -->
        <v-btn
          to="/login"
          variant="text"
          rounded="pill"
          class="mr-2 text-white font-weight-bold"
          prepend-icon="mdi-login"
        >
          Entrar
        </v-btn>

        <!-- Professional Contact Pause/Active Indicator Button -->
        <v-btn
          v-if="authStore.currentRole === 'candidato'"
          variant="flat"
          size="small"
          rounded="pill"
          class="mr-3 font-weight-bold"
          :color="authStore.candidateUser.requestHunterContact ? 'success' : 'error'"
          :prepend-icon="authStore.candidateUser.requestHunterContact ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @click="toggleContactStatus(!authStore.candidateUser.requestHunterContact)"
        >
          {{ authStore.candidateUser.requestHunterContact ? 'Abordagens Ativas' : 'Abordagens Pausadas' }}
        </v-btn>

        <!-- Role Selector Menu for Demonstration (OCULTO TEMPORARIAMENTE)
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="flat"
              color="surface-variant"
              rounded="pill"
              class="mr-3 text-caption font-weight-bold border-glass"
              prepend-icon="mdi-account-switch-outline"
            >
              Simular Perfil: {{ roleDisplayName }}
            </v-btn>
          </template>
          <v-list class="glass-panel pa-2 rounded-xl" style="min-width: 220px;">
            <v-list-item
              title="Perfil Profissional"
              subtitle="Busca Hunters e solicita contato"
              prepend-icon="mdi-account-school-outline"
              @click="authStore.setRole('candidato')"
              :active="authStore.currentRole === 'candidato'"
              rounded="lg"
            ></v-list-item>
            <v-list-item
              title="Job Hunter / Coach"
              subtitle="Navega na vitrine de profissionais"
              prepend-icon="mdi-account-tie-outline"
              @click="authStore.setRole('hunter')"
              :active="authStore.currentRole === 'hunter'"
              rounded="lg"
            ></v-list-item>
            <v-list-item
              title="Administrador"
              subtitle="Curadoria e moderação"
              prepend-icon="mdi-shield-crown-outline"
              @click="authStore.setRole('admin')"
              :active="authStore.currentRole === 'admin'"
              rounded="lg"
            ></v-list-item>
          </v-list>
        </v-menu>
        -->

        <!-- Theme Switcher -->
        <v-btn
          icon
          variant="text"
          @click="toggleTheme"
          class="mr-2"
          :title="isDark ? 'Modo Claro' : 'Modo Escuro'"
        >
          <v-icon :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'" color="warning"></v-icon>
        </v-btn>

        <!-- Metrics Link Badge -->
        <v-btn
          icon
          variant="text"
          to="/metricas"
          title="Métricas de Transbordo"
          class="mr-2"
        >
          <v-badge :content="metricsStore.totalInteractions" color="accent">
            <v-icon icon="mdi-chart-bell-curve-cumulative"></v-icon>
          </v-badge>
        </v-btn>

        <!-- User Profile Avatar -->
        <v-avatar color="primary" size="40" class="cursor-pointer elevation-4" to="/cadastro">
          <v-img :src="authStore.currentUser.avatar" alt="User"></v-img>
        </v-avatar>
      </v-app-bar>

      <!-- Toast Snackbar for Status Change -->
      <v-snackbar v-model="showStatusToast" :color="toastColor" timeout="2500" rounded="pill">
        <v-icon :icon="toastIcon" start></v-icon>
        {{ toastMessage }}
      </v-snackbar>

      <!-- Main Content Area -->
      <v-main style="position: relative; z-index: 1;" class="d-flex flex-column min-h-screen">
        <v-container fluid class="pa-4 pa-sm-6 flex-grow-1">
          <router-view />
        </v-container>

        <!-- Glassmorphic Global Footer with CNPJ -->
        <v-footer class="glass-footer py-6 px-4 px-sm-8 mt-10">
          <v-container fluid class="pa-0">
            <div class="d-flex flex-column flex-md-row align-center justify-space-between gap-4 text-center text-md-start">
              <div>
                <div class="d-flex align-center justify-center justify-md-start gap-2 mb-1">
                  <span class="font-weight-black gradient-text text-subtitle-1">meuemprego.pro</span>
                </div>
                <div class="text-caption text-grey-lighten-1">
                  CNPJ: <strong class="text-white">32.944.459/0001-30</strong> — Conexão transparente e direta para carreiras
                </div>
              </div>

              <div class="text-caption text-grey text-center text-md-end">
                <div>© 2026 meuemprego.pro — Todos os direitos reservados.</div>
                <div class="d-flex align-center justify-center justify-md-end gap-3 mt-1">
                  <span class="d-flex align-center"><v-icon icon="mdi-lock-outline" color="secondary" size="14" class="mr-1"></v-icon> LGPD Compliant</span>
                </div>
              </div>
            </div>
          </v-container>
        </v-footer>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useAuthStore } from '@/stores/auth'
import { useMetricsStore } from '@/stores/metrics'

const drawer = ref(true)
const theme = useTheme()
const authStore = useAuthStore()
const metricsStore = useMetricsStore()

const showStatusToast = ref(false)
const toastMessage = ref('')
const toastColor = ref('success')
const toastIcon = ref('mdi-eye-outline')

const isDark = computed(() => theme.global.name.value === 'darkGlassTheme')

function toggleTheme() {
  theme.global.name.value = isDark.value ? 'lightGlassTheme' : 'darkGlassTheme'
}

function toggleContactStatus(val: boolean | null) {
  const enabled = Boolean(val)
  authStore.toggleCandidateContactRequest(enabled)
  toastColor.value = enabled ? 'success' : 'error'
  toastIcon.value = enabled ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
  toastMessage.value = enabled
    ? 'Seu perfil profissional foi ATIVADO na vitrine!'
    : 'Seu perfil profissional foi OCULTADO. Você não receberá novos contatos.'
  showStatusToast.value = true
}

const roleDisplayName = computed(() => {
  if (authStore.currentRole === 'hunter') return 'Job Hunter'
  if (authStore.currentRole === 'admin') return 'Administrador'
  return 'Perfil Profissional'
})

const roleChipColor = computed(() => {
  if (authStore.currentRole === 'hunter') return 'secondary'
  if (authStore.currentRole === 'admin') return 'accent'
  return 'primary'
})

const roleChipIcon = computed(() => {
  if (authStore.currentRole === 'hunter') return 'mdi-account-tie'
  if (authStore.currentRole === 'admin') return 'mdi-shield-crown'
  return 'mdi-account-school'
})

const menuItems = computed(() => [
  { title: 'Início (Landing Page)', icon: 'mdi-home-outline', to: '/', badge: 'Home' },
  { title: 'Entrar na Conta', icon: 'mdi-login', to: '/login', badge: 'Login' },
  { title: 'Catálogo de Job Hunters', icon: 'mdi-account-search-outline', to: '/hunters', badge: 'Catálogo' },
  { title: 'Vitrine de Profissionais', icon: 'mdi-account-group-outline', to: '/candidatos', badge: 'Vitrine' },
  { title: 'Meu Perfil Profissional', icon: 'mdi-card-account-details-outline', to: '/cadastro', badge: 'Perfil' },
  { title: 'Painel do Administrador', icon: 'mdi-shield-check-outline', to: '/admin', badge: 'Curadoria' },
  { title: 'Métricas de Transbordo', icon: 'mdi-chart-line-variant', to: '/metricas', badge: 'Métricas' },
])
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
.gap-4 {
  gap: 16px;
}
.tracking-wider {
  letter-spacing: 0.8px;
}
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px);
}
.glass-footer {
  background: rgba(15, 23, 42, 0.6) !important;
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.min-h-screen {
  min-height: 100vh;
}
</style>
