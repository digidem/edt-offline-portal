<template>
  <div
    :style="banner && `background-image: url(${banner});`"
    class="h-70vh bg-gradient-to-r from-yellow-400 via-green-500 to-red-500"
  >
    <h1 class="mx-auto text-center pt-20vh text-5xl">
      {{ titulo }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    titulo: String,
    img: String,
  },
  data() {
    return {
      banner: this.img ? require(`~/assets/${this.img}`) : null,
    };
  },
};
</script>
