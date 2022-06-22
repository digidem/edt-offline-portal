<template>
  <div
    class="p-6 border bg-white dark:bg-black dark:border-gray-700 rounded text-sm"
  >
    <button class="px-4 max-w-auto" @click="copyText">
      <code>{{ code }}</code>
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
    copyText () {
      navigator.clipboard.writeText(this.code)
    }
  }
}
</script>
