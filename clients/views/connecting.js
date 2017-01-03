const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})


module.exports = function (globalConfig) {
  return function (state, prev, send) {

    if (state.p2p.star && !state.p2p.star.closed && state.p2p.star.peers.length > 0) {
      send('location:set', '/game')
    }

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
    function cancel(event) {
      send('p2p:stop', null)
      send('location:set', '/')
    }

  }
}
