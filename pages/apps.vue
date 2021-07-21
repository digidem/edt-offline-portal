<template>
  <article>
    <h2 class="text-3xl py-20px text-center">Aplicativos e Serviços</h2>
    <div class="flex flex-wrap max-w-968px mx-auto py-5vh">
      <div
        v-for="(app, index) in apps"
        :key="index"
        class="w-34vw border-2 shadow-xl rounded py-10px my-5px mx-5px"
      >
        <NuxtLink :to="app.link" class="flex flex-row">
          <div
            v-if="app.imagem"
            :style="getBackground(app.imagem)"
            alt="imagem serviço"
            class="w-1/3 bg-cover bg-center"
          />
          <div class="w-2/3 pl-25px py-25px">
            <h3 class="pb-2 text-xl">{{ app.titulo }}</h3>
            <p>{{ app.descricao }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  layout: "pages",
  async asyncData({ $content }) {
    const apps = await $content("apps").fetch();
    return {
      apps,
    };
  },
  methods: {
    getBackground(img) {
      const imagem = require(`~/assets/${img}`);
      return `background-image: url("${imagem}");`;
    },
  },
};
</script>
<style></style>
