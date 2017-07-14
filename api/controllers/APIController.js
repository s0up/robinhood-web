/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	default: function(req, res){
      return res.json({result: 'IT WORKS!'});
   }
};

