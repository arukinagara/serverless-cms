<template>
  <nav class="navbar navbar-dark bg-dark mb-4">
    <nuxt-link to="/" class="navbar-brand">Oboegaki</nuxt-link>

    <div class="d-flex justify-content-end align-items-center">

      <template v-if="auth">
        <nuxt-link :to="{ name: 'userId', params: { userId: this.userId }}">
          <img v-bind:src="photoURL" class="rounded-circle mr-2" width="30" height="30">
        </nuxt-link>
        <nuxt-link :to="{ name: 'userId', params: { userId: this.userId }}">
          <span class="navbar-text mr-3">{{ displayName }}</span>
        </nuxt-link>
        <button type="button"
                class="btn btn-secondary btn-sm"
                v-on:click="signOut">Sign-out</button>
      </template>

      <template v-else>
        <button type="button"
                class="btn btn-secondary btn-sm"
                v-on:click="signIn">Sign-in with Google</button>
      </template>

      <nuxt-link class="btn btn-info btn-sm ml-2"
                 v-bind:class="{ disabled: !auth }"
                 v-bind:to="{ name: 'userId-new', params: { userId: userId || 'placeholder' } }">投稿</nuxt-link>

    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

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
    ...mapActions('user', [
      'signIn',
      'signOut',
    ]),
  },
}
</script>
