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
            :download="storeApk.localInstallers[0]?.file || storeApk.src"
            :link="storeApk.localInstallers[0]?.file || storeApk.src"
            :platform="storeApk.localInstallers[0]?.platform"
            :extension="storeApk.localInstallers[0]?.extension"
            :localurl="localurl"
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
        <a class="no-underline" :href="`apps/${app.slug}`">
          <div class="md:h-385px text-center">
            <img
              class="h-90px mx-auto mb-4"
              :src="`${installerUrl}/${app.localInstallers[0].icon}`"
            />
            <h3>{{ app.name }}</h3>
            <p>{{ app.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </article>
</template>

<script>
import getLocalUrl from "@/libs/getLocalUrl";
export default {
  layout: "items",
  // TODO: move getLocaAppManifest to here
  async asyncData({ $content }) {
    const page = await $content("apps").fetch();

    return {
      page,
    };
  },
  data() {
    return {
      apps: [],
      localurl: ":8087/installers",
    };
  },
  computed: {
    storeApk() {
      const app = this.apps?.filter((app) => app?.slug === "edt-apps")[0];
      return app;
    },
    installerUrl() {
      const url = getLocalUrl();
      return `${url}${this.localurl}`;
    },
  },
  async mounted() {
    this.apps = await this.getLocaAppManifest();
  },
  methods: {
    async getLocaAppManifest() {
      try {
        const res = await this.$axios(
          `${this.installerUrl}/localAppManifest.json`
        );
        return res.data;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
  },
};
</script>
