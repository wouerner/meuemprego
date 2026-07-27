<template>
  <div class="d-flex align-center justify-center min-h-screen py-8">
    <v-card class="glass-panel pa-8 pa-md-10 rounded-3xl w-100 max-w-500 relative overflow-hidden" elevation="0">
      <!-- Top Brand Icon & Title -->
      <div class="text-center mb-8">
        <v-avatar color="purple-accent-3" size="64" class="elevation-6 mb-4">
          <v-icon icon="mdi-lock-open-variant-outline" color="white" size="32"></v-icon>
        </v-avatar>
        <h1 class="text-h4 font-weight-black gradient-text mb-1">Entrar no meuemprego.pro</h1>
        <p class="text-subtitle-2 text-grey">Acesse sua conta com seu e-mail e senha</p>
      </div>

      <!-- Login Form -->
      <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleLogin">
        <!-- Error Alert -->
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

        <!-- Email Field -->
        <v-text-field
          v-model="emailInput"
          label="E-mail *"
          placeholder="seu.email@exemplo.com"
          prepend-inner-icon="mdi-email-outline"
          type="email"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-3"
          :rules="[rules.required, rules.email]"
        ></v-text-field>

        <!-- Password Field -->
        <v-text-field
          v-model="password"
          label="Senha de Acesso *"
          placeholder="••••••••"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-2"
          :rules="[rules.required, rules.minLength]"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>

        <!-- Remember me & Forgot Password -->
        <div class="d-flex align-center justify-space-between mb-6">
          <v-checkbox
            v-model="rememberMe"
            label="Lembrar de mim"
            color="primary"
            hide-details
            density="compact"
            class="text-caption"
          ></v-checkbox>
          <a class="text-caption text-secondary font-weight-bold text-decoration-none" href="#" @click.prevent="showForgotDialog = true">
            Esqueceu a senha?
          </a>
        </div>

        <!-- Submit Button -->
        <v-btn
          type="submit"
          block
          class="glass-btn-primary py-4 text-subtitle-1 mb-6"
          size="large"
          rounded="pill"
          :loading="isLoading"
          :disabled="!isFormValid"
          prepend-icon="mdi-login"
        >
          Entrar na Plataforma
        </v-btn>

        <!-- Register Link -->
        <div class="text-center text-body-2 text-grey">
          Ainda não possui conta?
          <router-link to="/cadastro" class="text-secondary font-weight-bold text-decoration-none">
            Cadastre-se grátis
          </router-link>
        </div>
      </v-form>
    </v-card>

    <!-- Forgot Password Dialog -->
    <v-dialog v-model="showForgotDialog" max-width="480">
      <v-card class="glass-panel pa-6 rounded-2xl" elevation="0">
        <div class="d-flex align-center justify-space-between mb-4">
          <h3 class="text-h6 font-weight-bold gradient-text">Recuperação de Senha</h3>
          <v-btn icon="mdi-close" variant="text" size="small" @click="showForgotDialog = false"></v-btn>
        </div>
        <p class="text-body-2 text-grey-lighten-1 mb-4">
          Informe seu e-mail cadastrado para receber as instruções de redefinição de senha.
        </p>
        <v-text-field
          v-model="forgotEmail"
          label="E-mail Cadastrado"
          placeholder="seu.email@exemplo.com"
          variant="outlined"
          density="comfortable"
          rounded="lg"
          class="mb-4"
        ></v-text-field>
        <div class="d-flex justify-end gap-2">
          <v-btn variant="text" rounded="pill" @click="showForgotDialog = false">Cancelar</v-btn>
          <v-btn class="glass-btn-primary" rounded="pill" @click="sendPasswordReset">Enviar Instruções</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Success Toast -->
    <v-snackbar v-model="showToast" color="success" timeout="3000" rounded="pill">
      <v-icon icon="mdi-check-circle" start></v-icon>
      {{ toastMessage }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useHuntersStore } from '@/stores/hunters'

const router = useRouter()
const authStore = useAuthStore()
const huntersStore = useHuntersStore()

const emailInput = ref('carlos.eduardo@email.com')
const password = ref('password123')
const rememberMe = ref(true)
const showPassword = ref(false)
const isLoading = ref(false)
const isFormValid = ref(false)
const errorMessage = ref('')
const showForgotDialog = ref(false)
const forgotEmail = ref('')
const showToast = ref(false)
const toastMessage = ref('')

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  minLength: (v: string) => (v && v.length >= 6) || 'Mínimo de 6 caracteres',
}

function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  setTimeout(() => {
    const input = emailInput.value.trim().toLowerCase()
    let detectedRole: 'candidato' | 'hunter' | 'admin' = 'candidato'

    // Identify profile type automatically by email
    if (input.includes('admin')) {
      detectedRole = 'admin'
    } else if (
      input.includes('hunter') ||
      input.includes('juliana') ||
      huntersStore.hunters.some(h => h.email.toLowerCase() === input)
    ) {
      detectedRole = 'hunter'
    } else {
      detectedRole = 'candidato'
    }

    authStore.setRole(detectedRole)
    isLoading.value = false

    const roleText = detectedRole === 'hunter' ? 'Job Hunter' : detectedRole === 'admin' ? 'Administrador' : 'Perfil Profissional'
    toastMessage.value = `Bem-vindo de volta! Perfil identificado: ${roleText}.`
    showToast.value = true

    setTimeout(() => {
      if (detectedRole === 'admin') {
        router.push('/admin')
      } else if (detectedRole === 'hunter') {
        router.push('/candidatos')
      } else {
        router.push('/hunters')
      }
    }, 800)
  }, 600)
}

function sendPasswordReset() {
  if (!forgotEmail.value) return
  showForgotDialog.value = false
  toastMessage.value = `Instruções enviadas para ${forgotEmail.value}`
  showToast.value = true
  forgotEmail.value = ''
}
</script>

<style scoped>
.min-h-screen {
  min-height: 80vh;
}
.max-w-500 {
  max-width: 500px;
}
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(8px);
}
</style>
