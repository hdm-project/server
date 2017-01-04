module.exports = globalConfig => ({
  clientAdded: addClient,
  clientLeft: clientLeft,
  updateUsername: updateUsername,
  updateCode: updateCode(globalConfig)
})

function addClient(state, data) {
  state.clients.ids.push(data.id)
  state.clients.peers[data.id] = data.peer
  state.clients.names[data.id] = 'unknown'
}

function clientLeft(state, data) {
  removeClientByID(state, data.id)
}

function removeClientByID(state, id) {
  var i = state.clients.ids.indexOf(id)
  if (i < 0) return
  state.clients.ids.splice(i, 1)
  delete state.clients.names[id]
  state.clients.peers[id].destroy()
  delete state.clients.peers[id]
}

function updateUsername(state, data) {
  state.clients.names[data.id] = data.name
}
function updateCode(globalConfig) {
  return inner
  function inner(state, data) {
    var codeArray
    if (!state.clients.code.hasOwnProperty(data.id)) {
      state.clients.code[data.id] = []
    }
    codeArray = state.clients.code[data.id]
    codeArray.unshift(data.code)
    if (codeArray.length > globalConfig.MAX.codeHistory) {
      state.clients.code[data.id] = codeArray.slice(0, globalConfig.MAX.codeHistory)
    }
    console.log(state.clients.code[data.id])
  }
}
