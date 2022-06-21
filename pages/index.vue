<template>
  <article class="">
    <a class="absolute top-2 left-2">
      <!-- <nuxt-link :to="switchLocalePath('pt')">Português</nuxt-link> -->
    </a>
    <div id="wrapper" class="divided">
      <!-- Capa -->
      <section
        class="
          banner
          style1
          orient-left
          content-align-left
          image-position-right
          fullscreen
          onload-image-fade-in onload-content-fade-right
        "
      >
        <div class="content capa">
          <div class="flex text-center mx-auto">
            <img
              class="max-h-40px"
              :src="require(`~/assets/images/${page.icon}`)"
              :alt="page.title"
            />
            <h1>{{ page.title }}</h1>
          </div>
          <NuxtContent :document="page" tag="content" />
          <p class="major"></p>
          <ul class="actions vertical pt-5vh">
            <li>
              <a href="#first" class="button big wide">{{
                $t('getStarted')
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
        :key="category.slug"
        :id="key === 0 && 'first'"
        :orientation="key % 2 == 0 ? 'right' : 'left'"
        :image="category.image"
        :title="category.title"
        :document="category"
        :apps="localizedApps.filter(a => category.slug === a.category)"
      />
    </div>
    <button class="mx-auto" @click="this.auth">
      Continue browsing
    </button>
    <Footer />
  </article>
</template>

<script>
import getImage from '@/libs/getImage'

export default {
  async asyncData ({ $content }) {
    const categories = await $content('categories').fetch()
    const apps = await $content('apps').fetch()
    const page = await $content('index').fetch()
    return {
      page,
      apps,
      categories
    }
  },
  mounted () {
    console.log('Browser locale', this.$i18n.getBrowserLocale())
    this.switchLocalePath(this.locale)
  },
  computed: {
    localizedCategories () {
      return this.categories
        .filter(c => c.locale === this.locale)
        .sort((a, b) => a.order - b.order)
    },
    localizedApps () {
      return this.apps.filter(c => c.locale === this.locale)
    },
    locale () {
      return this.$i18n.getLocaleCookie()
    }
  },
  methods: {
    getBackground (img) {
      return getImage(img, true)
    },
    async auth () {
      const { hostname, protocol } = window.location
      let auth = {
        success: false
      }
      try {
        const ip = await this.$axios.$post(`${protocol}//${hostname}/auth`)
        auth = {
          success: true,
          ip
        }
      } catch (err) {
        console.log(err)
      }
      return auth
    }
  }
}
</script>
<style>
@import '~/assets/css/main.css';
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
