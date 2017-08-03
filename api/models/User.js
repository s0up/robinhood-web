/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'robinhood_user',
  autoUpdatedAt: false,
  autoCreatedAt: false,

  attributes: {
    user_id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    robinhood_username: {
      type: 'string',
      required: true
    },

    robinhood_password: {
      type: 'string',
      required: true
    },

    created_dt: {
      type: 'datetime'
    }
  },

  beforeCreate: function(attrs, cb){
    attrs.created_dt = new Date();

    return cb();
  }
};
