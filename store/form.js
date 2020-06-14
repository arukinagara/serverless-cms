export const state = () => ({
  title: '',
  text: '',
  tags: [],
})

export const mutations = {
  init (state, form) {
    state.title = form.title;
    state.text = form.text;
    state.tags = form.tags;
  }
}
