export const state = () => ({
  listEvents: []
})

export const actions = {
  createEvent ({ commit }, payload) {
    commit()
  }
}

export const mutations = {
  updateListEvents (state, payload) {
    const { listEvents } = state;
    state.listEvents = [...listEvents, payload]
  }
}