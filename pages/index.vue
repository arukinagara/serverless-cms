<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-3 mb-4">
      <div class="col mb-4" v-for="article in articles" :key="article.articleId">
        <articleCard v-bind:article="article" />
      </div>
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import articleCard from '~/components/article-card.vue';

export default {
  head: {
    title: 'Oboegaki'
  },

  components: {
    articleCard,
    InfiniteLoading,
  },

  mounted () {
    if (this.userId !== '') {
      this.init();
    }
  },

  computed: {
    ...mapState({
      articles: state => state.articles.list,
      userId: state => state.articles.userId,
    }),
  },

  methods: {
    infiniteHandler($state) {
      this.fetch().then((last) => {
        if (last) {
          $state.complete();
        } else {
          $state.loaded();
        }
      });
    },

    ...mapMutations('articles', [
      'init',
    ]),

    ...mapActions('articles', [
      'fetch',
    ]),
  },
}
</script>
