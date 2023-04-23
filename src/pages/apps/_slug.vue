<template>
  <article>
    <div class="pt-60px md:pt-0">
      <installer-list
        v-if="app"
        full
        :app="app"
        :localurl="localurl"
        :installerurl="installerUrl"
      />
    </div>
  </article>
</template>

<script>
import InstallerList from "~/components/InstallerList.vue";
import getLocalUrl from "@/libs/getLocalUrl";

export default {
  components: { InstallerList },
  layout: "items",
  data() {
    return {
      app: null,
      localurl: ":8087/installers",
    };
  },
  computed: {
    installerUrl() {
      const url = getLocalUrl();
      return `${url}${this.localurl}`;
    },
  },
  async mounted() {
    const apps = await this.getLocaAppManifest();
    if (apps && this.$route?.params?.slug) {
      const toFilter = this.$route.params.slug;
      this.app = apps.filter((i) => i.slug === toFilter)[0];
    } else {
      window.location = "/apps";
    }
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
