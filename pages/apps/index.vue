<template>
  <article>
    <div class="bg-light-200 py-12">
      <h2 class="text-4xl text-center pt-60px md:pt-100px">{{ page.title }}</h2>
      <div class="w-90vw mx-auto py-10px">
        <nuxt-content :document="page" />
        <div class="max-w-968px mx-auto">
          <installer-button
            v-if="storeApk"
            :color="true"
            :download="storeApk.filename || storeApk.link"
            :link="storeApk.dir || storeApk.link"
            :platform="storeApk.platform"
            :extension="storeApk.extension"
            text="Download"
          />
        </div>
      </div>
    </div>
    <div class="mx-auto my-12 md:my-0 md:flex flex-row flex-wrap justify-start">
      <div
        v-for="app in apps"
        :key="app.slug"
        class="md:w-30vw bg-light-400 shadow-lg mx-4 my-4 px-6 py-8 rounded-lg"
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
import parseApps from "~/libs/parseAppsManifest";

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
  computed: {
    storeApk() {
      const app = this.apps.filter((app) => app.slug === "edt-apps")[0];
      if (app) {
        const installers = parseApps(app.installers);
        return installers[0];
      } else return null;
    },
  },
};
</script>
