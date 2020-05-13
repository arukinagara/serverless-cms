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
        <textarea class="form-control" v-model="text" style="height: 75vh;" />
      </div>
      <div class="col-6">
        <div v-html="$md.render(text)" class="overflow-auto" style="height: 75vh;" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  props: {},

  data() {
    return {
      text: '',
    }
  },

  computed: mapState({
    userId: state => state.user.userId,
  }),

  methods: {
    saveArticle () {
      firebase.firestore().collection('articles').add({
        userId: this.$store.state.user.userId,
        text: this.text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((result) => {
        this.$router.push({name: 'userId-articleId',
                           params: { userId: this.$store.state.user.userId,
                                     articleId: result.id }});
      }).catch((error) => {
        console.log(error);
      });
    }
  },
}
</script>
