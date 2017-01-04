module.exports = globalConfig => ({
  namespace: null,
  effects: require('./effects')(globalConfig),
  reducers: require('./reducers')(globalConfig),
  state: {
    clientIds: [],
    clientNames: {},
    clientPeers: {}
  }
})
