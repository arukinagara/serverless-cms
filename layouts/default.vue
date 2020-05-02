<template>
  <div>
    <navbar />
    <nuxt />
  </div>
</template>

<script lang="ts">
import navbar from '~/components/navbar.vue'
export default {
  components: {
    navbar,
  }
}
</script>
