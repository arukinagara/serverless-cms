import firebase from '~/plugins/firebase';

export const state = () => ({
  list: [],
  filter: [],
})

export const mutations = {
  updateArticles (state, articles) {
    state.list = articles;
  },

  updateFilter (state, filter) {
    state.filter = filter;
  }
}

export const actions = {
  updateArticles (context) {
    const articles = [];
    const articlesRef = firebase.firestore().collection('articles');
    const articlesQuery = context.state.filter.length ?
                            articlesRef.where('tags', 'array-contains-any', context.state.filter) :
                            articlesRef;

    articlesQuery.limit(9).get()
      .then((result) => {
        result.forEach((doc) => {
          articles.push({ articleId: doc.id,
                          userId: doc.data().userId,
                          tags: doc.data().tags,
                          text: doc.data().text });
        });
        context.commit('updateArticles', articles);
      }).catch((error) => {
        console.log(error);
      });
  }
}
