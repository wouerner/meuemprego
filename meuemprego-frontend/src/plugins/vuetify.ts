/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const darkGlassTheme = {
  dark: true,
  colors: {
    background: 'transparent',
    surface: 'rgba(30, 41, 59, 0.6)',
    'surface-bright': 'rgba(255, 255, 255, 0.12)',
    'surface-variant': 'rgba(15, 23, 42, 0.4)',
    'on-surface-variant': '#94a3b8',
    primary: '#8b5cf6',
    'primary-darken-1': '#7c3aed',
    secondary: '#06b6d4',
    'secondary-darken-1': '#0891b2',
    accent: '#f43f5e',
    error: '#ef4444',
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
  },
}

const lightGlassTheme = {
  dark: false,
  colors: {
    background: 'transparent',
    surface: 'rgba(255, 255, 255, 0.65)',
    'surface-bright': 'rgba(255, 255, 255, 0.8)',
    'surface-variant': 'rgba(241, 245, 249, 0.5)',
    'on-surface-variant': '#64748b',
    primary: '#7c3aed',
    secondary: '#0891b2',
    accent: '#e11d48',
    error: '#dc2626',
    info: '#2563eb',
    success: '#059669',
    warning: '#d97706',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'darkGlassTheme',
    themes: {
      darkGlassTheme,
      lightGlassTheme,
    },
  },
})
