<template>
  <a
    :target="target || (!scroll && '_blank')"
    :href="scroll || hrefUrl"
    :download="download"
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
      class="mx-2 px-6"
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
  data() {
    return {
      hrefUrl: "",
    };
  },
  mounted() {
    if (this.localurl) {
      const { edtHost } = process.env;
      if (edtHost) {
        this.hrefUrl = `http://${edtHost}${this.localurl}`;
      } else {
        const { hostname, protocol } = window.location;
        this.hrefUrl = `${protocol}//${hostname}${this.localurl}`;
      }
    } else this.hrefUrl = this.link;
  },
};
</script>
