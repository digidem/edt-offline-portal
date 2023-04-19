<template>
  <div>
    <notification
      :show="showNotification"
      message="copiedToClipboard"
      position="bottom-32px right-0.5 left-0.5"
    />
    <div
      :class="`mt-4 flex items-center ${hostname && 'cursor-pointer'}`"
      @click="copy"
    >
      <span class="font-mono">{{ `http://${hostname || "edt"}.local` }}</span>
      <div class="ml-4">
        <i class="gg-copy"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hostname: null,
      showNotification: false,
    };
  },
  mounted() {
    this.getHostname();
  },
  methods: {
    async getHostname() {
      const { edtHost } = process.env;
      let url;
      if (edtHost) {
        url = `http://${edtHost}`;
      } else {
        const { hostname, protocol } = window.location;
        url = `${protocol}//${hostname}`;
      }
      try {
        const res = await this.$axios({
          method: "post",
          url: `${url}:8079/v1/supervisor`,
          data: {
            params: false,
            cacheTimeout: 0,
            path: "v1/device/host-config",
          },
        });
        this.hostname = res?.data?.network?.hostname;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    },
    async copy() {
      if (this.hostname) {
        try {
          await this.$copyText(`http://${this.hostname}.local`);
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, "1500");
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    },
  },
};
</script>
