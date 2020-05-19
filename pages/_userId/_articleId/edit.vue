<template>
  <articleForm v-bind:text="text" />
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
import articleForm from '~/components/articleForm.vue'

export default {
  components: {
    articleForm,
  },

  computed: {
    ...mapState({
      text: state => state.text,
    }),
  },

  middleware: 'auth',
}
</script>
