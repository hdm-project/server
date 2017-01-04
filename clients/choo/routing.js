module.exports = function (globalConfig) {
  return [
    ['/', require('../views/index')(globalConfig)],
    ['/connecting', require('../views/connecting')(globalConfig)],
    ['/choseUsername', require('../views/choseUsername')(globalConfig)],
    ['/game', require('../views/game')(globalConfig)],
    ['/404', require('../views/error')(globalConfig)]
  ]
}
