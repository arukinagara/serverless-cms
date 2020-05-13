export const state = () => ({
  auth: false,
  displayName: '',
  userId: '',
  photoURL: '',
})

export const mutations = {
  signedIn (state, user) {
    state.auth = true;
    state.displayName = user.displayName;
    state.userId = user.email.split('@')[0];
    state.photoURL = user.photoURL;
  },

  signedOut (state) {
    state.auth = false;
    state.displayName = '';
    state.userId = '';
    state.photoURL = '';
  }
}
