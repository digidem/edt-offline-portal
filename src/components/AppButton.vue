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
      class="mt-4 md:mx-4 px-6"
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
  },
  computed: {
    downloadUrl() {
      if (this.download && this.localurl) {
        return `${this.localurl}${this.download}`;
      } else return this.download;
    },
    hrefUrl() {
      if (this.download && this.localurl) {
        return `${this.localurl}${this.download}`;
      }
      if (this.localurl && process.client) {
        const { edtHost } = process.env;
        if (edtHost) {
          return `http://${edtHost}${this.localurl}`;
        } else {
          const { hostname, protocol } = window.location;
          return `${protocol}//${hostname}${this.localurl}`;
        }
      } else return this.link;
    },
  },
};
</script>
