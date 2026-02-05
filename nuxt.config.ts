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
    // Launcher (Home page)
    '/': { appLayout: 'launcher' },
    
    // Project Management program
    '/project-management': { appLayout: 'project' },
    '/project-management/**': { appLayout: 'project' },
    
    // FinlerMeet program (Video Call)
    '/finlermeet': { appLayout: 'finlermeet' },
    '/finlermeet/**': { appLayout: 'finlermeet' },
    
    // Blank layout for auth pages (if created later)
    '/login': { appLayout: 'blank' },
    '/register': { appLayout: 'blank' },
  }
})
