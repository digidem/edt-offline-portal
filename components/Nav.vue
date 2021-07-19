<template>
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
</template>

<script>
export default {
  props: {
    nome: String,
    ilustra: String,
    detalhe: String,
  },
  data() {
    return {
      icone: require(`~/assets/${this.ilustra}`),
    };
  },
};
</script>
