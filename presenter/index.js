const choo = require('choo')
const app = choo()

var globalConfig = {
  hub: 'http://localhost:8042'
}

app.model(require('./choo/P2PConnection')(globalConfig))

// creates routing, default route = /404
app.router('/404', require('./choo/routing')(globalConfig))

const appTree = app.start({hash: true})

document.body.appendChild(appTree)
