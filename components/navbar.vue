<template>
  <nav class="navbar navbar-dark bg-dark mb-4">
    <nuxt-link to="/" class="navbar-brand">Oboegaki</nuxt-link>

    <div class="collapse d-flex justify-content-end">

      <template v-if="auth">
        <nuxt-link :to="{ name: 'userId', params: { userId: this.userId }}">
          <img v-bind:src="photoURL" class="rounded-circle mr-2" width="30" height="30">
          <span class="navbar-text mr-3">{{ displayName }}</span>
          <button type="button"
                  class="btn btn-outline-secondary btn-sm float-right"
                  v-on:click="signOut">Sign-out</button>
        </nuxt-link>
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
import { mapState, mapMutations } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  computed: {
    ...mapState({
      auth: state => state.user.auth,
      displayName: state => state.user.displayName,
      userId: state => state.user.userId,
      photoURL: state => state.user.photoURL,
    }),
  },

  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.signedIn({displayName: result.user.displayName,
                       email: result.user.email,
                       photoURL: result.user.photoURL});
      }).catch((error) => {
        console.log(error);
      });
    },

    signOut () {
      firebase.auth().signOut().then(() => {
        this.signedOut();
      }).catch((error) => {
        console.log(error);
      });
    },

    ...mapMutations({
      signedIn: 'user/signedIn',
      signedOut: 'user/signedOut',
    }),
  },
}
</script>
