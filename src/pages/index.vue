<template>
  <article>
    <a class="absolute top-2 left-2">
      <!-- <nuxt-link :to="switchLocalePath('pt')">Português</nuxt-link> -->
    </a>
    <div id="wrapper" class="divided">
      <!-- Capa -->
      <section
        :style="getBackground(page.background, true)"
        class="banner bg-cover bg-no-repeat bg-center md:bg-none style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right"
      >
        <div class="content capa">
          <div class="flex text-left mx-auto">
            <img
              :src="require(`~/assets/images/${page.logoDark}`)"
              :alt="localizedIndex.title"
            />
            <h1 class="sr-only">{{ localizedIndex.title }}</h1>
          </div>
          <div>
            {{ localizedIndex.description }}
          </div>
          <div class="major bg-white md:bg-none px-4">
            <NuxtContent :document="page" tag="content" />
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
            :src="require(`~/assets/images/${page.image}`)"
            alt=""
          />
        </div>
      </section>
      <BlockList :blocks="categories" />
    </div>
    <Footer :authenticated="authenticated" />
  </article>
</template>

<script>
import getImage from "@/libs/getImage";

export default {
  async asyncData({ $content }) {
    const categories = await $content("blocks").fetch();
    const page = await $content("index").fetch();
    return {
      page,
      categories,
    };
  },
  data() {
    return {
      authenticated: false,
      ip: null,
    };
  },
  computed: {
    localizedIndex() {
      let title = this.page.title;
      let description = this.page.description;
      if (this.locale !== this.$i18n.defaultLocale) {
        if (this.page[`title_${this.locale}`])
          title = this.page[`title_${this.locale}`];
        if (this.page[`description_${this.locale}`])
          description = this.page[`description_${this.locale}`];
      }
      return {
        title,
        description,
      };
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("Browser locale", this.$i18n.getBrowserLocale());
    // TODO: add locales
    // this.switchLocalePath(this.locale);
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
