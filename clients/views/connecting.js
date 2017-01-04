const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})

module.exports = function (globalConfig) {
  return function (state, prev, send) {

    if (state.p2p.star && !state.p2p.star.closed && state.p2p.star.peers.length > 0) {
      return htmlChoseName()
    }

    return htmlConnecting()

    function htmlChoseName() {
      return html`
<div id="login">
  <div class="center">
    <div class="login_window">
      <div class="row">
          <h1>Enter a Name</h1>
      </div>
      <div class="row">
          <input type="text" id="username" name="username" class="enter_id" value="${retrieveCurrentUsername()}">
          <button class="login_start" onclick=${publishName}>Confirm</button>
      </div>
    </div>
  </div>
</div>
`
    }

    function publishName(event) {
      var username = document.getElementById('username').value
      if (username.length > 0) {
        send('p2p:setUsername', username)
        send('location:set', '/game')
      }
    }

    function retrieveCurrentUsername() {
      return state.p2p.username
    }

    function htmlConnecting() {
      return html`
<div id="login">
  <div class="center">
    <div class="login_window">
      <div class="row">
          <h1>Connecting...</h1>
      </div>
      <div class="row">
          <img src="../imgs/load.gif" alt="loading" class="login_loading">
      </div>
      <div class="row">
        <button class="login_cancel" onclick=${cancel}>Cancel</button>
      </div>
    </div>
  </div>
</div>
`
    }

    function cancel(event) {
      send('p2p:stop', null)
      send('location:set', '/')
    }

  }
}
