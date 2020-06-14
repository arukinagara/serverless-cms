<template>
  <div class="container">
    <div class="row mb-2">
      <div class="col-8 offset-2">
        <h1>{{ article.title }}</h1>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-8 offset-2 d-flex">
        <img v-bind:src="article.photoURL" class="mr-2 rounded-circle" width="30" height="30" />

        <small>
          <p class="mb-0">{{ article.userId }}</p>
          <p class="mb-0 text-secondary">{{ article.timestamp }}</p>
        </small>

        <template v-if="userId == this.$route.params.userId">
          <div id="my-container" class="ml-auto">
            <img src="~/static/more-horizontal.svg"
                 id="menu" />

            <b-popover target="menu"
                       triggers="hover"
                       placement="bottomleft"
                       container="my-container"
                       ref="popover">
              <div>
                <nuxt-link class="text-secondary"
                           v-bind:to="{ name: 'userId-articleId-edit',
                                        params: { userId: article.userId,
                                                  articleId: article.articleId } }">記事の編集</nuxt-link>
              </div>
              <div>
                <button type="button"
                        class="btn btn-link btn-sm text-secondary pl-0"
                        v-on:click="deleteModal">記事の削除</button>
              </div>
            </b-popover>
          </div>
        </template>

      </div>
    </div>

    <div class="row mb-4">
      <div class="col-8 offset-2">
        <div v-html="$md.render(article.text)" />
      </div>
    </div>

    <div class="row">
      <div class="col-8 offset-2">
        <ul class="list-inline">
          <li class="list-inline-item border rounded px-2 py-1" v-for="tag in article.tags">
            #{{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import firebase from '~/plugins/firebase';

export default {
  mounted () {
    this.init({ title: this.article.title,
                text: this.article.text,
                tags: this.article.tags });
  },

  computed: {
    ...mapState({
      auth: state => state.user.auth,
      displayName: state => state.user.displayName,
      userId: state => state.user.userId,
      photoURL: state => state.user.photoURL,
    }),
  },

  methods: {
    deleteModal() {
      this.$bvModal.msgBoxConfirm('記事を削除します', {
        size: 'sm',
        okVariant: 'danger btn-sm',
        cancelVariant: 'outline-secondary btn-sm'
      }).then((value) => {
        if (value) {
          firebase.firestore().collection('articles').doc(this.$route.params.articleId).delete()
            .then((result) => {
              this.remove({ articleId: this.$route.params.articleId });

              this.$router.push({ name: 'userId',
                                  params: { userId: this.$store.state.user.userId }});
            }).catch((error) => {
              console.log(error);
            });
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    ...mapMutations({
      init: 'form/init',
      remove: 'articles/remove',
    }),
  },

  asyncData ({ params, error }) {
    return firebase.firestore().collection('articles').doc(params.articleId).get()
      .then((result) => {
        if (result.exists && params.userId == result.data().userId) {
          return { article: { articleId: result.id,
                              userId: result.data().userId,
                              photoURL: result.data().photoURL,
                              title: result.data().title,
                              text: result.data().text,
                              tags: result.data().tags,
                              timestamp: result.data().timestamp.toDate().toLocaleString('ja-JP'), }};
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
