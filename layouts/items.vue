<template>
  <div>
    <a class="absolute top-4 left-4 lg:left-12" @click="to">
      <img
        src="~/assets/images/arrow.svg"
        alt="Back"
        class="icone fill-red w-36px filter-green"
      />
    </a>
    <!-- <Navbar class="h-60px bg-gray-500"></Navbar> -->
    <div class="min-h-86vh">
      <Nuxt />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  methods: {
    to() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.nuxt-content-container h2 {
  font-size: 1.5em;
  padding: 10px 0;
}

.nuxt-content-container h1 {
  font-size: 2em;
}

.nuxt-content-container h3 {
  font-size: 1em;
  padding: 5px 0;
}

.nuxt-content-container h4 {
  font-size: 1em;
  padding: 3px 0;
  font-weight: 400;
}

@media screen and (min-width: 1024px) {
  .nuxt-content-container {
    max-width: 968px;
    margin: 0 auto;
  }
}
</style>
