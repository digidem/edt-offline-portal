<template>
  <div class="mx-auto my-50px md:mt-150px max-w-50vw text-center pt-35px border-solid border-t-1">
    <span>
      {{$t('madeWithLove')}} <a href="http://coolab.org">Coolab</a> {{$t('withSupport')}} <a href="https://opencollective.com/secure-scuttlebutt-consortium">Secure Scuttlebutt Consortium</a>
      <!-- <img src="~/assets/cc.svg" alt="cc" class="h-20px w-20px" /> -->
      {{ new Date().getFullYear() }}
    </span>
  </div>
</template>