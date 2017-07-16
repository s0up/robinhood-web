/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const RobinHood = require('robinhood-api');
const uuid = require('uuid');

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

         delete opts[method];

         let result = await robinhood[method](opts);

         return res.json({err: null, result: result});
      }catch(e){
         sails.log.error(e);

         return res.json({err: e.toString(), result: null});
      }
   }
};

