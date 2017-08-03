module.exports = {
  models: {
    connection: 'robinhoodMySQL'
  },

  connections: {
    robinhoodMySQL: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root', //optional
      password: '1337', //optional
      database: 'robinhood' //optional
    }
  }
};
