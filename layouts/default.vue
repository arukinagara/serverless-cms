<template>
  <div>
    <navbar />
    <nuxt class="mb-5" />
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
