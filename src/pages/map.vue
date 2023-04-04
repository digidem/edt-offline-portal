<template>
  <article>
    <Map height="90vh"></Map>
  </article>
</template>

<script>
export default {
  layout: "items",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/mapbox.css",
      },
    ],
  },
};
</script>
