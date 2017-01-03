const html = require('choo/html')
const cuid = require('cuid')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})


module.exports = function (globalConfig) {
  return function (state, prev, send) {
    return html`
<div>
    <div class="row">
        <h1>Welcome!</h1>
    </div>
    <div class="row">
        <div class="row">
            To continue please enter a rather unique name for your group or create one
        </div>
        <div class="row">
            <input type="text" id="gid" name="gid">
            <button onclick=${generateRandom}>Generate Name</button>
        </div>
        <button onclick=${start}>Start</button>
    </div>
</div>
`
    function start(event) {
      var group = document.getElementById('gid').value
      if (group) {
        send('p2p:createStar', group)
        send('location:set', '/dashboard')
      }
    }

    function generateRandom(event) {
      var group = cuid()
      //extract client fingerprint
      group = group.slice(13, 17)
      document.getElementById('gid').value = group
    }

  }
}
