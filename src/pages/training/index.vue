<template>
  <div>
    <p>Redirecting to home...</p>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push("/");
  },
};
</script>
