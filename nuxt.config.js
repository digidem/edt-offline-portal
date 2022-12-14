import messages from "./messages";

export default {
  target: "static", // default is 'server'
  head: {
    titleTemplate: "Earth Defenders Toolkit",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" },
    ],
  },
  env: {},
  modules: ["@nuxt/content", "@nuxtjs/i18n", "@nuxtjs/axios", "nuxt-clipboard"],
  i18n: {
    locales: ["en", "pt", "es"],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
      messages,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    "nuxt-windicss",
    "@nuxtjs/pwa",
    "@nuxtjs/localforage",
    "@nuxtjs/svg",
  ],
  components: true,
  build: {
    extend(config, ctx) {}, // blah blah
  },
  server: {
    host: "0.0.0.0",
  },
};
