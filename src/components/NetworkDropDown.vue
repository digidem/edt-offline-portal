<template>
  <div class="relative inline-flex">
    <button
      v-if="selected"
      class="w-300px md:w-400px flex flex-nowrap items-center justify-between h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-light-500 hover:bg-light-600 focus:bg-light-700 disabled:cursor-not-allowed disabled:border-light-300 disabled:bg-light-300 disabled:shadow-none"
      @click="toggle"
    >
      <i v-if="selected.conn_type !== 'NONE'" class="gg-lock"></i>
      <i v-else class="gg-lock-unlock"></i>
      <span class="leading-5 truncate"> {{ selected.ssid }} </span>
      <client-only placeholder="loading...">
        <knob-control
          :value="selected.strength"
          :size="35"
          :stroke-width="8"
          :primary-color="selected.strength < 65 ? '#E844C3' : '#30D700'"
          :secondary-color="selected.strength < 65 ? '#E7B6DC' : '#93FF75'"
          :text-color="selected.strength < 65 ? '#E844C3' : '#30D700'"
        ></knob-control>
      </client-only>
      <span class="relative only:-mx-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-labelledby="t-01 d-01"
          role="graphics-symbol"
        >
          <title id="t-01">Button icon</title>
          <desc id="d-01">An icon describing the buttons usage</desc>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
    </button>
    <ul
      v-if="toggled"
      class="w-300px md:w-400px absolute z-20 flex flex-col py-2 mt-1 list-none bg-white rounded shadow-md text-sla top-full shadow-slate-500/10"
    >
      <li v-for="(network, key) in networks" :key="key">
        <a
          class="flex flex-nowrap items-center justify-between gap-2 p-2 px-1 transition-colors duration-300 text-slate-500 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:outline-none focus-visible:outline-none no-underline cursor-pointer"
          @click="(e) => selectNetwork(e, network)"
        >
          <i v-if="network.conn_type !== 'NONE'" class="gg-lock"></i>
          <i v-else class="gg-lock-unlock"></i>
          <span class="leading-5 truncate"> {{ network.ssid }} </span>
          <client-only placeholder="loading...">
            <knob-control
              v-model="network.strength"
              :size="55"
              :stroke-width="4"
              :primary-color="network.strength < 65 ? '#E844C3' : '#30D700'"
              :secondary-color="network.strength < 65 ? '#E7B6DC' : '#93FF75'"
              :text-color="network.strength < 65 ? '#E844C3' : '#30D700'"
            ></knob-control>
          </client-only>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {
    "knob-control": () => import("vue-knob-control"),
  },
  props: {
    networks: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      toggled: false,
    };
  },

  methods: {
    toggle(e) {
      e.preventDefault();
      this.toggled = !this.toggled;
    },
    selectNetwork(e, network) {
      e.preventDefault();
      this.toggled = false;
      this.$emit("selectNetwork", network);
    },
  },
};
</script>
