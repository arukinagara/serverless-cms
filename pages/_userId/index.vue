<template>
  <div class="container">
    <profile v-bind:profile="{ title: this.$route.params.userId,
                               text: '自分のプロフィールを書いてみましょう。' }" />

    <input class="form-control mb-4" type="text" placeholder="Default input">

    <div class="row row-cols-md-3 mb-4">
      <div class="col mb-4" v-for="article in concatenatedArticles" :key="article.articleId">
        <articleCard v-bind:article="article" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'
import articleCard from '~/components/articleCard.vue'
import profile from '~/components/profile.vue'

export default {
  components: {
    articleCard,
    profile,
  },

  data () {
    return {
      articles: [],
    }
  },

  computed: {
    concatenatedArticles () {
      if (this.auth) {
        return [{ articleId: 'new', userId: this.userId, text: '新しい記事' }].concat(this.articles);
      } else {
        return this.articles;
      };
    },
    ...mapState({
      auth: state => state.user.auth,
      displayName: state => state.user.displayName,
      userId: state => state.user.userId,
      photoURL: state => state.user.photoURL,
    }),
  },

  asyncData ({ params }) {
    const articles = [];
    return firebase.firestore().collection('articles').orderBy('timestamp', 'desc').limit(9).get()
      .then((result) => {
        result.forEach((doc) => {
          articles.push({ articleId: doc.id, userId: doc.data().userId, text: doc.data().text });
        });
        return { articles: articles };
      }).catch((error) => {
        console.log(error);
      });
  },
}
</script>
