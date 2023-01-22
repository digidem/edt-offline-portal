<template>
  <article>
    <div class="pt-60px md:pt-0">
      <installer-list full />
    </div>
  </article>
</template>

<script>
import InstallerList from "~/components/InstallerList.vue";

export default {
  components: { InstallerList },
  layout: "items",
};
</script>
