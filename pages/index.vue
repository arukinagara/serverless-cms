<template>
  <div class="container">
    <div class="row row-cols-lg-3 mb-4">
      <div class="col mb-4" v-for="article in articles" :key="article.articleId">
        <articleCard v-bind:article="article" />
      </div>
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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

  computed: {
    ...mapState({
      articles: state => state.articles.list,
    }),
  },

  methods: {
    infiniteHandler($state) {
      this.fetch().then((last) =>{
        if (last) {
          $state.complete();
        } else {
          $state.loaded();
        }
      });
    },

    ...mapActions('articles', [
      'fetch',
    ]),
  },
}
</script>
