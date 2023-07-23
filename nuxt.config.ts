export default defineNuxtConfig({
  modules: [
    'nuxt-windicss',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
  ],
  runtimeConfig: {
    apiKey: '',
    apiBaseUrl: '',
    public: {
      imgBaseUrl: ''
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  googleFonts: {
    families: {
      Hahmlet: true,
      Spectral: true,
    },
  },
})



