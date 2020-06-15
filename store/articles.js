import firebase from '~/plugins/firebase';

export const state = () => ({
  list: [],
  last: false,
  userId: '',
})

export const mutations = {
  init (state, userId) {
    state.list = [];
    state.last = false;
    state.userId = userId;
  },

  fetch (state, articles) {
    if (articles.length < 9) {
      state.last = true;
    }

    state.list.push(...articles);
  },

  add (state, article) {
    state.list.unshift(article);
  },

  update (state, article) {
    const index = state.list.findIndex(a => a.articleId === article.articleId);
    if (index !== -1) {
      state.list[index].title = article.title;
      state.list[index].text = article.text;
      state.list[index].tags = article.tags;
    }
  },

  remove (state, article) {
    const index = state.list.findIndex(a => a.articleId === article.articleId);
    if (index !== -1) {
      state.list.splice(index, 1);
    }
  },
}

export const actions = {
  fetch (context, userId = '') {
    //console.log(context.state.userId);
    //console.log(userId);
    //if (context.state.userId !== userId) {
    //  context.commit('init', userId);
    //}

    const articles = [];
    const articlesRef = userId ?
                            firebase.firestore().collection('articles').where('userId', '==', userId).orderBy('timestamp', 'desc') :
                            firebase.firestore().collection('articles').orderBy('timestamp', 'desc');
    const articlesQuery = context.state.list.length ?
                              articlesRef.startAfter(context.state.list[context.state.list.length - 1].timestamp) :
                              articlesRef;

    return new Promise((resolve, reject) => {
      if (!context.state.last) {
        articlesQuery.limit(9).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              articles.push({ articleId: doc.id,
                              userId: doc.data().userId,
                              photoURL: doc.data().photoURL,
                              title: doc.data().title,
                              text: doc.data().text,
                              tags: doc.data().tags,
                              timestamp: doc.data().timestamp });
            });

            context.commit('fetch', articles);

            articles.length < 9 ? resolve(true) : resolve(false);
          }).catch((error) => {
            reject(error);
          });
      } else {
        resolve(context.state.last);
      }
    });
  },
}
