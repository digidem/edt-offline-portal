<template>
  <article>
    <h2 class="text-3xl text-center py-10px">{{ page.title }}</h2>
    <div class="w-90vw m-auto py-10px">
      <nuxt-content :document="page" />
    </div>
  </article>
</template>

<script>
export default {
  layout: "pages",
  async asyncData({ $content }) {
    const page = await $content("about").fetch();

    return {
      page,
    };
  },
};
</script>
