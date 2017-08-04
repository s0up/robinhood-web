module.exports = {
  default: function(req, res){
    this[req.param('action')](req, res);
  },

  async login(req, res){
    try{
      let userInfo = await User.findOne({username: req.param('username'), password: req.param('password')});

      if(typeof userInfo === 'undefined')
        throw new Error("Invalid login credentials");

      req.session.user = userInfo;
      req.session.loggedIn = true;

      return res.json({err: null, result: userInfo});
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
