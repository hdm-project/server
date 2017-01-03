const ps = require('peer-star')

module.exports = globalConfig => ({
  joinStar: (group, state, send, done) => {
    var opts = {
      hubURL: globalConfig.hub,
      GID: group,
      isMain: false
    }
    state.star = ps(opts)

    state.star.on('peer', (peer, id) => {
      console.log('connected to a new peer:', id)
      console.log('total peers:', state.star.peers.length)
    })
    state.star.on('disconnect', (peer, id) => {
      console.log('disconnected from a peer:', id)
      console.log('total peers:', state.star.peers.length)
    })
  }
})
