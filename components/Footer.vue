<template>
  <div class="border-solid border-t-1 md:mt-150px">
    <div class="mx-auto my-50px max-w-50vw text-center pt-35px">
      <p>
        <button
          :disabled="authenticated"
          :class="`${
            authenticated ? 'bg-green-500' : 'bg-light-50'
          } mx-auto px-8 mb-12`"
          @click="auth"
        >
          {{ $t(authenticated ? "authenticated" : "continueBrowsing") }}
        </button>
      </p>
      <span>
        {{ $t("madeWithLove") }} <a href="http://coolab.org">Coolab</a>
        {{ $t("withSupport") }}
        <a href="https://opencollective.com/secure-scuttlebutt-consortium"
          >Secure Scuttlebutt Consortium</a
        >
        <!-- <img src="~/assets/cc.svg" alt="cc" class="h-20px w-20px" /> -->
        {{ new Date().getFullYear() }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    authenticated: Boolean,
  },
};
</script>
