const test = {
  /* state: {
    count: 0
  }, */
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    INCREMENT (state) {
      state.count++
    },
    INCREMENTBYPAYLOAD (state, payload) {
      state.count += payload.amount
    },
    UPDATE_COUNT (state, amount) {
      state.count = amount
    }
  },
  actions: {
    increment ({ commit }) {
      setTimeout(() => {
        commit('INCREMENT')
      }, 1000)
    },
    increment2 ({ commit }) {
      commit({type: 'INCREMENTBYPAYLOAD', amount: 20})
    }
  }
}
export default test
