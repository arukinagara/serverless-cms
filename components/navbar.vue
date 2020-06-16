<template>
  <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4">
    <nuxt-link to="/">
      <b-navbar-brand>Oboegaki</b-navbar-brand>
    </nuxt-link>

    <b-navbar-toggle target="nav-collapse" class="my-1"/>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-text>
          <template v-if="auth">
            <nuxt-link :to="{ name: 'userId', params: { userId: this.userId }}">
              <img v-bind:src="photoURL" class="rounded-circle mr-2" width="30" height="30">
            </nuxt-link>

            <nuxt-link :to="{ name: 'userId', params: { userId: this.userId }}">
              <span class="navbar-text mr-3">{{ displayName }}</span>
            </nuxt-link>

            <button type="button"
                    class="btn btn-secondary btn-sm mr-2"
                    v-on:click="signOut">Sign-out</button>
          </template>

          <template v-else>
            <button type="button"
                    class="btn btn-secondary btn-sm mr-2"
                    v-on:click="signIn">Sign-in with Google</button>
          </template>
        </b-nav-text>

        <b-nav-text>
          <nuxt-link class="btn btn-info btn-sm"
                 v-bind:class="{ disabled: !auth }"
                 v-bind:to="{ name: 'userId-new', params: { userId: userId || 'placeholder' } }">投稿</nuxt-link>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
