<template>
  <article>
    <div class="bg-light-200 py-12">
      <h2 class="text-4xl text-center pt-60px md:pt-100px">{{ page.title }}</h2>
      <div class="w-90vw m-auto py-10px">
        <nuxt-content :document="page" />
      </div>
    </div>
    <div class="md:flex flex-row flex-wrap justify-between my-12">
      <div
        v-for="app in apps"
        :key="app.slug"
        class="md:w-30vw bg-light-400 shadow-lg mx-2 my-4 md:mx-0 px-6 py-8 rounded-lg"
      >
        <a class="no-underline" :href="`/apps/${app.slug}`">
          <div class="md:h-385px text-center">
            <img class="h-90px mx-auto mb-4" :src="app.icon" />
            <h3>{{ app.name }}</h3>
            <p>{{ app.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </article>
</template>

<script>
import apps from "~/static/appManifest.json";
export default {
  layout: "items",
  async asyncData({ $content }) {
    const page = await $content("apps").fetch();

    return {
      page,
    };
  },
  data() {
    return {
      apps,
    };
  },
};
</script>
