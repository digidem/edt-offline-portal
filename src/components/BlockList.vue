<template>
  <div>
    <Block
      v-for="(block, key) in blocks"
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
};
</script>
<style>
@import url("~/assets/css/main.css");
@import url("~/assets/css/icons.css");

.nuxt-content a {
  color: blue;
}

.nuxt-content p {
  padding: 25px 0;
}

.nuxt-content hr {
  padding: 25px 0;
}

.content h2 {
  font-size: 2em;
}

.content h1 {
  font-size: 3em;
}
</style>
