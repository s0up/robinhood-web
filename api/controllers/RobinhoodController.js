const isLoggedIn = require('../policies/isLoggedIn');

module.exports = {
  async default(req, res){
    isLoggedIn(req, res);

    if(res.headerSent){
      return;
    }

    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      let params = req.allParams();
      delete params['action'];

      let result = await rh[req.param('action')].apply(rh.context, Object.values(params));

      return res.json({err: null, result: result});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  }
}
