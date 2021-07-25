<template>
  <article>
    <Map v-if="process" height="90vh" :places="places" :tileServer="process.env.tileServer" :token="page.mapBoxToken"></Map>
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
