<template>
  <article>
    <!-- <a class="absolute top-2 right-2 z-20">
      <nuxt-link :to="switchLocalePath('pt')">Português</nuxt-link>
    </a> -->
    <div id="wrapper" class="divided">
      <!-- Capa -->
      <section
        class="pt-60px banner style1 orient-left content-align-left image-position-right onload-image-fade-in onload-content-fade-right"
      >
        <div
          class="content min-w-screen bg-cover bg-no-repeat bg-center"
          :style="getBackground(index.image, true)"
        >
          <div class="bg-light-50 py-2 px-4 w-auto">
            <div class="flex text-left mx-auto">
              <h1>{{ index.title }}</h1>
            </div>
            <p class="major">
              <NuxtContent :document="index" tag="content" />
            </p>
          </div>
        </div>
      </section>
      <BlockList :blocks="blocks" />
      <div
        v-if="documentation.length > 0"
        id="Documentation"
        class="text-center bg-light-400"
      >
        <h1 class="text-2xl py-18 uppercase font-thing">
          {{ $t("documentation") }}
        </h1>
        <BlockList :blocks="documentation" />
      </div>
    </div>
  </article>
</template>

<script>
import getImage from "@/libs/getImage";

export default {
  layout: "items",
  async asyncData({ $content, params, redirect }) {
    if (params?.pathMatch) {
      const folderName = "pages";
      const allPages = await $content(folderName, {
        deep: true,
      }).fetch();
      const pages = allPages.filter((page) => {
        const term = page.dir.split(folderName)[1].split("/")[1];
        return term === params.pathMatch.split("/")[0];
      });
      if (pages) {
        let index = null;
        const documentation = [];
        const blocks = [];
        pages.forEach((p) => {
          if (p.category === "documentation") documentation.push(p);
          else if (p.slug === "index") index = p;
          else blocks.push(p);
        });
        if (index) {
          return {
            index,
            blocks,
            documentation,
          };
        }
      }
    }
    redirect("/");
  },
  methods: {
    getBackground(img) {
      if (process.client) {
        return getImage(img, true);
      } else return "";
    },
  },
};
</script>
