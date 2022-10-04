<template>
  <a
    :target="!scroll && '_blank'"
    :href="scroll || hrefUrl"
    :download="download"
  >
    <button
      :style="`background: ${
        color ? (typeof color === 'boolean' ? '#F67D31' : `${color}`) : 'none'
      };`"
      :class="`mt-4 px-6`"
    >
      {{ $t(`${text}`) }}
    </button>
  </a>
</template>
<script>
export default {
  props: {
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
