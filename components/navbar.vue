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
import { mapState, mapMutations, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase'

export default {
  name: 'navbar',

  props: {},

  data () {
    return {}
  },

  computed: mapState([
    'counter',
    'signedIn',
    'displayName',
    'photoURL',
  ]),

  components: {},

  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$store.commit('signIn', {displayName: result.user.displayName,
                                      photoURL: result.user.photoURL});
      }).catch((error) => {
        console.log(error);
      });
    },

    signOut () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('signOut')
      }).catch((error) => {
        console.log(error);
      });
    },

    increment () {
      this.$store.commit('increment')
    }
  },
}
</script>
