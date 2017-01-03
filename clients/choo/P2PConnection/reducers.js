module.exports = globalConfig => ({
  connected: (state, data) => {
    state.connection = data
    return state
  }
})
