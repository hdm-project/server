const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})


module.exports = function (globalConfig) {
  return function (state, prev, send) {

    if (!state.p2p.star || state.p2p.star.closed) {
      send('location:set', '/')
    }

    return html`
<div>
    <div class="row">
        <h1>Welcome ${state.p2p.username}!</h1>
    </div>
    <div class="row">
        <textarea name="code" id="code"></textarea>
        <button onclick=${sendCode}>send as code</button>
    </div>
</div>
`

    function sendCode(event) {
      var code = document.getElementById('code').value
      event.preventDefault()
      if (!code || code.length === 0) return
      send('p2p:sendCode', code)
    }

  }
}
