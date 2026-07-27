<template>
  <div>
    <!-- Header Banner -->
    <v-card class="glass-panel pa-6 pa-md-8 rounded-2xl mb-6" elevation="0">
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center gap-2 mb-2">
            <span class="glass-badge text-accent">Moderação & Curadoria</span>
            <span class="glass-badge text-primary">Segurança & Moderação</span>
            <span class="glass-badge text-warning">Controle Anti-Spam</span>
          </div>
          <h1 class="text-h3 font-weight-black gradient-text mb-2">
            Painel do Administrador
          </h1>
          <p class="text-subtitle-1 text-grey-lighten-1 mb-0 max-w-650">
            Valide novos cadastros de Job Hunters e modere os perfis profissionais para manter a veracidade e alta qualidade das conexões.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="text-md-end">
          <v-chip color="accent" size="large" class="font-weight-bold">
            <v-icon icon="mdi-shield-crown" start></v-icon>
            Acesso Root Ativo
          </v-chip>
        </v-col>
      </v-row>
    </v-card>

    <!-- Top Summary Stats -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-grey font-weight-bold">Hunters Pendentes</div>
              <div class="text-h4 font-weight-black text-warning mt-1">{{ huntersStore.pendingHunters.length }}</div>
            </div>
            <v-avatar color="warning" size="48" class="elevation-4">
              <v-icon icon="mdi-account-clock-outline" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-grey font-weight-bold">Hunters Aprovados</div>
              <div class="text-h4 font-weight-black text-success mt-1">{{ huntersStore.approvedHunters.length }}</div>
            </div>
            <v-avatar color="success" size="48" class="elevation-4">
              <v-icon icon="mdi-account-check-outline" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card class="glass-panel pa-5 rounded-2xl" elevation="0">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-grey font-weight-bold">Perfis Profissionais na Vitrine</div>
              <div class="text-h4 font-weight-black text-secondary mt-1">{{ candidatesStore.visibleTalentPool.length }}</div>
            </div>
            <v-avatar color="secondary" size="48" class="elevation-4">
              <v-icon icon="mdi-account-group-outline" color="white" size="26"></v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Admin Tabs -->
    <v-card class="glass-panel pa-6 rounded-2xl" elevation="0">
      <div class="d-flex align-center justify-space-between flex-wrap gap-2 mb-4">
        <v-tabs v-model="tab" color="primary" align-tabs="start">
          <v-tab value="pendingHunters" class="font-weight-bold">
            <v-badge :content="huntersStore.pendingHunters.length" color="warning" class="mr-2" inline>
              Curadoria de Job Hunters
            </v-badge>
          </v-tab>
          <v-tab value="candidatesModeration" class="font-weight-bold">
            Moderação de Perfis Profissionais (Anti-Spam)
          </v-tab>
        </v-tabs>

        <div v-if="tab === 'pendingHunters' && huntersStore.pendingHunters.length > 0">
          <v-btn
            color="success"
            variant="tonal"
            size="small"
            rounded="pill"
            prepend-icon="mdi-check-all"
            @click="approveAllPendingHunters"
          >
            Aprovar Todos em Lote
          </v-btn>
        </div>
      </div>

      <v-window v-model="tab">
        <!-- TAB 1: PENDING HUNTERS APPROVAL -->
        <v-window-item value="pendingHunters">
          <div v-if="huntersStore.pendingHunters.length > 0">
            <v-card
              v-for="hunter in huntersStore.pendingHunters"
              :key="hunter.id"
              class="glass-panel pa-5 rounded-xl mb-4 border-glass"
              elevation="0"
            >
              <v-row align="center">
                <v-col cols="12" md="7">
                  <div class="d-flex align-center gap-3">
                    <v-avatar size="56" class="elevation-3">
                      <v-img :src="hunter.avatar"></v-img>
                    </v-avatar>
                    <div>
                      <h3 class="text-subtitle-1 font-weight-bold text-white pa-0 ma-0">{{ hunter.name }}</h3>
                      <div class="text-caption text-grey">{{ hunter.email }} • {{ hunter.serviceModel }}</div>
                      <div class="text-caption text-secondary mt-1">{{ hunter.headline }}</div>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="5" class="d-flex justify-md-end gap-2">
                  <v-btn
                    color="info"
                    variant="outlined"
                    size="small"
                    rounded="pill"
                    prepend-icon="mdi-linkedin"
                    :href="hunter.linkedInUrl"
                    target="_blank"
                  >
                    Ver LinkedIn
                  </v-btn>

                  <v-btn
                    color="error"
                    variant="outlined"
                    size="small"
                    rounded="pill"
                    prepend-icon="mdi-close"
                    @click="rejectHunter(hunter.id)"
                  >
                    Rejeitar
                  </v-btn>

                  <v-btn
                    color="success"
                    variant="flat"
                    size="small"
                    rounded="pill"
                    prepend-icon="mdi-check"
                    @click="approveHunter(hunter.id)"
                  >
                    Aprovar Hunter
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>

          <div v-else class="text-center py-10">
            <v-icon icon="mdi-check-decagram-outline" size="56" color="success" class="mb-3"></v-icon>
            <h3 class="text-h6 font-weight-bold text-white mb-1">Nenhuma pendência de curadoria</h3>
            <p class="text-caption text-grey">Todos os cadastros de Job Hunters já foram validados.</p>
          </div>
        </v-window-item>

        <!-- TAB 2: PROFESSIONAL PROFILES MODERATION -->
        <v-window-item value="candidatesModeration">
          <v-table class="bg-transparent text-grey-lighten-1">
            <thead>
              <tr>
                <th class="text-left font-weight-bold text-white">Perfil Profissional</th>
                <th class="text-left font-weight-bold text-white">Área / Senioridade</th>
                <th class="text-left font-weight-bold text-white">Solicitou Contato?</th>
                <th class="text-left font-weight-bold text-white">Status Vitrine</th>
                <th class="text-right font-weight-bold text-white">Ação Moderação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cand in candidatesStore.candidates" :key="cand.id">
                <td>
                  <div class="d-flex align-center gap-2 py-2">
                    <v-avatar size="36">
                      <v-img :src="cand.avatar"></v-img>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold text-white">{{ cand.name }}</div>
                      <div class="text-caption text-grey">{{ cand.email }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ cand.area }} ({{ cand.seniority }})</td>
                <td>
                  <v-chip size="x-small" :color="cand.requestHunterContact ? 'success' : 'grey'" variant="flat">
                    {{ cand.requestHunterContact ? 'Sim' : 'Não' }}
                  </v-chip>
                </td>
                <td>
                  <v-chip size="x-small" :color="cand.isApproved ? 'success' : 'error'" variant="outlined">
                    {{ cand.isApproved ? 'Publicado' : 'Suspenso' }}
                  </v-chip>
                </td>
                <td class="text-right">
                  <v-btn
                    size="small"
                    rounded="pill"
                    :color="cand.isApproved ? 'error' : 'success'"
                    variant="tonal"
                    @click="candidatesStore.toggleCandidateApproval(cand.id)"
                  >
                    {{ cand.isApproved ? 'Suspender (Spam)' : 'Aprovar Perfil' }}
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useHuntersStore } from '@/stores/hunters'
import { useCandidatesStore } from '@/stores/candidates'

const tab = ref('pendingHunters')
const huntersStore = useHuntersStore()
const candidatesStore = useCandidatesStore()

function approveHunter(id: string) {
  huntersStore.setHunterStatus(id, 'Aprovado')
}

function rejectHunter(id: string) {
  huntersStore.setHunterStatus(id, 'Rejeitado')
}

function approveAllPendingHunters() {
  huntersStore.pendingHunters.forEach(h => {
    huntersStore.setHunterStatus(h.id, 'Aprovado')
  })
}
</script>

<style scoped>
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.max-w-650 { max-width: 650px; }
.border-glass {
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
}
</style>
