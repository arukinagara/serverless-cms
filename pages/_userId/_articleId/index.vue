<template>
  <div class="container">
    <profile v-bind:profile="{ title: this.$route.params.userId,
                               text: '自分のプロフィールを書いてみましょう。' }" />

    <div v-html="$md.render(text)" />

    <ul class="list-inline">
      <li class="list-inline-item rounded border border-secondary px-2 py-1" v-for="(tag, index) in tags">#{{ tag }}</li>
    </ul>

    <template v-if="userId === this.$route.params.userId">
      <nuxt-link type="button" class="btn btn-outline-secondary mr-1"
                 :to="{ name: 'userId-articleId-edit',
                        params: { userId: this.userId,
                                  articleId: this.$route.params.articleId }}">Edit</nuxt-link>

      <button type="button" class="btn btn-outline-danger" v-on:click="showMsgBoxOne">Delete</button>
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'
import profile from '~/components/profile.vue'

export default {
  created () {
    this.initInput({ text: this.text, tags: this.tags });
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
    showMsgBoxOne() {
      this.$bvModal.msgBoxConfirm('記事を削除します', {
        size: 'sm',
        okVariant: 'outline-danger',
        cancelVariant: 'outline-secondary'
      }).then((value) => {
        if (value) {
          firebase.firestore().collection('articles').doc(this.$route.params.articleId).delete()
            .then((result) => {
              this.$router.push({name: 'userId',
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
      initInput: 'form/initInput',
    }),
  },

  asyncData ({ params, error }) {
    return firebase.firestore().collection('articles').doc(params.articleId).get()
      .then((result) => {
        if (result.exists && params.userId == result.data().userId) {
          return { text: result.data().text,
                   tags: result.data().tags };
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
