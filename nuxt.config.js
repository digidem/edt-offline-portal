import messages from "./src/messages";

const routerBase = process.env.ROUTER_BASE || "/";

export default {
  srcDir: "src/",
  target: "static", // default is 'server'
  generate: {
    fallback: true,
  },
  head: {
    titleTemplate: "Earth Defenders Toolkit",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Meta description" },
    ],
  },
  env: {
    edtHost: process.env.EDT_HOST,
  },
  modules: ["@nuxt/content", "@nuxtjs/i18n", "@nuxtjs/axios", "nuxt-clipboard"],
  i18n: {
    strategy: "prefix",
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US",
      },
      {
        code: "es",
        name: "Español",
        iso: "es-AR",
      },
      {
        code: "pt",
        name: "Português",
        iso: "pt-BR",
      },
    ],
    defaultLocale: process.env.LOCALE || "en",
    vueI18n: {
      fallbackLocale: {
        es: ["pt"],
        pt: ["es"],
        default: ["en"],
      },
      messages,
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "all", // not recommended
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
  router: {
    base: routerBase,
  },
  server: {
    host: "0.0.0.0",
  },
};
