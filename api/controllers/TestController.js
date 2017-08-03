/**
 * TestController
 *
 * @description :: Server-side logic for managing Tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getUsers: async function(req, res){
		try{
			let users = await SQL.query("SELECT * FROM robinhood_user");

			return res.json({err: null, result: users});
		}catch(e){
			return res.json({err: e.toString(), result: null});
		}
	},

	getUserById: async function(req, res){
		try{
			let user = await User.findOne({
				user_id: req.param('userId')
			});

			if(typeof user === 'undefined'){
				return res.json({err: 'USER_NOT_FOUND', result: null});
			}

			return res.json({err: null, result: user});
		}catch(e){
			return res.json({err: e.toString(), result: null});
		}
	}
};
