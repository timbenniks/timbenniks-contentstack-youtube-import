export default defineNuxtConfig({
  compatibilityDate: '2024-10-29',
  ssr: false,
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    './modules/nuxt-contentstack-app',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    'nuxt-jsoneditor'
  ],

  jsoneditor: {
    componentName: 'JsonEditor',
    includeCss: true,
  },

  fonts: {
    defaults: {
      weights: [400, 700, 900],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: {
        'sans-serif': ['Trebuchet MS']
      }
    },
  }
})