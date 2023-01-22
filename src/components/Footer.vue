<template>
  <div class="border-solid border-t-1 bg-dark-100 py-50px w-full">
    <div class="mx-auto max-w-50vw text-center pt-35px">
      <div class="mb-25px">
        <a :href="root ? '/connect' : '/'">
          <button class="mx-auto px-8 bg-green-500">
            {{ $t(root ? "connect" : "portal") }}
          </button>
        </a>
        <app-button color="#1AA2D4" localurl=":82" text="sync"></app-button>
        <app-button
          color="#1D99F3"
          localurl=":81"
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
