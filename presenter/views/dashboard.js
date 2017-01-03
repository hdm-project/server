const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})

function peerToLi(peer) {
  return html`
    <li>${peer}</li>
  `
}

module.exports = function (globalConfig) {

  return function (state, prev, send) {

    if (!state.p2p.star || state.p2p.star.closed) {
      send('location:set', '/')
    }

    return html`
<div>
    <div class="row">
        <h1>Board of Dashiness!</h1>
    </div>
    <div class="row">
    <ul>
        ${Object.keys(state.p2p.clients).map(peerToLi)}
    </ul>
    </div>
</div>
`
  }
}
