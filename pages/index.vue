<template>
  <main>
    <Header :titulo="page.titulo" :img="page.imagemBanner"> </Header>
    <div
      class="flex flex-col md:flex-row items-center text-center justify-around py-100px gap-y-50px bg-red-100"
    >
      <Nav
        v-for="(menus, index) in page.menus"
        :key="index"
        :nome="menus.nome"
        :detalhe="menus.detalhe"
        :ilustra="menus.icone"
        :index="index"
      ></Nav>
      <a href="http://ryru.janeraka.org">
        <div
          class="flex flex-col items-center gap-y-15px p-25px blur-sm hover:blur-none cursor-pointer"
        >
          <h2 class="font-extrabold uppercase">Ryru</h2>
          <div
            :style="ryru"
            class="h-150px w-150px bg-cover transform hover:scale-110"
          ></div>
          <p>Memória Awaete</p>
        </div>
      </a>
    </div>
    <Map height="500px" :places="places" :token="page.mapBoxToken"></Map>
    <Footer></Footer>
  </main>
</template>

<script>
import getImage from "../libs/getImage";

export default {
  async asyncData({ $content }) {
    const places = await $content("places").fetch();
    const page = await $content("index").fetch();
    return {
      places,
      page,
    };
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "/mapbox.css",
      },
    ],
  },
  data() {
    return {
      ryru: getImage("janeraka.png", true),
    };
  },
};
</script>
