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
        <h1>Welcome!</h1>
    </div>
    <div class="row">
        Game Thingies
    </div>
</div>
`
  }
}
