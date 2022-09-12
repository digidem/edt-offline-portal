<template>
  <div class="border-solid border-t-1 md:mt-150px">
    <div class="mx-auto my-50px max-w-50vw text-center pt-35px">
      <p>
        <a :href="root ? '/connect' : '/'">
          <button class="mx-auto px-8 mb-12 bg-green-500">
            {{ $t(root ? "connect" : "back") }}
          </button>
        </a>
      </p>
      <span>
        {{ $t("madeWithLove") }}
        <a href="https://digital-democarcy.org">Digital Democarcy</a>
        {{ $t("withSupport") }}
        <a href="http://earthdefenderstoolkit.com/">Sponsor</a>
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
