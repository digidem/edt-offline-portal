<template>
  <article>
    <div class="pt-48">
      <h2 class="text-3xl text-center py-10px">{{ page.title }}</h2>
      <div class="w-90vw m-auto py-10px">
        <nuxt-content :document="page" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  layout: "items",
  async asyncData({ $content, i18n }) {
    const locale = i18n.getLocaleCookie();
    const term = "guide-lines";
    const localized = locale
      ? locale === "en"
        ? term
        : `${term}_${locale}`
      : term;
    const page = await $content(localized).fetch();
    return {
      page,
    };
  },
};
</script>
