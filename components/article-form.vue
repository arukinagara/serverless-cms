<template>
  <div>
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

    <div class="row mb-2">
      <div class="col-6">
        <textarea class="form-control" v-model="$data._text" style="height: 70vh;" placeholder="text" />
      </div>

      <div class="col-6">
        <div v-html="$md.render($data._text)" class="overflow-auto" style="height: 70vh;" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <tagForm v-on:input="$data._tags = $event" v-bind:value="$data._tags" />
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
import { mapState } from 'vuex';
import firebase from '~/plugins/firebase';
import tagForm from '~/components/tag-form.vue';

export default {
  name: 'articleForm',

  components: {
    tagForm,
  },

  props: {
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
      _text: this.text,
      _tags: this.tags,
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
        userId: this.userId,
        text: this.$data._text,
        tags: this.$data._tags,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((result) => {
        this.$router.push({name: 'userId-articleId',
                           params: { userId: this.userId,
                                     articleId: result.id }});
      }).catch((error) => {
        console.log(error);
      });
    },

    updateArticle () {
      firebase.firestore().collection('articles').doc(this.$route.params.articleId).update({
        text: this.$data._text,
        tags: this.$data._tags,
      }).then((result) => {
        this.$router.push({name: 'userId-articleId',
                           params: { userId: this.userId,
                                     articleId: this.$route.params.articleId }});
      }).catch((error) => {
        console.log(error);
      });
    },
  },
}
</script>
