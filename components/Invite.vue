<template>
  <div
    class="py-6"
  >
    <code class="mini py-7 border-solid border-green-200 border-width-1px">{{ code }}</code>
    <button class="rounded-none py-4 px-2 text-xl border-none" @click="copyText">
      📋
    </button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      code: '...'
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    async getCode () {
      const { hostname, protocol } = window.location
      try {
        const res = await this.$axios.$get(
          `${protocol}//${hostname}:8813/ssb.json`
        )
        if (res && res.pub && res.pub.invite) this.code = res.pub.invite
      } catch (err) {
        this.code = this.$t('inviteError')
      }
    },
    async copyText () {
      try {
        await navigator.clipboard.writeText(this.code)
      } catch (e) {
        navigator.clipboard = this.code
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.mini {
  font-size: 0.4em !important;
}
</style>
