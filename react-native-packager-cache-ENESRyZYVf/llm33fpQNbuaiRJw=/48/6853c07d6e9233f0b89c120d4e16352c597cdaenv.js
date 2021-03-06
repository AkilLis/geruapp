module.exports = {
  SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
  backend: {
    laravelLocal: false,
    laravelRemote: false,
    nodeLocal: true,
    nodeRemote: false
  },

  node: {
    local: {
      url: 'http://18.220.78.252:3000/',
      debug: true
    },
    remote: {
      url: 'http://18.220.78.252:3000/',
      debug: false
    }
  },

  LARAVEL: {
    local: {
      URL: 'http://192.168.0.123/',
      DEBUG: true
    },
    remote: {
      URL: 'https://geru.mn/',
      DEBUG: false
    }
  }
};