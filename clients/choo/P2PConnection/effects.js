const ps = require('peer-star')

module.exports = globalConfig => ({
  joinStar: (state, group, send, done) => {
    if (state.star) {
      send('p2p:stop', group)
    }
    var opts = {
      hubURL: globalConfig.hub,
      GID: group,
      isMain: false
    }
    state.star = ps(opts)

    state.star.on('peer', (peer, id) => {
      console.log('connected to a new peer:', id)
      console.log('total peers:', state.star.peers.length)
      send('p2p:connected', true, (err, res) => {})
    })
    state.star.on('disconnect', (peer, id) => {
      console.log('disconnected from a peer:', id)
      console.log('total peers:', state.star.peers.length)
      if (state.star.peers.length < 1) {
        send('p2p:connected', false, (err, res) => {})
      }
    })
    done()
  },
  stop: (state, nextGroup, send, done) => {
    if (state.star) {
      state.star.close(function () {
        console.log('closed star')
        state.star = null
        if (nextGroup) {
          send('p2p:joinStar', nextGroup)
        }
      })
    }
    done()
  }
})
