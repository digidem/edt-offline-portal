<template>
  <article>
    <h2 class="text-3xl">{{ page.titulo }}</h2>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  layout: "pages",
  async asyncData({ $content }) {
    const page = await $content("contato").fetch();

    return {
      page,
    };
  },
};
</script>
<style></style>
