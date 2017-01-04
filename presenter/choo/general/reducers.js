module.exports = globalConfig => ({
  clientAdded: addClient,
  clientLeft: (state, data) => {
    removeClientByID(state, data.id)
  },
  updateUsername: updateUsername
})

function addClient(state, data) {
  state.clients.ids.push(data.id)
  state.clients.peers[data.id] = data.peer
  state.clients.names[data.id] = 'unknown'
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
