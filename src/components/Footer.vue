<template>
  <div class="border-solid border-t-1 bg-dark-100 py-50px w-full">
    <div class="mx-auto max-w-50vw text-center pt-35px">
      <div class="my-4">
        <app-button
          color="#145DA0"
          target="_self"
          href="/apps"
          text="Applications"
        ></app-button>
        <app-button
          color="#2E8BC0"
          localurl=":8079#/connect"
          text="connect"
        ></app-button>
      </div>
      <div class="mb-25px">
        <app-button color="#0C2D48" localurl=":8079" text="Admin"></app-button>
        <app-button color="#145DA0" localurl=":8082" text="sync"></app-button>
        <app-button
          color="#0C2D48"
          localurl=":8081"
          text="filebrowser"
        ></app-button>
        <app-button color="#145DA0" :href="mapUrl" text="Map"></app-button>
      </div>
      <br />
      <span class="text-light-800">
        {{ $t("madeWithLove") }}
        <a
          href="https://digital-democracy.org"
          class="no-underline text-white font-bold"
          >Digital Democracy</a
        >
        {{ $t("withSupport") }}
        <a
          href="http://earthdefenderstoolkit.com/"
          class="no-underline text-white font-bold"
          >Sponsors</a
        >
        <!-- <img src="~/assets/cc.svg" alt="cc" class="h-20px w-20px" /> -->
        {{ new Date().getFullYear() }}
      </span>
      <div v-if="mode" class="text-red-500">Training mode: {{ mode }}</div>
    </div>
  </div>
</template>
<script>
import getLocalUrl from "@/libs/getLocalUrl";

export default {
  data() {
    return {
      defaultStyle: null,
      mode: this.$config.trainingMode,
    };
  },
  computed: {
    mapUrl() {
      return process.env.OFFLINE_MAP_STYLE || this.defaultStyle;
    },
  },
  mounted() {
    this.getStyles();
  },
  methods: {
    async getStyles() {
      try {
        const url = getLocalUrl();
        const res = await this.$axios.$get(`${url}:8085/styles.json`);
        this.defaultStyle = `${url}:8085/styles/${res[0].id}/`;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
  },
};
</script>
