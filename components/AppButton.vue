<template>
  <a target="_blank" :href="hrefUrl" :download="download">
    <button class="mt-4 px-6">{{ text }}</button>
  </a>
</template>
<script>
export default {
  props: {
    download: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "Click here",
    },
    localurl: {
      type: String || null,
      default: null,
    },
  },
  computed: {
    hrefUrl() {
      if (process.client) {
        if (this.localurl) {
          const { hostname, protocol } = window.location;
          return `${protocol}//${hostname}${this.localurl}`;
        } else return this.link;
      } else return "";
    },
  },
};
</script>
