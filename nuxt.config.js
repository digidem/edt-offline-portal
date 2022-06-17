import messages from './messages'

export default {
  env: {},
  modules: ["@nuxt/content", '@nuxtjs/i18n'],
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    }
  },
  buildModules: [
    "nuxt-windicss",
    "@nuxtjs/pwa",
    "@nuxtjs/localforage",
    "@nuxtjs/svg",
  ],
  components: true,
  build: {
    extend(config, ctx) { }, // blah blah
  },
  server: {
    host: "0.0.0.0",
  },
};
