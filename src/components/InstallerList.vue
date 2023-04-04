<template>
  <div :class="`py-4 px-12 ${background} ${full && 'min-h-screen pt-1/6'}`">
    <div v-if="!mini" class="flex items-center justify-center">
      <img class="h-47px mr-2" :src="app.icon" />
      <h2 class="text-3xl py-2">{{ app.name }}</h2>
    </div>
    <div v-if="full" class="pt-8 text-lg text-center">
      <p>{{ app.description }}</p>
    </div>
    <div
      class="mx-auto py-10px flex flex-col md:flex-row justify-round items-center flex-wrap"
    >
      <div
        v-for="installer in app?.localInstallers"
        :key="installer.filename"
        class="mx-2"
      >
        <installer-button
          :localurl="localurl"
          :link="installer.file || installer.link"
          :color="true"
          :platform="installer.platform"
          :extension="installer.extension"
          :download="installer.file || installer.src"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "pages",
  props: {
    localurl: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "bg-light-700",
    },
    full: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      default: "",
    },
    mini: {
      type: Boolean,
      default: false,
    },
    app: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
