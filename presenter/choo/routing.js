module.exports = function (globalConfig) {
  return [
    ['/', require('../views/index')(globalConfig)],
    ['/404', require('../views/error')(globalConfig)],
    ['/dashboard', require('../views/dashboard')(globalConfig)]
  ]
}
