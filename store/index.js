export const state = () => ({
  signedIn: '',
  displayName: '',
  photoURL: '',
})

export const mutations = {
  signIn (state, user) {
    state.signedIn = true;
    state.displayName = user.displayName;
    state.photoURL = user.photoURL;
  },

  signOut (state) {
    state.signedIn = false;
    state.displayName = '';
    state.photoURL = '';
  }
}
