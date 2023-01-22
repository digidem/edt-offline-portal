<template>
  <section
    :class="`pb-12 md:pb-0 spotlight style1 orient-${orientation} content-align-left image-position-center onscroll-image-fade-in`"
  >
    <div :id="title.toLowerCase().split(' ').join('-')" class="content">
      <h2>{{ title }}</h2>
      <NuxtContent :document="document" tag="content" />
    </div>
    <div class="image">
      <img :src="require(`~/assets/images/${image}`)" />
      <!-- <iframe
            class="elementor-background-video-embed"
            frameborder="0"
            allowfullscreen="1"
            autoplay="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            :src=""
            id="widget2"
            style="width: 100%; height: 100%;"
          ></iframe> -->
    </div>
  </section>
</template>
<script>
export default {
  props: {
    orientation: {
      type: String,
      default: "left",
    },
    image: {
      type: String,
      default: "fdroid.jpg",
    },
    title: {
      type: String,
      default: "Title",
    },
    // eslint-disable-next-line vue/require-default-prop
    document: Object,
  },
};
</script>
