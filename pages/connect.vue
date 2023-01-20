<template>
  <article>
    <div v-if="connecting" class="flex justify-center align-center">
      <div
        class="absolute top-0 bg-yellow-100 w-320px md:w-500px px-8 py-8 rounded"
      >
        {{ $t("connectingNote") }}
      </div>
    </div>
    <div class="w-300px connect-container">
      <img :src="require(`~/assets/images/${page.logoDark}`)" alt="EDT" />
      <div
        v-if="scanning"
        class="flex items-center align-center justify-center"
      >
        <svg
          class="animate-spin h-15 w-15 mr-3 border-5px border-green-600 boder-solid"
          viewBox="0 0 24 24"
        ></svg>
      </div>
      <form
        v-else-if="!error"
        class="flex justify-between justify-items-center items-center flex-col h-200px"
        @submit="connectToNetwork"
      >
        <select v-model="formNetwork" class="w-full pt-15px">
          <option
            v-for="network in networks"
            :key="network.id"
            :value="network.ssid"
          >
            <span>
              {{ network.ssid }}
            </span>
            <i v-if="network.security" class="gg-lock"></i>
          </option>
        </select>
        <span class="flex flex-row w-full pt-15px">
          <input v-model="formPassword" :type="visible ? 'text' : 'password'" />
          <button class="rounded-none" @click="toggleVisibility">
            <i class="gg-eye"></i>
          </button>
        </span>
        <button class="py-15px w-full connect-button" type="submit">
          {{ $t("connect") }}
        </button>
      </form>
      <button :disabled="scanning" class="py-15px w-full" @click="getNetworks">
        {{ $t(scanning ? "scanning" : "scan") }}
      </button>
      <div v-if="error" class="text-center text-red-500 pt-4">
        {{ error }}
      </div>
    </div>
    <Footer />
  </article>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content("index").fetch();
    return {
      page,
    };
  },
  data() {
    return {
      networks: [],
      scanning: false,
      connecting: false,
      error: null,
      visible: false,
      formNetwork: null,
      formPassword: "",
      url: "",
    };
  },
  computed: {},
  mounted() {
    // const { hostname, protocol } = window.location;
    // this.url = `${protocol}//${hostname}`;
    this.url = "http://192.168.42.1";
    this.getNetworks();
  },
  methods: {
    async getNetworks() {
      this.scanning = true;

      try {
        const networks = await this.$axios.$get(`${this.url}/networks`);
        // Check it's own network isn't included
        this.networks = networks;
        this.error = null;
        this.formNetwork = networks[0].ssid;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.error = err;
      }
      this.scanning = false;
    },
    async connectToNetwork(e) {
      e.preventDefault();
      try {
        this.connecting = true;
        await this.$axios.$post(`${this.url}/connect`, {
          ssid: this.formNetwork,
          identity: "",
          passphrase: this.formPassword,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.connecting = false;
        this.error = null;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.error = err;
      }
    },
    toggleVisibility(e) {
      e.preventDefault();
      this.visible = !this.visible;
    },
  },
};
</script>
<style scoped>
@import url("~/assets/css/main.css");
@import url("~/assets/css/icons.css");

.connect-container {
  margin: 0 auto;
  padding-top: 10vh;
  padding-bottom: 5vh;
}

.connect-container img {
  padding-bottom: 50px;
}

.rounded-none {
  border-radius: 0;
  border-left: 0;
}

.connect-button {
  background: yellowgreen;
  color: white;
}
</style>
