const ps = require('peer-star')

module.exports = globalConfig => ({
  createStar: createStar(globalConfig)
})

function createStar(globalConfig) {
  return inner
  function inner(state, group, send, done) {
    var opts = {
      hubURL: globalConfig.hub,
      GID: group,
      isMain: true
    }
    state.star = ps(opts)

    state.star.on('peer', (peer, id) => {
      send('p2p:clientAdded', {peer: peer, id: id}, (err, res) => {})
      addListenersToPeer(send, peer, id)
    })
    state.star.on('disconnect', (peer, id) => {
      peer.destroy()
      send('p2p:clientLeft', {peer: peer, id: id}, (err, res) => {})
    })
    done()
  }
}

function addListenersToPeer(send, peer, id) {
  peer.on('data', function (data) {
    var decoded
    try {
      decoded = JSON.parse(String(data))
    } catch (err) {
      console.log(err)
      return
    }
    if (!decoded.type) {
      console.log(decoded)
      return
    }
    if (decoded.type === 'USERNAME' && decoded.data.length > 0) {
      var update = {
        id: id,
        name: decoded.data
      }
      send('p2p:updateUsername', update, (err, res) => {})
    }
  })
}