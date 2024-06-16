<template>
  <div class="py-6 flex flex-col md:flex-row items-center">
    <code
      class="mini py-7 border-solid border-green-200 border-width-1px min-w-100%"
      >{{ code }}</code
    >
    <button
      class="rounded-none py-4 px-2 text-xl border-none min-w-100px"
      @click="copy"
    >
      ⧉
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "...",
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    async getCode() {
      const { hostname, protocol } = window.location;
      try {
        const res = await this.$axios.$get(
          `${protocol}//${hostname}:8813/ssb.json`,
        );
        if (res && res.pub && res.pub.invite) this.code = res.pub.invite;
      } catch (err) {
        this.code = this.$t("inviteError");
      }
    },
    async copy() {
      try {
        await this.$copyText(this.code);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
  },
};
</script>
<style scoped>
.mini {
  font-size: 0.4em !important;
}
</style>
