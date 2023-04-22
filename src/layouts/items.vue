<template>
  <div>
    <nav
      class="w-full h-72px px-4 bg-orange-500 text-black flex !justify-between align-middle items-center fixed z-10"
    >
      <a @click="to">
        <img
          src="~/assets/images/arrow.svg"
          alt="Back"
          class="icone fill-red w-36px filter-green"
        />
      </a>
      <Dropdown :selected="currentLocale" :options="availableLocales" />
    </nav>
    <div class="min-h-86vh">
      <Nuxt />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  computed: {
    locale() {
      return this.$i18n.getLocaleCookie();
    },
    currentLocale() {
      const current = this.$i18n.locales.filter(
        (i) => i.code === this.$i18n.locale
      )[0];
      return current?.name;
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  methods: {
    to() {
      if (this.$route.hash) this.$router.push("/");
      else this.$router.back();
    },
  },
};
</script>

<style>
.nuxt-content-container h2 {
  font-size: 1.5em;
  padding: 10px 0;
}

.nuxt-content-container h1 {
  font-size: 2em;
}

.nuxt-content-container h3 {
  font-size: 1em;
  padding: 5px 0;
}

.nuxt-content-container h4 {
  font-size: 1em;
  padding: 3px 0;
  font-weight: 400;
}

@media screen and (min-width: 1024px) {
  .nuxt-content-container {
    max-width: 968px;
    margin: 0 auto;
  }
}
</style>
