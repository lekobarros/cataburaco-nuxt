export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Cata Buraco - SI Betim PUC Minas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Configuration Env https://nuxtjs.org/docs/configuration-glossary/configuration-env/
  env: {
    NGROK_AUTHTOKEN: process.env.NGROK_AUTHTOKEN,
    ARCGIS_APIKEY: process.env.ARCGIS_APIKEY
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/vue-notification'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/ngrok'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/dayjs
    '@nuxtjs/dayjs'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // 
  dayjs: {
    locales: ['pt-br'],
    defaultLocale: 'pt-br',
    defaultTimeZone: 'America/Sao_Paulo',
    plugins: [
      'utc',
      'timezone'
    ]
  },

  //
  ngrok: {
    // module options
    authtoken: process.env.NGROK_AUTHTOKEN
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    }
  }
