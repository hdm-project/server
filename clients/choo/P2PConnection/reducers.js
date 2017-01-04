module.exports = globalConfig => ({
  setPresenterPeer: setPresenterPeer,
  updateUsername: updateUsername
})

function setPresenterPeer(state, peer) {
  state.presenter = peer
  return state
}

function updateUsername(state, name) {
  state.username = name
  return state
}