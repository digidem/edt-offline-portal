<template>
  <article>
    <div v-if="installer" class="bg-blue-700 rounded-lg shadow-md text-center">
      <div class="flex items-center justify-center py-4">
        <img
          src="~/assets/images/mapeo-map.png"
          alt="Mapeo"
          class="py-4"
          width="150"
        />
        <h1 class="text-title font-bold mb-4 ml-4">Mapeo</h1>
      </div>
      <section class="bg-gradient-to-r from-blue-500 to-green-500 py-8">
        <h3 class="py-8 text-white">Download Mapeo APK</h3>
        <VueQrcode
          :value="`${localUrl}/installers/${installer.file}`"
          :options="{ width: 200 }"
        ></VueQrcode>
        <div class="flex justify-center">
          <a
            :href="`${localUrl}/installers/${installer.file}`"
            :download="installer.file"
            class="download-button"
          >
            Download {{ installer.platform }}
          </a>
        </div>
      </section>
      <section
        class="bg-gradient-to-r from-green-500 to-yellow-500 py-12 pb-32"
      >
        <h3 class="py-12 text-white">Download Config</h3>
        <VueQrcode
          :value="`${localUrl}/mapeo/config.mapeosettings`"
          :options="{ width: 200 }"
        ></VueQrcode>
        <br />
        <a
          v-if="localUrl"
          :href="localUrl ? `${localUrl}/mapeo/config.mapeosettings` : ''"
          download="config.mapeosettings"
          class="download-button"
        >
          Download config
        </a>
      </section>
      <section class="bg-gradient-to-r from-yellow-500 to-red-500 py-12 pb-32">
        <h3 class="py-12 text-white">Download Map</h3>
        <VueQrcode
          :value="`${localUrl}/mbtiles/mbtiles/tiles.mbtiles`"
          :options="{ width: 200 }"
        ></VueQrcode>
        <br />
        <a
          v-if="localUrl"
          :href="localUrl ? `${localUrl}/mbtiles/mbtiles/tiles.mbtiles` : ''"
          download="tiles.mbtiles"
          class="download-button"
        >
          Download tiles
        </a>
      </section>
    </div>
    <Footer class="relative" />
  </article>
</template>

<script>
import VueQrcode from "@chenfengyuan/vue-qrcode";
import getLocalUrl from "@/libs/getLocalUrl";

export default {
  components: {
    VueQrcode,
  },
  async asyncData({ $content, i18n }) {},
  data() {
    return {
      installer: null,
      port: ":8087",
    };
  },
  computed: {
    localUrl() {
      const url = getLocalUrl();
      const fullUrl = `${url}${this.port}`;
      return fullUrl;
    },
  },
  async mounted() {
    const apps = await this.getLocaAppManifest();
    const mapeo = apps.filter((i) => i.slug === "mapeo")[0];
    const mapeoInstaller = mapeo?.localInstallers.filter(
      (i) => i.platform === "android",
    )[0];
    this.installer = mapeoInstaller;
  },
  methods: {
    async getLocaAppManifest() {
      try {
        const res = await this.$axios(
          `${this.localUrl}/installers/localAppManifest.json`,
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
<style>
@import url("~/assets/css/main.css");
@import url("~/assets/css/icons.css");

.download-button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 my-12 rounded no-underline;
}
</style>
