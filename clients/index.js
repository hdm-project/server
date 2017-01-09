const choo = require('choo')
const app = choo()

var globalConfig = {
  hub: 'http://localhost:8042',
  storagePrefix: 'disrobia',
  connectivityStates: {
    none: 0,
    initialConnect: 1,
    recovering: 2,
    reconnecting: 3,
    connected: 4
  }
}

app.model(require('./choo/P2PConnection')(globalConfig))
app.model(require('./choo/general')(globalConfig))

// creates routing, default route = /404
app.router('/404', require('./choo/routing')(globalConfig))

const appTree = app.start({hash: true})

document.body.appendChild(appTree)
