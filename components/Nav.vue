<template>
  <NuxtLink :to="link">
    <div
      class="flex flex-col items-center gap-y-15px p-25px blur-sm hover:blur-none cursor-pointer"
    >
      <h2 class="font-extrabold uppercase">{{ nome }}</h2>
      <div
        :style="icone"
        class="h-150px w-150px bg-cover transform hover:scale-110"
      ></div>
      <p>{{ detalhe }}</p>
    </div>
  </NuxtLink>
</template>

<script>
import getImage from "../libs/getImage";

export default {
  props: {
    nome: {
      type: String,
      default: "",
    },
    ilustra: {
      type: String,
      default: "",
    },
    detalhe: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      icone: getImage(this.ilustra, true),
    };
  },
  computed: {
    link() {
      switch (this.index) {
        case 0:
          return "/sobre";
        case 1:
          return "/apps";
        case 2:
          return "/contato";
        default:
          return "/";
      }
    },
  },
};
</script>
