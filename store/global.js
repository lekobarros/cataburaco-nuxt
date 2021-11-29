export const state = () => ({
  listEvents: []
})

export const actions = {
  createEvent ({ commit }, payload) {
    commit()
  }
}

export const mutations = {
  updateListEvent (state, payload) {
    state.listEvents = [state.listEvents, payload];
  }
}