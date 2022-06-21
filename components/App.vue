<template>
<section
        :class="`spotlight style1 orient-${orientation} content-align-left image-position-center onscroll-image-fade-in`"
      >
        <div class="content">
          <h2>{{title}}</h2>
          <NuxtContent :document="document" tag="content" />
          <ul class="flex flex-col list-none">
            <li v-for="app in apps" :key="app.slug">
              <NuxtLink
                :to="`/apps/${app.slug}`"
                class="button w-320px"
                >{{app.title}}</NuxtLink
              >
              <span>{{app.description}}</span>
            </li>
          </ul>
        </div>
        <div class="image">
          <img :src="require(`~/assets/images/${image}`)" />
          <!-- <iframe
            class="elementor-background-video-embed"
            frameborder="0"
            allowfullscreen="1"
            autoplay="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            :src=""
            id="widget2"
            style="width: 100%; height: 100%;"
          ></iframe> -->
        </div>
      </section>

</template>
<script>

export default {
    props: {
        orientation: {
            type: String,
            default: 'left'
        },
        image: {
          type: String,
          default: 'fdroid.jpg'
        },
        title: {
          type: String,
          default: 'Title'
        },
        document: Object,
        apps: {
          type: Array,
          default: () => []
        }
    }
}
</script>

