<template>
  <a
    :target="target || (!scroll && '_blank')"
    :href="scroll || hrefUrl"
    :download="downloadUrl"
  >
    <span v-if="inline"><slot></slot></span>
    <button
      v-else
      :style="`background: ${
        color ? (typeof color === 'boolean' ? '#F67D31' : `${color}`) : 'none'
      };
      color: ${
        font !== 'inherit' ? font : color ? 'white' : 'black'
      } !important;
      `"
      :class="!noMargin && 'my-4 md:mx-2'"
      class="px-6"
    >
      {{ $t(`${text}`) }}
    </button>
  </a>
</template>
<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    color: {
      type: [String, Boolean],
      default: false,
    },
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
      type: [String, null],
      default: null,
    },
    scroll: {
      type: [String, null],
      default: null,
    },
    target: {
      type: [String, null],
      default: null,
    },
    font: {
      type: String,
      default: "inherit",
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isRemoteDownload() {
      return this.download && this.localurl;
    },
    downloadUrl() {
      if (this.isRemoteDownload) {
        return `${this.localurl}${this.download}`;
      } else return this.download;
    },
    hrefUrl() {
      if (this.localurl && process.client) {
        const { edtHost } = process.env;
        let url;
        if (edtHost) {
          url = `http://${edtHost}${this.localurl}`;
        } else {
          const { hostname, protocol } = window.location;
          url = `${protocol}//${hostname}${this.localurl}`;
        }
        if (this.isRemoteDownload) {
          return `${url}${this.download}`;
        } else return url;
      } else return this.link;
    },
  },
};
</script>
