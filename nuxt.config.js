import messages from "./src/messages";

/* TODO: get from content/pages directory */
const pages = [
  "/geo-storytelling",
  "/mapping-and-monitoring",
  "/storing-sharing",
  "/guide-lines",
  "/apps",
];
const routerBase = process.env.ROUTER_BASE || "/";

export default {
  srcDir: "src/",
  target: "static", // default is 'server'
  generate: {
    fallback: true,
    routes: () => {
      return [...pages];
    },
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
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "es",
        name: "Español",
      },
      {
        code: "pt",
        name: "Português",
      },
    ],
    // defaultLocale: "en",
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
      redirectOn: "root", // recommended
      // alwaysRedirect: true,
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
