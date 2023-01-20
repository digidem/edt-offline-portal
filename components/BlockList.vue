<template>
  <div>
    <Block
      v-for="(block, key) in localizedBlocks"
      :id="key === 0 && 'first'"
      :key="block.slug"
      :orientation="key % 2 == 0 ? 'right' : 'left'"
      :image="block.image"
      :title="block.title"
      :document="block"
    />
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    localizedBlocks() {
      return this.blocks
        .filter((c) => c.locale === this.locale)
        .sort((a, b) => a.slug.localeCompare(b.slug));
    },
    locale() {
      return this.$i18n.getLocaleCookie();
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("Browser locale", this.$i18n.getBrowserLocale());
    this.switchLocalePath(this.locale);
  },
};
</script>
<style>
@import url("~/assets/css/main.css");
@import url("~/assets/css/icons.css");

.nuxt-content a {
  color: blue;
}

.nuxt-content p {
  padding: 15px 0;
}

.nuxt-content hr {
  padding: 15px 0;
}

.content h2 {
  font-size: 2em;
}

.content h1 {
  font-size: 3em;
}
</style>
