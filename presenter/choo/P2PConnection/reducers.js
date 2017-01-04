module.exports = globalConfig => ({
  clientAdded: addClient,
  clientLeft: (state, data) => {
    console.log('disconnected from a peer:', data.id)
    console.log('total peers:', state.star.peers.length)
    removeClientByID(state, data.id)
  },
  updateUsername: updateUsername
})

function addClient(state, data) {
  console.log('connected to a new peer:', data.id)
  console.log('total peers:', state.star.peers.length)
  var c = {
    id: data.id,
    peer: data.peer,
    name: 'noName'
  }
  state.clients.push(c)
}

function removeClientByID(state, id) {
  var i
  for (i = 0; i < state.clients.length; i++) {
    if (state.clients[i].id = id) {
      state.clients.splice(i, 1)
      return
    }
  }
}

function updateUsername(state, data) {
  for (var c in state.clients) {
    if (state.clients[c].id = data.id) {
      state.clients[c].name = data.name
    }
  }
}
