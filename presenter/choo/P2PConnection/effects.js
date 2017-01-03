const ps = require('peer-star')

module.exports = globalConfig => ({
  createStar: (state, group, send, done) => {
    var opts = {
      hubURL: globalConfig.hub,
      GID: group,
      isMain: true
    }
    state.star = ps(opts)

    state.star.on('peer', (peer, id) => {
      send('p2p:clientAdded', {peer: peer, id: id}, (err, res) => {})
    })
    state.star.on('disconnect', (peer, id) => {
      send('p2p:clientLeft', {peer: peer, id: id}, (err, res) => {})
    })
    done()
  }
})
