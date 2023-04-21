<!-- eslint-disable vue/no-v-html -->
<template>
  <a
    :target="target || '_blank'"
    :href="download ? `${hrefUrl}${download}` : hrefUrl"
    class="no-underline"
  >
    <button
      :style="`background: ${
        color ? (typeof color === 'boolean' ? '#F67D31' : `${color}`) : 'none'
      };`"
      class="mt-4 px-6 w-260px h-60px flex items-center justify-center"
    >
      <div
        class="w-26px mr-2"
        v-html="require(`~/assets/images/installers/${platform}.svg?raw`)"
      />
      <span v-if="text">{{ text }}</span>
      <span v-else>
        <span class="font-black text-md">
          {{ $t(`${platform}`) }}
        </span>
        <span class="text-light-50 font-8px">{{ extension }}</span>
      </span>
    </button>
  </a>
</template>
<script>
import getLocalUrl from "@/libs/getLocalUrl";

export default {
  props: {
    color: {
      type: [String, Boolean],
      default: false,
    },
    download: {
      type: [Boolean, String],
      default: true,
    },
    link: {
      type: String,
      default: "",
    },
    platform: {
      type: String,
      default: "android",
    },
    extension: {
      type: String,
      default: "null",
    },
    text: {
      type: String,
      default: null,
    },
    localurl: {
      type: [String, null],
      default: null,
    },
    target: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      hrefUrl: "",
    };
  },
  mounted() {
    if (this.localurl) {
      const url = getLocalUrl();
      this.hrefUrl = `${url}${this.localurl}`;
    } else this.hrefUrl = this.link;
  },
};
</script>
