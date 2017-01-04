const html = require('choo/html')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})

function clientToLi(c) {
  return html`
    <li>${c.name + ' [' + c.id + ']'}</li>
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
        ${state.p2p.clients.map(clientToLi)}
    </ul>
    </div>
</div>
`
  }
}
