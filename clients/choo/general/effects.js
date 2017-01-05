module.exports = globalConfig => ({
  messageIncoming: messageIncoming,
  setUsername: setUsername,
  sendCode: sendCode,
  saveLocally: saveLocally(globalConfig),
  cleanExit: cleanExit(globalConfig),
  checkForPreviousSession: checkForPreviousSession(globalConfig),
  recover: recover
})

function messageIncoming (state, data, send, done) {
  var update = {
    id: data.id
  }
  console.log('Message from ' + update + ' of type ' + data.type)
  done()
}

function setUsername (state, name, send, done) {
  if (!name) {
    name = state.username
  }
  if (!name || name.length === 0) {
    return done()
  }
  send('updateUsername', name, (err, res) => {
    if (err) done(err)
  })
  if (!state.connected) {
    console.log('did not publish Username')
    return done()
  }
  var data = {
    type: 'USERNAME',
    data: name
  }
  send('p2p:send', data, (err, res) => {
    if (err) done(err)
  })
  done()
}

function sendCode (state, code, send, done) {
  // TODO: remove, testing purpose!!
  state.code = code
  if (!state.connected) {
    console.log('did not publish code')
    return done()
  }
  var data = {
    type: 'CODE',
    data: code
  }
  send('p2p:send', data, (err, res) => {
    if (err) done(err)
  })
  done()
}

function saveLocally (globalConfig) {
  return inner
  function inner (state, _, send, done) {
    console.log('saving to: localStorage.' + globalConfig.storagePrefix)
    var obj = {}
    obj.id = state.id
    obj.username = state.username
    obj.group = state.group
    obj.code = state.code
    localStorage[globalConfig.storagePrefix] = JSON.stringify(obj) // eslint-disable-line
    done()
  }
}

function cleanExit (globalConfig) {
  return inner
  function inner (_, __, send, done) {
    var data = {
      type: 'QUIT',
      data: null
    }
    send('p2p:send', data, (err, res) => {
      if (err) done(err)
    })
    send('p2p:stop', null, (err, res) => {
      if (err) done(err)
    })
    delete localStorage[globalConfig.storagePrefix] // eslint-disable-line
    send('denyRecovery', null, (err, res) => {
      if (err) done(err)
    })
    send('location:set', '/', (err, res) => {
      if (err) done(err)
    })
    done()
  }
}

function checkForPreviousSession (globalConfig) {
  return inner
  function inner (_, __, send, done) {
    console.log('checking for previous session at: localStorage.' + globalConfig.storagePrefix)
    var obj = localStorage[globalConfig.storagePrefix] // eslint-disable-line
    if (!obj) {
      console.log('nothing found')
      return done()
    }
    try {
      obj = JSON.parse(obj)
    } catch (err) {
      console.log('error parsing localStorage')
      return done()
    }
    if (!obj.id || !obj.group || !obj.username) return done()
    send('suggestRecovery', obj, (err, res) => {
      if (err) done(err)
    })
    done()
  }
}

function recover (state, _, send, done) {
  var opts
  opts = {
    GID: state.group,
    CID: state.id
  }
  send('p2p:joinStar', opts, (err, res) => {
    if (err) done(err)
  })
  send('location:set', '/connecting', (err, res) => {
    if (err) done(err)
  })
  done()
}
