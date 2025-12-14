// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'quill/dist/quill.snow.css',
    'vuetify/styles' // Import Quill's Snow theme CSS
  ],
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", '@pinia/nuxt', "nuxt-vuefire"],
  build: {
    transpile: ['qrcode-vue3', 'vuetify'] // If you need to transpile external packages
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  runtimeConfig: {
    public: {
      url: process.env.urlapi,
      apimaps: process.env.apimaps,
      anomid: process.env.anomid,
      putriid: process.env.putriid
    }
  },
  ssr: false,
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId
      // there could be other properties depending on the project
    },
  },

  compatibilityDate: "2024-07-09",
})