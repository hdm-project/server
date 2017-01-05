const ps = require('peer-star')

module.exports = globalConfig => ({
  joinStar: joinStar(globalConfig),
  stop: stop,
  send: send
})

function send(state, data, send, done) {
  if (!state.presenter) {
    console.log('MAIN not available')
    return done()
  }
  state.presenter.send(JSON.stringify(data))
  done()
}

function stop(state, nextOptions, send, done) {
  console.log('stopping?')
  if (state.star) {
    console.log('star present')
    state.star.close(function () {
      console.log('closed star')
      state.star = null
      if (nextOptions) {
        send('p2p:joinStar', nextOptions)
      }
    })
  }
  done()
}

function joinStar(globalConfig) {
  return inner
  function inner(state, options, send, done) {
    if (state.star) {
      send('p2p:stop', options)
    }
    var opts = {
      hubURL: globalConfig.hub,
      GID: options.GID,
      CID: options.CID,
      isMain: false
    }
    state.star = ps(opts)
    send('connecting', {GID: state.star.GID, CID: state.star.CID}, (err, res) => {})

    state.star.on('peer', (peer, id) => {
      if (id === 'MAIN') {
        console.log('connected to MAIN')
        send('p2p:setPresenterPeer', peer, (err, res) => {})
        send('isConnected', true, (err, res) => {})
        send('setUsername', null, (err, res) => {})
      }
    })
    state.star.on('disconnect', (peer, id) => {
      if (id === 'MAIN') {
        console.log('disconnected from MAIN')
        send('p2p:setPresenterPeer', null, (err, res) => {})
        send('isConnected', false, (err, res) => {})
      }
    })
    done()
  }
}