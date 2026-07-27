<template>
  <div>
    <!-- SEÇÃO 1: HERO GLASSMORPHIC (MOBILE FIRST) -->
    <v-card class="glass-panel pa-5 pa-sm-8 pa-md-12 rounded-3xl mb-6 mb-sm-10 relative overflow-hidden" elevation="0">
      <v-row align="center">
        <v-col cols="12" lg="7" class="text-center text-lg-start">
          <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-black gradient-text mb-4 leading-tight">
            A Ponte Direta Entre Perfis Profissionais e Job Hunters
          </h1>

          <p class="text-body-1 text-sm-h6 text-grey-lighten-1 mb-6 mb-sm-8 max-w-650 mx-auto mx-lg-0 font-weight-regular">
            Seja encontrado pelos melhores <strong class="text-white font-weight-bold">Job Hunters</strong> do mercado ou navegue em nossa vitrine de consultores validados. Conexão transparente sem intermediários.
          </p>

          <!-- DUAL CALL TO ACTION (CTA MOBILE ADAPTADO) -->
          <div class="d-flex flex-column flex-sm-row justify-center justify-lg-start gap-3 gap-sm-4 mb-6">
            <v-btn
              class="glass-btn-primary px-4 px-sm-8 w-100 w-sm-auto hero-cta-btn"
              size="large"
              rounded="pill"
              prepend-icon="mdi-rocket-launch"
              @click="navigateToRegister('candidato')"
            >
              Quero Acelerar Minha Carreira
            </v-btn>

            <!-- JOB HUNTER CTA (OCULTO TEMPORARIAMENTE)
            <v-btn
              variant="outlined"
              size="large"
              rounded="pill"
              class="text-white border-glass px-4 px-sm-8 w-100 w-sm-auto font-weight-bold hero-cta-btn"
              prepend-icon="mdi-account-tie"
              @click="navigateToRegister('hunter')"
            >
              Sou Consultor / Cadastrar Perfil
            </v-btn>
            -->
          </div>

          <div class="d-flex align-center justify-center justify-lg-start text-caption text-grey gap-3 gap-sm-4 flex-wrap">
            <span class="d-flex align-center"><v-icon icon="mdi-check" color="success" class="mr-1"></v-icon> Sem cartão de crédito</span>
            <span class="d-flex align-center"><v-icon icon="mdi-check" color="success" class="mr-1"></v-icon> Em conformidade com LGPD</span>
          </div>
        </v-col>

        <v-col cols="12" lg="5" class="text-center position-relative mt-6 mt-lg-0">
          <div class="hero-visual-card glass-panel pa-4 pa-sm-6 rounded-2xl elevation-12">
            <div class="d-flex align-center justify-space-between mb-4">
              <span class="text-caption font-weight-bold text-secondary text-uppercase">Conexão Ativa em Tempo Real</span>
              <span class="glass-badge text-success">Live</span>
            </div>

            <!-- JOB HUNTER SAMPLE CARD (OCULTO TEMPORARIAMENTE)
            <div class="glass-mini-card pa-4 rounded-xl mb-3 text-start">
              <div class="d-flex align-center gap-3">
                <v-avatar size="48">
                  <v-img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"></v-img>
                </v-avatar>
                <div>
                  <div class="text-subtitle-2 font-weight-bold text-white pa-0 ma-0">Juliana Mendes</div>
                  <div class="text-caption text-grey">Job Hunter Sênior Tech</div>
                </div>
              </div>
              <div class="d-flex align-center justify-space-between mt-3">
                <span class="text-caption text-accent">Assessoria Completa</span>
                <v-btn size="x-small" color="success" rounded="pill" prepend-icon="mdi-whatsapp">Abordar</v-btn>
              </div>
            </div>
            -->

            <div class="glass-mini-card pa-4 rounded-xl text-start">
              <div class="d-flex align-center gap-3">
                <v-avatar size="44" size-sm="48">
                  <v-img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"></v-img>
                </v-avatar>
                <div>
                  <div class="text-subtitle-2 font-weight-bold text-white pa-0 ma-0">Carlos Eduardo</div>
                  <div class="text-caption text-grey">Engenheiro Staff (Perfil Profissional)</div>
                </div>
              </div>
              <div class="d-flex align-center justify-space-between mt-3 flex-wrap gap-2">
                <span class="text-caption text-secondary">Opt-in Vitrine Ativo</span>
                <v-btn size="x-small" color="info" rounded="pill" prepend-icon="mdi-linkedin">Contato</v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- SEÇÃO 2: PROVA SOCIAL & MÉTRICAS DE IMPACTO -->
    <v-row class="mb-6 mb-sm-10">
      <v-col cols="6" sm="6" md="3">
        <v-card class="glass-panel pa-4 pa-sm-6 text-center rounded-2xl h-100" elevation="0">
          <div class="text-h4 text-sm-h3 font-weight-black gradient-text mb-1">+1.450</div>
          <div class="text-caption text-sm-subtitle-2 text-grey">Conexões Diretas Realizadas</div>
        </v-card>
      </v-col>

      <v-col cols="6" sm="6" md="3">
        <v-card class="glass-panel pa-4 pa-sm-6 text-center rounded-2xl h-100" elevation="0">
          <div class="text-h4 text-sm-h3 font-weight-black text-secondary mb-1">+380</div>
          <div class="text-caption text-sm-subtitle-2 text-grey">Job Hunters Credenciados</div>
        </v-card>
      </v-col>

      <v-col cols="6" sm="6" md="3">
        <v-card class="glass-panel pa-4 pa-sm-6 text-center rounded-2xl h-100" elevation="0">
          <div class="text-h4 text-sm-h3 font-weight-black text-accent mb-1">98.4%</div>
          <div class="text-caption text-sm-subtitle-2 text-grey">Satisfação no Atendimento</div>
        </v-card>
      </v-col>

      <v-col cols="6" sm="6" md="3">
        <v-card class="glass-panel pa-4 pa-sm-6 text-center rounded-2xl h-100" elevation="0">
          <div class="text-h4 text-sm-h3 font-weight-black text-success mb-1">&lt; 1h</div>
          <div class="text-caption text-sm-subtitle-2 text-grey">Tempo Médio de Abordagem</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- SEÇÃO 3: O DUPLO FLUXO (COMO FUNCIONA) -->
    <v-card class="glass-panel pa-5 pa-sm-8 rounded-3xl mb-6 mb-sm-10" elevation="0">
      <div class="text-center mb-6 mb-sm-8">
        <span class="glass-badge text-secondary mb-2">Simplicidade & Autonomia</span>
        <h2 class="text-h4 text-sm-h3 font-weight-black gradient-text-subtle mb-2">Como Funciona a Vitrine Profissional</h2>
        <p class="text-body-2 text-sm-subtitle-1 text-grey max-w-600 mx-auto">Você no controle da sua jornada profissional.</p>
      </div>

      <v-row justify="center">
        <!-- Coluna Perfis Profissionais -->
        <v-col cols="12" md="8">
          <div class="glass-panel pa-5 pa-sm-6 rounded-2xl h-100 border-primary-glow">
            <div class="d-flex align-center gap-3 mb-4">
              <v-avatar color="primary" size="40" size-sm="48">
                <v-icon icon="mdi-account-school" color="white" size="22" size-sm="26"></v-icon>
              </v-avatar>
              <div>
                <h3 class="text-subtitle-1 text-sm-h6 font-weight-bold text-white pa-0 ma-0">Para Perfis Profissionais</h3>
                <span class="text-caption text-secondary">Busque ou seja encontrado</span>
              </div>
            </div>

            <v-timeline density="compact" align="start" class="px-1 px-sm-2">
              <v-timeline-item dot-color="primary" size="x-small">
                <div class="font-weight-bold text-white text-caption text-sm-body-2">1. Crie seu Perfil Profissional Grátis</div>
                <div class="text-caption text-grey">Informe seu objetivo de carreira, senioridade, CPF e links de contato.</div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="x-small">
                <div class="font-weight-bold text-white text-caption text-sm-body-2">2. Ative a Solicitação de Contato</div>
                <div class="text-caption text-grey">Entre para a Vitrine de Profissionais para que Job Hunters te abordem.</div>
              </v-timeline-item>
              <v-timeline-item dot-color="primary" size="x-small">
                <div class="font-weight-bold text-white text-caption text-sm-body-2">3. Receba Contatos Diretos</div>
                <div class="text-caption text-grey">Seja abordado via WhatsApp e LinkedIn diretamente por recrutadores e consultores.</div>
              </v-timeline-item>
            </v-timeline>

            <v-btn to="/candidatos" block class="glass-btn-primary mt-4 hero-cta-btn" rounded="pill">
              Ver Vitrine de Profissionais
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- SEÇÃO 5: PERGUNTAS FREQUENTES (FAQ) -->
    <v-card class="glass-panel pa-5 pa-sm-8 rounded-3xl mb-6 mb-sm-10" elevation="0">
      <div class="text-center mb-6">
        <h2 class="text-h5 text-sm-h4 font-weight-bold gradient-text">Dúvidas Frequentes</h2>
      </div>

      <v-expansion-panels variant="accordion" class="bg-transparent">
        <v-expansion-panel class="glass-panel mb-2 rounded-xl" title="A plataforma cobra alguma taxa para cadastrar o Perfil Profissional?">
          <v-expansion-panel-text class="text-grey-lighten-1 text-body-2">
            Não! A plataforma é 100% gratuita. Você pode colocar seu perfil profissional na Vitrine sem pagar nenhuma mensalidade ou comissão.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="glass-panel mb-2 rounded-xl" title="Como os Job Hunters entram em contato com meu Perfil Profissional?">
          <v-expansion-panel-text class="text-grey-lighten-1 text-body-2">
            Ao marcar a opção "Solicitar contato de Hunters", seu perfil profissional fica visível na Vitrine. Os Job Hunters credenciados utilizam o link direto formatado para seu WhatsApp ou LinkedIn.
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="glass-panel rounded-xl" title="Meus dados estão protegidos pela LGPD?">
          <v-expansion-panel-text class="text-grey-lighten-1 text-body-2">
            Sim! Seus contatos (LinkedIn/WhatsApp) só são exibidos mediante o seu consentimento explícito e o seu CPF é mantido em sigilo absoluto.
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <!-- SEÇÃO 6: CTA FINAL -->
    <v-card class="glass-panel pa-6 pa-sm-10 text-center rounded-3xl" elevation="0">
      <h2 class="text-h4 text-sm-h3 font-weight-black gradient-text mb-3">Pronto para dar o próximo passo?</h2>
      <p class="text-body-2 text-sm-subtitle-1 text-grey mb-6 max-w-600 mx-auto">
        Junte-se a centenas de perfis profissionais que estão acelerando suas carreiras com o meuemprego.pro.
      </p>
      <div class="d-flex justify-center flex-column flex-sm-row gap-3 gap-sm-4">
        <v-btn
          to="/cadastro"
          class="glass-btn-primary px-6 px-sm-8 w-100 w-sm-auto hero-cta-btn"
          size="large"
          rounded="pill"
          prepend-icon="mdi-account-plus"
        >
          Cadastrar Perfil Profissional
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function navigateToRegister(role: 'candidato' | 'hunter') {
  authStore.setRole(role)
  router.push('/cadastro')
}
</script>

<style scoped>
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.max-w-600 { max-width: 600px; }
.max-w-650 { max-width: 650px; }
.leading-tight { line-height: 1.15; }

.hero-cta-btn {
  white-space: normal !important;
  word-break: break-word;
  height: auto !important;
  min-height: 50px;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  font-size: 0.95rem !important;
  line-height: 1.25 !important;
}

@media (min-width: 600px) {
  .hero-cta-btn {
    font-size: 1.05rem !important;
    min-height: 54px;
  }
}

.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.18) !important;
  backdrop-filter: blur(10px);
}
.border-primary-glow {
  border: 1px solid rgba(139, 92, 246, 0.4) !important;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.15) !important;
}
.hero-visual-card {
  background: rgba(15, 23, 42, 0.75) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(20px) !important;
}
.glass-mini-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
