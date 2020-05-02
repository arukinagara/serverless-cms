<template>
  <nav class="navbar navbar-dark bg-dark mb-4">
    <a class="navbar-brand" href="#">arukinagara kangaeru</a>
    <div class="collapse d-flex justify-content-end">
    <template v-if="signedIn">
      <img v-bind:src="photoURL" class="rounded-circle mr-2" width="30" height="30">
      <span class="navbar-text mr-3">{{ displayName }}</span>
      <button type="button"
              class="btn btn-outline-secondary btn-sm float-right"
              v-on:click="signOut">Sign-out</button>
    </template>
    <template v-else>
      <button type="button"
              class="btn btn-outline-secondary btn-sm float-right"
              v-on:click="signIn">Sign-in with Google</button>
    </template>
    </div>
  </nav>
</template>

<script>
import Vue, { PropOptions } from 'vue'
import firebase from '~/plugins/firebase'

export default {
  name: 'navbar',

  props: {},

  data () {
    return {
      signedIn: false,
      displayName: '',
      photoURL: '',
    }
  },

  computed: {},

  components: {},

  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        if (result.user !== null) {
          this.signedIn = true;
          this.displayName = result.user.displayName;
          this.photoURL = result.user.photoURL;
        }
      }).catch((error) => {
        console.log(error);
      });
    },

    signOut () {
      firebase.auth().signOut().then(() => {
        this.signedIn = false;
        this.displayName = '';
        this.photoURL = '';
      }).catch((error) => {
        console.log(error);
      });
    }
  },
}
</script>
