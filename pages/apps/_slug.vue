<template>
  <article>
    <h2 class="text-3xl text-center py-100px">{{ apps.title }}</h2>
    <div class="w-90vw m-auto py-10px">
      <nuxt-content :document="apps" />
    </div>
  </article>
</template>

<script>
export default {
  layout: 'items',
  async asyncData({ $content, params }) {
    const apps = await $content('apps', params.slug).fetch()
    return {
      apps,
    }
  },
}
</script>
