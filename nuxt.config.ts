// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/index.css',
  ],
  vite:{
    plugins:[
      tailwindcss()
    ]
  },

  // Nuxt 4.3 Route Rules - Centralized Layout Management
  routeRules: {
    // Default layout for all main pages
    '/': { appLayout: 'default' },
    '/projects': { appLayout: 'default' },
    '/tasks': { appLayout: 'default' },
    '/messages': { appLayout: 'default' },
    '/calendar': { appLayout: 'default' },
    '/settings': { appLayout: 'default' },
    '/profile': { appLayout: 'default' },
    
    // Blank layout for auth pages (if created later)
    '/login': { appLayout: 'blank' },
    '/register': { appLayout: 'blank' },
  }
})
