<template>
  <NuxtLink :to="link">
    <div
      class="flex flex-col items-center gap-y-15px p-25px blur-sm hover:blur-none cursor-pointer hover:shadow-2xl rounded-full hover:bg-red-50"
    >
      <h2>{{ nome }}</h2>
      <div
        :style="`background-image: url(${icone});`"
        class="h-150px w-150px bg-cover"
      ></div>
      <p>{{ detalhe }}</p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    nome: String,
    ilustra: String,
    detalhe: String,
    index: Number,
  },
  data() {
    return {
      icone: require(`~/assets/${this.ilustra}`),
    };
  },
  computed: {
    link() {
      switch (this.index) {
        case 0:
          return "/sobre";
        default:
          return "/";
        case 1:
          return "/apps";
        case 2:
          return "/contato";
      }
    },
  },
};
</script>
