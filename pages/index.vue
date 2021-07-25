<template>
  <main>
    <Header :titulo="page.titulo" :img="page.imagemBanner"> </Header>
    <div
      class="flex flex-col md:flex-row items-center text-center justify-around py-100px gap-y-50px"
    >
      <Nav
        v-for="(menus, index) in page.menus"
        :key="index"
        :nome="menus.nome"
        :detalhe="menus.detalhe"
        :ilustra="menus.icone"
        :index="index"
      ></Nav>
    </div>
    <Map height="500px" :places="places" :tileServer="tileServer" :token="page.mapBoxToken"></Map>
    <Footer></Footer>
  </main>
</template>

<script>
export default {
  data() {
    return {
      places: [],
      tileServer: process.env.tileServer
    };
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
