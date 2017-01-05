module.exports = globalConfig => ({
  updateUsername: updateUsername,
  isConnected: isConnected,
  suggestRecovery: suggestRecovery,
  denyRecovery: denyRecovery,
  connecting: connecting
})

function connecting (state, info) {
  state.group = info.GID
  state.id = info.CID
  return state
}

function isConnected (state, isConnected) {
  state.connected = isConnected
  return state
}

function updateUsername (state, name) {
  state.username = name
  return state
}

function suggestRecovery (state, storageData) {
  state.id = storageData.id
  state.username = storageData.username
  state.group = storageData.group
  state.code = storageData.code
  state.recoveryPossible = true
  console.log('suggesting recovery for: ' + storageData.group + ' as ' + storageData.username + ' with id ' + storageData.id)
  return state
}

function denyRecovery (state, _) {
  state.id = null
  state.username = null
  state.group = null
  state.code = null
  state.recoveryPossible = false
  return state
}
