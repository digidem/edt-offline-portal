<template>
  <article>
    <div class="fixed top-2 right-2 z-10">
      <Dropdown :selected="currentLocale" :options="availableLocales" />
    </div>
    <div id="wrapper" class="divided">
      <!-- Capa -->
      <section
        :style="getBackground(index.background, true)"
        class="banner bg-cover bg-no-repeat bg-center md:bg-none style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right"
      >
        <div class="content capa">
          <div class="flex text-left mx-auto">
            <img
              :src="require(`~/assets/images/${index.logoDark}`)"
              :alt="index.title"
            />
            <h1 class="sr-only">{{ index.title }}</h1>
          </div>
          <div>
            {{ index.description }}
          </div>
          <div class="major bg-white md:bg-none px-4">
            <NuxtContent :document="index" tag="content" />
          </div>
          <ul class="actions pt-5vh">
            <li>
              <a
                href="#first"
                class="button big wide bg-gray-50 lg:bg-transparent"
                >{{ $t("getStarted") }}</a
              >
            </li>
          </ul>
        </div>
        <div class="hidden md:block">
          <img
            class="blur-2rem max-h-100vh"
            :src="require(`~/assets/images/${index.image}`)"
            alt=""
          />
        </div>
      </section>
      <BlockList :blocks="blocks" />
    </div>
    <Footer :authenticated="authenticated" />
  </article>
</template>

<script>
import getImage from "@/libs/getImage";
import getLocalizedIndex from "@/libs/getLocalizedIndex";
import getParsedBlocks from "@/libs/getParsedBlocks";

export default {
  async asyncData({ $content, i18n }) {
    const locale = i18n.getLocaleCookie();
    const index = await getLocalizedIndex($content, locale);
    const categories = await $content("blocks").fetch();
    const blocks = getParsedBlocks(categories, locale, true);
    return {
      index,
      blocks,
    };
  },
  data() {
    return {
      authenticated: false,
      ip: null,
    };
  },
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
  async mounted() {
    // eslint-disable-next-line no-console
    console.log(
      "Browser locale",
      this.$i18n.getBrowserLocale(),
      " Saved locale",
      this.locale
    );
    if (this.locale !== "en") {
      this.index = await getLocalizedIndex(this.$content, this.locale);
      const categories = await this.$content("blocks").fetch();
      this.blocks = getParsedBlocks(categories, this.locale, true);
    }
    // TODO: add endpoint
    // this.auth();
  },
  methods: {
    getBackground(img) {
      if (process.client && window?.innerWidth < 736) {
        return getImage(img, true, 0.7);
      } else return "";
    },
    async auth() {
      // TODO: add endpoint
      const { hostname, protocol, port } = window.location;
      const url = `${protocol}//${hostname}:${port}`;
      try {
        const ip = await this.$axios.$post(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.ip = ip;
        this.authenticated = true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
  },
};
</script>
<style>
@import url("~/assets/css/main.css");
@import url("~/assets/css/icons.css");

.nuxt-content a {
  color: blue;
}

.nuxt-content p {
  padding: 15px 0;
}

.nuxt-content hr {
  padding: 15px 0;
}

.content h2 {
  font-size: 2em;
}

.content h1 {
  font-size: 3em;
}
</style>
