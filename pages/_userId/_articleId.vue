<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">arukinagara.kangaeru</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    </div>
    <div v-html="$md.render(text)" />
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  methods: {},

  computed: {},

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
