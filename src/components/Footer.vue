<template>
  <div class="border-solid border-t-1 bg-dark-100 py-50px w-full">
    <div class="mx-auto max-w-50vw text-center pt-35px">
      <div class="mb-25px">
        <app-button
          target="_self"
          color="#2A506F"
          localurl=":8079#/connect"
          :text="$t(root ? 'connect' : 'portal')"
        ></app-button>
        <app-button color="#2A506F" localurl=":8079" text="Admin"></app-button>
        <app-button color="#1AA2D4" localurl=":8082" text="sync"></app-button>
        <app-button
          color="#1D99F3"
          localurl=":8081"
          text="filebrowser"
        ></app-button>
      </div>
      <br />
      <span class="text-light-800">
        {{ $t("madeWithLove") }}
        <a href="https://digital-democarcy.org">Digital Democarcy</a>
        {{ $t("withSupport") }}
        <a href="http://earthdefenderstoolkit.com/">Sponsors</a>
        <!-- <img src="~/assets/cc.svg" alt="cc" class="h-20px w-20px" /> -->
        {{ new Date().getFullYear() }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      root: true,
    };
  },
  mounted() {
    if (window?.location.pathname !== "/") {
      this.root = false;
    }
  },
};
</script>
