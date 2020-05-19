<template>
  <div class="container">
    <profile v-bind:profile="{ title: this.$route.params.userId,
                               text: '自分のプロフィールを書いてみましょう。' }" />

    <div v-html="$md.render(text)" />

    <template v-if="userId === this.$route.params.userId">
      <nuxt-link type="button" class="btn btn-outline-secondary mr-1"
                 :to="{ name: 'userId-articleId-edit',
                        params: { userId: this.userId,
                                  articleId: this.$route.params.articleId }}">Edit</nuxt-link>
      <button type="button" class="btn btn-outline-danger">Delete</button>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'
import profile from '~/components/profile.vue'

export default {
  created () {
    this.initInput(this.text);
  },

  components: {
    profile,
  },

  computed: {
    ...mapState({
      userId: state => state.user.userId,
    }),
  },

  methods: {
    ...mapMutations({
      initInput: 'initInput',
    }),
  },

  asyncData ({ params, error }) {
    return firebase.firestore().collection('articles').doc(params.articleId).get()
      .then((result) => {
        if (result.exists && params.userId == result.data().userId) {
          return { text: result.data().text };
        } else {
          error({ statusCode: 404, message: 'あれ？ページが見つかりません' })
        }
      }).catch((error) => {
        console.log(error);
        error({ statusCode: 500, message: 'あれ？何かおかしいようです' })
      });
  },
}
</script>
