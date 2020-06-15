<template>
  <div>
    <div class="row align-items-end">
      <div class="col-3">
        <p>input:</p>
      </div>

      <div class="col-3 d-flex justify-content-end">
        <button type="button"
                class="btn btn-info mb-2"
                v-on:click="saveArticle"
                v-bind:disabled="!$data._title || !$data._text">送信</button>
      </div>

      <div class="col-6">
        <p>preview:</p>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-6">
        <input type="text" class="form-control" v-model="$data._title" placeholder="title" />
      </div>

      <div class="col-6">
        <div v-html="$md.render($data._title)" class="overflow-auto" />
      </div>
    </div>

    <div class="row mb-2">
      <div class="col-6">
        <textarea class="form-control" v-model="$data._text" style="height: 65vh;" placeholder="text" />
      </div>

      <div class="col-6">
        <div v-html="$md.render($data._text)" class="overflow-auto" style="height: 65vh;" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <b-form-tags v-model="$data._tags"
                     class="form-control mb-4"
                     remove-on-delete
                     separator=" ,;"
                     placeholder="tag" />
      </div>

      <div class="col-6">
        <ul class="list-inline">
          <li class="list-inline-item" v-for="(tag, index) in $data._tags">#{{ tag }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import firebase from '~/plugins/firebase';

export default {
  name: 'articleForm',

  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    }
  },

  data () {
    return {
      _title: this.title,
      _text: this.text,
      _tags: this.tags,
    }
  },

  computed: mapState({
    userId: state => state.user.userId,
    photoURL: state => state.user.photoURL,
    list: state => state.articles.list,
  }),

  methods: {
    saveArticle () {
      if (this.$route.name == 'userId-new') {
        this.addArticle();
      } else if (this.$route.name == 'userId-articleId-edit') {
        this.updateArticle();
      }
    },

    addArticle () {
      firebase.firestore().collection('articles').add({
        userId: this.userId,
        photoURL: this.photoURL,
        title: this.$data._title,
        text: this.$data._text,
        tags: this.$data._tags,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((result) => {
        this.add({ userId: this.userId,
                   photoURL: this.photoURL,
                   articleId: result.id,
                   title: this.$data._title,
                   text: this.$data._text,
                   tags: this.$data._tags,
                   timestamp: firebase.firestore.Timestamp.now(), });

        this.$router.push({ name: 'userId-articleId',
                            params: { userId: this.userId,
                                      articleId: result.id }});
      }).catch((error) => {
        console.log(error);
      });
    },

    updateArticle () {
      firebase.firestore().collection('articles').doc(this.$route.params.articleId).update({
        title: this.$data._title,
        text: this.$data._text,
        tags: this.$data._tags,
      }).then((result) => {
        this.update({ articleId: this.$route.params.articleId,
                      title: this.$data._title,
                      text: this.$data._text,
                      tags: this.$data._tags, });

        this.$router.push({ name: 'userId-articleId',
                            params: { userId: this.userId,
                                      articleId: this.$route.params.articleId }});
      }).catch((error) => {
        console.log(error);
      });
    },

    ...mapMutations('articles', [
      'add',
      'update',
    ]),
  },
}
</script>
