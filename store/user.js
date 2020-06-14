import firebase from '~/plugins/firebase';

export const state = () => ({
  auth: false,
  displayName: '',
  userId: '',
  photoURL: '',
})

export const mutations = {
  signIn (state, user) {
    state.auth = true;
    state.displayName = user.displayName;
    state.userId = user.userId;
    state.photoURL = user.photoURL;
  },

  signOut (state) {
    state.auth = false;
    state.displayName = '';
    state.userId = '';
    state.photoURL = '';
  },
}

export const actions = {
  signIn (context) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        context.commit('signIn', { displayName: result.user.displayName,
                                   userId: result.user.email.split('@')[0],
                                   photoURL: result.user.photoURL });
      }).catch((error) => {
        console.log(error);
      });
    });
  },

  signOut (context) {
    context.commit('signOut');
  },
}
