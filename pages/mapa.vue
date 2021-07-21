<template>
  <article>
    <!-- <h2 class="">{{ page.titulo }}</h2> -->
    <!-- <nuxt-content :document="page" /> -->
    <Map height="90vh" :places="places" :token="page.mapBoxToken"></Map>
  </article>
</template>

<script>
export default {
  layout: "pages",
  data() {
    return { places: [] };
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css",
      },
    ],
  },
  async asyncData({ $content }) {
    const page = await $content("index").fetch();

    return {
      page,
    };
  },
};
</script>
