const ps = require('peer-star')

module.exports = globalConfig => ({
  createStar: createStar(globalConfig),
  broadcast: broadcast,
  sendTo: sendTo
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
      send('clientAdded', {peer: peer, id: id}, (err, res) => {})
      addListenersToPeer(send, peer, id)
    })
    state.star.on('disconnect', (peer, id) => {
      peer.destroy()
      send('clientLeft', {peer: peer, id: id}, (err, res) => {})
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
    send('messageIncoming', {
      id: id,
      type: decoded.type,
      content: decoded.data
    }, (err, res) => {})
  })
}

function broadcast(state, data, send, done) {
  for (var p in state.star.peers) {
    state.star.peers[p].send(JSON.stringify(data))
  }
  done()
}

function sendTo(state, msg, send, done) {
  var recipient, content
  recipient = state.star.contacts[msg.id]
  content = msg.data
  if (!recipient || state.star.peers.indexOf(msg.id) < 0) {
    console.log(msg.id + ' peer not present')
    return done()
  }
  recipient.send(content)
  done()
}