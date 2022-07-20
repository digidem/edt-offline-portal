<template>
  <article class="">
    <a class="absolute top-2 left-2">
      <!-- <nuxt-link :to="switchLocalePath('pt')">Português</nuxt-link> -->
    </a>
    <div id="wrapper" class="divided">
      <!-- Capa -->
      <section
        class="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right"
      >
        <div class="content capa">
          <div class="flex text-center mx-auto">
            <img
              class="max-h-40px"
              :src="require(`~/assets/images/${page.icon}`)"
              :alt="localizedIndex.title"
            />
            <h1>{{ localizedIndex.title }}</h1>
          </div>
          <div>
            {{ localizedIndex.description }}
          </div>
          <p class="major"></p>
          <ul class="actions vertical pt-5vh">
            <li>
              <a href="#first" class="button big wide">{{
                $t("getStarted")
              }}</a>
            </li>
          </ul>
        </div>
        <div>
          <img
            class="blur-2rem"
            :src="require(`~/assets/images/${page.image}`)"
            alt=""
          />
        </div>
      </section>
      <App
        v-for="(category, key) in localizedCategories"
        :id="key === 0 && 'first'"
        :key="category.slug"
        :orientation="key % 2 == 0 ? 'right' : 'left'"
        :image="category.image"
        :title="category.title"
        :document="category"
      />
    </div>
    <Footer :authenticated="authenticated" />
  </article>
</template>

<script>
import getImage from "@/libs/getImage";

export default {
  async asyncData({ $content }) {
    const categories = await $content("categories").fetch();
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
    localizedCategories() {
      return this.categories
        .filter((c) => c.locale === this.locale)
        .sort((a, b) => a.order - b.order);
    },
    locale() {
      return this.$i18n.getLocaleCookie();
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("Browser locale", this.$i18n.getBrowserLocale());
    this.switchLocalePath(this.locale);
  },
  methods: {
    getBackground(img) {
      return getImage(img, true);
    },
    async auth() {
      const { hostname, protocol, port } = window.location;
      try {
        const ip = await this.$axios.$post(
          `${protocol}//${hostname}:${port}`,
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
@import "~/assets/css/main.css";

.nuxt-content a {
  color: blue;
}

.content h2 {
  font-size: 2em;
}

.content h1 {
  font-size: 3em;
}
</style>
