module.exports = globalConfig => ({
  updateUsername: updateUsername,
  isConnected: isConnected
})

function isConnected(state, isConnected) {
  state.connected = isConnected
  return state
}

function updateUsername(state, name) {
  state.username = name
  return state
}
