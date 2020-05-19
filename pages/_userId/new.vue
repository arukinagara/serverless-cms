<template>
  <articleForm />
</template>

<script>
import articleForm from '~/components/articleForm.vue'

export default {
  components: {
    articleForm,
  },

  middleware: 'auth',
}
</script>
