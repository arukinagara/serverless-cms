<template>
  <div class="container">

    <div class="row align-items-end">
      <div class="col-3">
        <p>input:</p>
      </div>

      <div class="col-3 d-flex justify-content-end">
        <button type="button"
                class="btn btn-outline-secondary mb-2"
                v-on:click="saveArticle">Submit</button>
      </div>

      <div class="col-6">
        <p>preview:</p>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <textarea class="form-control" v-model="$data._text" style="height: 75vh;"></textarea>
      </div>

      <div class="col-6">
        <div v-html="$md.render($data._text)" class="overflow-auto" style="height: 75vh;" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },

  data () {
    return {
      _text: this.text,
    }
  },

  computed: mapState({
    userId: state => state.user.userId,
  }),

  methods: {
    saveArticle () {
      !this.text ? this.addArticle() : this.updateArticle();
    },

    addArticle () {
      firebase.firestore().collection('articles').add({
        userId: this.$store.state.user.userId,
        text: this.$data._text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((result) => {
        this.$router.push({name: 'userId-articleId',
                           params: { userId: this.$store.state.user.userId,
                                     articleId: result.id }});
      }).catch((error) => {
        console.log(error);
      });
    },

    updateArticle () {
      firebase.firestore().collection('articles').doc(this.$route.params.articleId).update({
        text: this.$data._text,
      }).then((result) => {
        this.$router.push({name: 'userId-articleId',
                           params: { userId: this.$store.state.user.userId,
                                     articleId: this.$route.params.articleId }});
      }).catch((error) => {
        console.log(error);
      });
    },
  },
}
</script>
