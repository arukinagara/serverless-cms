export const state = () => ({
  text: '',
})

export const mutations = {
  initInput (state, text) {
    state.text = text;
  }
}
