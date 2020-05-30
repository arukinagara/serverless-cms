<template>
  <div class="container">
    <articleForm v-bind:text="text" v-bind:tags="tags" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
import articleForm from '~/components/article-form.vue'

export default {
  components: {
    articleForm,
  },

  computed: {
    ...mapState({
      text: state => state.form.text,
      tags: state => state.form.tags,
    }),
  },

  middleware: 'auth',
}
</script>
