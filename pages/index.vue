<template>
  <div class="container">
    <profile v-bind:profile="{ title: 'Oboegaki',
                               text: 'ブログ形式の簡単なCMSです。記事を書くのに、マークダウン記法が使えます。' }" />

    <tagForm v-on:input="tags = $event" v-bind:value="tags" />

    <div class="row row-cols-md-3 mb-4">
      <div class="col mb-4" v-for="article in concatenatedArticles" :key="article.articleId">
        <articleCard v-bind:article="article" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import firebase from '~/plugins/firebase';
import articleCard from '~/components/article-card.vue';
import profile from '~/components/profile.vue';
import tagForm from '~/components/tag-form.vue';

export default {
  head: {
    title: 'Oboegaki'
  },

  components: {
    articleCard,
    profile,
    tagForm,
  },

  data () {
    return {
      tags: [],
    }
  },

  mounted() {
    this.$store.dispatch('articles/updateArticles');
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
      articles: state => state.articles.list,
    }),
  },

  methods: {
    ...mapMutations({
      updateFilter: 'articles/updateFilter',
    }),
  },

  watch: {
    tags: function (value) {
      this.updateFilter(value);
      this.$store.dispatch('articles/updateArticles');
    }
  }
}
</script>
