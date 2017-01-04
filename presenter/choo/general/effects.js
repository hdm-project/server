module.exports = globalConfig => ({
  messageIncoming: messageIncoming
})

function messageIncoming(state, data, send, done) {
  var update = {
    id: data.id
  }
  if (data.type === 'USERNAME' && data.content.length > 0) {
    update.name = data.content
    return send('updateUsername', update, (err, res) => {})
  }
  if (data.type === 'CODE' && data.content.length > 0) {
    update.code = data.content
    return send('updateCode', update, (err, res) => {})
  }
  done()
}