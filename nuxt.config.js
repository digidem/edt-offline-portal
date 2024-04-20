import messages from "./src/messages";

/* TODO: get from content/pages directory */
const pages = ["/geo-storytelling", "/mapping-and-monitoring"];
const routerBase = process.env.ROUTER_BASE || "/";

export default {
  link: [
    {
      rel: "stylesheet",
      href: "/mapbox.css",
    },
    { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
  ],
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
    mapboxDefaultToken: process.env.VUE_APP_MAPBOX_DEFAULT_TOKEN,
  },
  plugins: [{ src: "~/plugins/mapbox.client" }],
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
  router: {
    base: routerBase,
  },
  server: {
    host: "0.0.0.0",
  },
};
