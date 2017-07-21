/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const RobinHood = require('robinhood-api');
const uuid = require('uuid');
const _ = require('lodash');

const robinhoodObj = {};

module.exports = {
	default: async function(req, res){
      if('uuid' in req.session === false){
         req.session.uuid = uuid.v4();
      }

      if(req.session.uuid in robinhoodObj === false)
         robinhoodObj[req.session.uuid] = new RobinHood();

      let robinhood = robinhoodObj[req.session.uuid];

      try{
         let method = req.param('method');
         let opts = req.allParams();

         _.each(opts, function(val, key){
            if(val == 'true')
               opts[key] = true;

            if(val == 'false')
               opts[key] = false;
         });

         delete opts[method];

         let result = await robinhood[method](opts);

         return res.json({err: null, result: result});
      }catch(e){
         sails.log.error(e);

         return res.json({err: e.toString(), result: null});
      }
   },

   getResource: async function(req, res){
      if('uuid' in req.session === false){
         req.session.uuid = uuid.v4();
      }

      if(req.session.uuid in robinhoodObj === false)
         robinhoodObj[req.session.uuid] = new RobinHood();

      let robinhood = robinhoodObj[req.session.uuid];

      try{
         let result = await robinhood.getResource(req.param('url'));
         return res.json({err: null, result: result});
      }catch(e){
         return res.json({err: e.toString(), result: null});
      }
   },

   logout: function(req, res){
      if('uuid' in req.session)
         delete req.session.uuid;

      return res.ok();
   }
};

