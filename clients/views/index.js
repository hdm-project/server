const html = require('choo/html')
const cuid = require('cuid')
// const sf = require('sheetify')
// sf('css/game.css', {global: true})


module.exports = function (globalConfig) {
  return function (state, prev, send) {
    return html`
<div id="login">
  <div class="center">
    <div class="login_window">
      <div class="row">
          <h1>Welcome!</h1>
      </div>
      <p>To continue please enter the name of the group you would like to join</p>
      <div class="row">
          <input type="text" id="gid" name="gid" class="enter_id">
      </div>
      <button class="login_start" onclick=${start}>Start</button>
    </div>
  </div>
</div>
`
    function start(event) {
      var group = document.getElementById('gid').value
      if (group) {
        send('p2p:joinStar', group)
        send('location:set', '/connecting')
      }
    }

  }
}
