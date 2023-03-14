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
        v-else
        class="flex justify-between justify-items-center items-center flex-col gap-4"
        @submit="connectToNetwork"
      >
        <NetworkDropDown
          :selected="selected"
          :networks="networks"
          @selectNetwork="selectNetwork"
        />
        <span class="flex flex-row w-full pt-15px w-300px md:w-400px">
          <input
            v-model="formPassword"
            :disabled="selected && selected.conn_type === 'NONE'"
            :type="visible ? 'text' : 'password'"
          />
          <button class="rounded-none" @click="toggleVisibility">
            <i class="gg-eye"></i>
          </button>
        </span>
        <button class="py-15px w-full connect-button" type="submit">
          {{ $t("connect") }}
        </button>
        <div v-if="error" class="text-center text-red-500 pt-4">
          {{ error }}
        </div>
      </form>
      <button :disabled="scanning" class="py-15px w-full" @click="getNetworks">
        {{ $t(scanning ? "scanning" : "scan") }}
      </button>
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
      selected: null,
    };
  },
  watch: {
    networks: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler(val) {
        // do your stuff
        if (!this.selected) this.selected = val[0];
      },
    },
  },
  mounted() {
    const { hostname, protocol } = window.location;
    this.url = process.env.edtHost
      ? `${protocol}//${process.env.edtHost}:9090`
      : `${protocol}//${hostname}:9090`;
    this.getNetworks();
  },
  methods: {
    selectNetwork(network) {
      this.selected = network;
    },
    async getNetworks() {
      this.scanning = true;

      try {
        const networks = await this.$axios.$get(
          `${this.url}/v1/list_access_points`
        );
        // Check it's own network isn't included
        this.networks = networks.ssids;
        this.error = null;
        this.formNetwork = networks.ssids[0].ssid;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.error = err;
      }
      this.scanning = false;
    },
    async connectToNetwork(e) {
      e.preventDefault();
      if (
        this.selected &&
        this.selected.conn_type !== "NONE" &&
        this.formPassword.length < 8
      ) {
        this.error = "8 char min";
      } else {
        try {
          this.connecting = true;
          const connectBody = {
            ssid: this.selected?.ssid,
            conn_type: this.selected?.conn_type,
            headers: {
              "Content-Type": "application/json",
            },
          };
          if (this.selected.conn_type !== "NONE") {
            connectBody.password = this.formPassword;
          }
          const connection = await this.$axios.$post(
            `${this.url}/v1/connect`,
            connectBody
          );
          console.log("connection", connection);
          this.connecting = false;
          this.error = null;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          this.error = err;
        }
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
