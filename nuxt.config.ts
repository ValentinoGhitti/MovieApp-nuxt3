export default defineNuxtConfig({
  modules: [
    'nuxt-windicss',
    '@vueuse/nuxt',
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
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
})



