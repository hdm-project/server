module.exports = globalConfig => ({
  updateUsername: updateUsername,
  isConnected: isConnected,
  loadLocal: loadLocal(globalConfig)
})

function isConnected(state, isConnected) {
  state.connected = isConnected
  return state
}

function updateUsername(state, name) {
  state.username = name
  return state
}

function loadLocal(globalConfig) {
  return inner
  function inner(state, name) {
    var obj = window.localStorage[globalConfig.storagePrefix]
    state.id = obj.id
    state.username = obj.username
    state.group = obj.group
    state.code = obj.code
  }
}