module.exports = globalConfig => ({
  messageIncoming: messageIncoming,
  setUsername:  setUsername,
  sendCode: sendCode
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