module.exports = globalConfig => ({
  messageIncoming: messageIncoming
})

function messageIncoming(state, data, send, done) {
  if (data.type === 'USERNAME' && data.content.length > 0) {
    var update = {
      id: data.id,
      name: data.content
    }
    send('updateUsername', update, (err, res) => {})
  }
  done()
}