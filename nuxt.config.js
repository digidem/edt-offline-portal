export default {
  env: {
    tileServer: process.env.TILE_SERVER || "https://api-mapa.janeraka.org",
  },
  plugins: [{ src: "~/plugins/mapbox.client" }],
  modules: ["@nuxt/content", "nuxt-i18n"],
  i18n: {},
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    'nuxt-windicss',
    '@nuxtjs/pwa',
    '@nuxtjs/localforage',
    '@nuxtjs/svg',
  ],
  components: true,
  build: {
    extend(config, ctx) {}, // blah blah
  },
  server: {
    host: '0.0.0.0',
  },
}
