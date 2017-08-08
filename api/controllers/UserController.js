const RobinhoodAPI = require('robinhood-api');

module.exports = {
  default: function(req, res){
    this[req.param('action')](req, res);
  },

  async login(req, res){
    try{
      var rh = new RobinhoodAPI();

      let loginResult = await rh.login({username: req.param('username'), password: req.param('password')});
      let existingUser = await User.findOne({robinhood_username: req.param('robinhood_username')});

      if(typeof existingUser === 'undefined'){
        existingUser = await User.create({robinhood_username: req.param('username'), robinhood_password: req.param('password')});
      }

      await User.update({user_id: existingUser.user_id}, {robinhood_token: loginResult.token});

      req.session.user = existingUser;
      req.session.loggedIn = true;

      return res.json({err: null, result: existingUser});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async logout(req, res){
    delete req.session.user;

    return res.json({err: null, result: 'SUCCESS'});
  },

  async checkLoginState(req, res){
    try{
      if('user' in req.session){
        let userInfo = await User.findOne({user_id: req.session.user.user_id});

        return res.json({err: null, result: true, userData: userInfo});
      }else{
        throw new Error("User is not logged in");
      }
    }catch(e){
      return res.json({err: null, result: false});
    }
  },

  async test(req, res){
    return res.json({err: null, result: 'TEST_SUCCESS'});
  }
}
