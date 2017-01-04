module.exports = globalConfig => ({
  clientAdded: addClient,
  clientLeft: (state, data) => {
    removeClientByID(state, data.id)
  },
  updateUsername: updateUsername
})

function addClient(state, data) {
  state.clientIds.push(data.id)
  state.clientPeers[data.id] = data.peer
  state.clientNames[data.id] = 'unknown'
}

function removeClientByID(state, id) {
  var i = state.clientIds.indexOf(id)
  if (i < 0) return
  state.clientIds.splice(i, 1)
  delete state.clientNames[id]
  state.clientPeers[id].destroy()
  delete state.clientPeers[id]
}

function updateUsername(state, data) {
  state.clientNames[data.id] = data.name
}
