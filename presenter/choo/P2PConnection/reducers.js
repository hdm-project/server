module.exports = globalConfig => ({
  func1: (id, state) => {
    state.connectionId = id
    return state
  },
  func2: (id, state) => {
    state.ownId = id
    return state
  }
})
