export const state = () => ({
  text: '',
  tags: [],
})

export const mutations = {
  initInput (state, form) {
    state.text = form.text;
    state.tags = form.tags;
  }
}
