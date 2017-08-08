module.exports = {
  async getPositions(req, res){
    try{
      let resource = req.param('resource', null);

      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getPositions(resource)});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getRecentOrders(req, res){
    try{
      let resource = req.param('resource', null);

      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getRecentOrders(resource)});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getAccounts(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getAccounts()})
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getUser(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      let userData = await rh.getResource("https://api.robinhood.com/user/");

      if('additional_info' in userData){
        userData.additional_info = await rh.getResource(userData.additional_info);
      }

      return res.json({err: null, result: userData});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getACHRelationships(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getACHRelationships()})
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getQuote(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getQuote(req.param('symbol'))});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getResource(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getResource(req.param('resource'))});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async placeOrder(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.placeOrder(req.allParams())});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async cancelOrder(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.postResource(req.param('order'))});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getACHTransfers(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getACHTransfers()});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async getAutomaticACHTransfers(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.getAutomaticACHTransfers()});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async ACHTransfer(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.ACHTransfer(req.allParams())});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  },

  async automaticACHTransfer(req, res){
    try{
      let rh = new RobinHood(req.session.user.user_id);
      await rh.connect();

      return res.json({err: null, result: await rh.automaticACHTransfer(req.allParams())});
    }catch(e){
      return res.json({err: e.toString(), result: null});
    }
  }
}
