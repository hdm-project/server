const ps = require('peer-star')

module.exports = globalConfig => ({
  setUsername:  setUsername,
  joinStar: joinStar(globalConfig),
  stop: stop,
  sendCode: sendCode
})

function setUsername(state, name, send, done) {
  if (!name) {
    name = state.username
  }
  if (name.length === 0) {
    return done()
  }
  send('p2p:updateUsername', name, (err, res) => {})
  if (!state.presenter) {
    console.log('did not publish Username')
    return done()
  }
  var data = {
    type: 'USERNAME',
    data: name
  }
  state.presenter.send(JSON.stringify(data))
  done()
}

function sendCode(state, code, send, done) {
  if (!state.presenter) {
    console.log('did not publish code')
    return done()
  }
  var data = {
    type: 'CODE',
    data: code
  }
  state.presenter.send(JSON.stringify(data))
  done()
}

function stop(state, nextGroup, send, done) {
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

function joinStar(globalConfig) {
  return inner
  function inner(state, group, send, done) {
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
      if (id === 'MAIN') {
        send('p2p:setPresenterPeer', peer, (err, res) => {})
        send('p2p:setUsername', null, (err, res) => {})
      }
    })
    state.star.on('disconnect', (peer, id) => {
      console.log('disconnected from a peer:', id)
      console.log('total peers:', state.star.peers.length)
      if (id === 'MAIN') {
        send('p2p:setPresenterPeer', null, (err, res) => {})
      }
    })
    done()
  }
}