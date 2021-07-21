<template>
  <div
    class="bg-red-400 flex flex-row justify-around justify-items-center items-center shadow"
  >
    <NuxtLink to="/">
      <img src="~/assets/home.svg" alt="iconeHome" class="icone" />
    </NuxtLink>
    <NuxtLink to="/sobre">
      <img src="~/assets/comunidade.svg" alt="iconeSobre" class="icone" />
    </NuxtLink>
    <NuxtLink to="/mapa">
      <img src="~/assets/mapa.svg" alt="iconeMapa" class="icone" />
    </NuxtLink>
    <NuxtLink to="/apps">
      <img src="~/assets/apps.svg" alt="iconeApps" class="icone" />
    </NuxtLink>
    <NuxtLink to="/contato">
      <img src="~/assets/arvore.svg" alt="iconeContato" class="icone" />
    </NuxtLink>
  </div>
</template>

<script>
// *TODO* - entender pq na volta de sobre para home o nav não preenche tudo
</script>
<style>
.nuxt-link-exact-active {
  display: none;
}
</style>
