<template>
  <div class="container">
    <div class="jumbotron">
      <h1 class="display-4">arukinagara.kangaeru</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    </div>

    <input class="form-control mb-4" type="text" placeholder="Default input">

    <div class="row row-cols-md-3 mb-4">
      <div class="col mb-4" v-for="article in changeAuth" :key="article.articleId">
        <articleCard v-bind:article="article" />
      </div>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'
import articleCard from '~/components/articleCard.vue'
import newArticleCard from '~/components/newArticleCard.vue'

export default {
  head: {
    title: 'arukinagara.kangaeru'
  },

  components: {
    articleCard,
    newArticleCard,
  },

  computed: {
    changeAuth () {
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

  // watch: {
  //   auth: (val) => {
  //     console.log(val);
  //   }
  // },

  data () {
    return {
      articles: [],
    }
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
