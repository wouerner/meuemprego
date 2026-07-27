/**
 * router/index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPageHome',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/hunters',
      name: 'HuntersCatalog',
      component: () => import('@/pages/hunters.vue'),
    },
    {
      path: '/candidatos',
      name: 'CandidatesTalentPool',
      component: () => import('@/pages/candidatos.vue'),
    },
    {
      path: '/cadastro',
      name: 'UserProfileForm',
      component: () => import('@/pages/cadastro.vue'),
    },
    {
      path: '/admin',
      name: 'AdminModeration',
      component: () => import('@/pages/admin.vue'),
    },
    {
      path: '/metricas',
      name: 'TraractionMetrics',
      component: () => import('@/pages/metricas.vue'),
    },
  ],
})

export default router
