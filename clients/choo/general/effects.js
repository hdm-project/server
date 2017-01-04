module.exports = globalConfig => ({
  messageIncoming: messageIncoming,
  setUsername:  setUsername,
  sendCode: sendCode,
  saveLocally: saveLocally(globalConfig),
  checkForPreviousSession: checkForPreviousSession(globalConfig),
  recover: recover
})

function messageIncoming(state, data, send, done) {
  var update = {
    id: data.id
  }
  done()
}

function setUsername(state, name, send, done) {
  if (!name) {
    name = state.username
  }
  if (name.length === 0) {
    return done()
  }
  send('updateUsername', name, (err, res) => {})
  if (!state.connected) {
    console.log('did not publish Username')
    return done()
  }
  var data = {
    type: 'USERNAME',
    data: name
  }
  send('p2p:send', data, (err, res) => {})
  done()
}

function sendCode(state, code, send, done) {
  if (!state.connected) {
    console.log('did not publish code')
    return done()
  }
  var data = {
    type: 'CODE',
    data: code
  }
  send('p2p:send', data, (err, res) => {})
  done()
}

function saveLocally(globalConfig) {
  return inner
  function inner(state, _, send, done) {
    var obj = {}
    obj.id = state.id
    obj.username = state.username
    obj.group = state.group
    obj.code = state.code
    window.localStorage[globalConfig.storagePrefix] = JSON.stringify(obj)
    done()
  }
}

function checkForPreviousSession(globalConfig) {
  console.log(globalConfig)
  return inner
  function inner(_, __, send, done) {
    console.log('checking for previous session at: localStorage.' + globalConfig.storagePrefix)
    var obj
    try {
      obj = JSON.parse(localStorage[globalConfig.storagePrefix])
    } catch (err) {
      console.log('error parsing localStorage')
    }
    if (!obj) return done()
    if (!obj.hasOwnProperty('id') || !obj.hasOwnProperty('group') || !obj.hasOwnProperty('username')) return done()
    send('suggestRecovery', obj, (err, res) => {})
    done()
  }
}

function recover(state, _, send, done) {
  var opts
  opts = {
    GID: state.group,
    CID: state.id
  }
  send('p2p:joinStar', opts, (err, res) => {
    console.log(err)
    console.log(res)
  })
}
