<template>
  <div
    :style="banner"
    class="h-70vh bg-gradient-to-r from-yellow-400 via-green-500 to-red-500"
  >
    <h1 class="mx-auto text-center pt-20vh text-5xl">
      {{ titulo }}
    </h1>
  </div>
</template>

<script>
import getImage from '../libs/getImage'

export default {
  props: {
    titulo: String,
    img: String,
  },
  data() {
    return {
      banner: getImage(this.img, true)
    };
  },
};
</script>
