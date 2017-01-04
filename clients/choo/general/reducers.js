module.exports = globalConfig => ({
  updateUsername: updateUsername,
  isConnected: isConnected,
  suggestRecovery: suggestRecovery,
  denyRecovery: denyRecovery
})

function isConnected(state, isConnected) {
  state.connected = isConnected
  return state
}

function updateUsername(state, name) {
  state.username = name
  return state
}

function suggestRecovery(state, storageData) {
  state.id = storageData.id
  state.username = storageData.username
  state.group = storageData.group
  state.code = storageData.code
  state.recoveryPossible = true
  console.log('suggesting recovery')
  return state
}

function denyRecovery(state, _) {
  state.recoveryPossible = false
  return state
}