module.exports = globalConfig => ({
  clientAdded: (state, data) => {
    console.log('connected to a new peer:', data.id)
    console.log('total peers:', state.star.peers.length)
    state.clients[data.id] = data.peer
  },
  clientLeft: (state, data) => {
    console.log('disconnected from a peer:', data.id)
    console.log('total peers:', state.star.peers.length)
    delete state.clients[data.id]
  }
})
