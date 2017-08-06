/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
const fs = require('fs');

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  let localJS = `
    module.exports = {
      models: {
        connection: 'robinhoodMySQL'
      },

      connections: {
        robinhoodMySQL: {
          adapter: 'sails-mysql',
          host: 'localhost',
          user: 'root', //optional
          password: 'm1k3h4x', //optional
          database: 'robinhood' //optional
        }
      }
    };
  `;

  if(fs.existsSync(sails.config.appPath + '/config/local.js') === false){
    sails.log.debug("You should edit your /config/local.js file.  A mockup one has been generated for you!");
    fs.writeFileSync(sails.config.appPath + '/config/local.js', localJS);
  }

  cb();
};
