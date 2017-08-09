module.exports = function(req, res, next){
   if('session' in req === false || typeof req.session.user === 'undefined')
      return res.forbidden();

   (async () => {
      try{
         let user = await User.findOne({user_id: req.session.user.user_id});

         if(typeof user === 'undefined'){
            delete req.session.user;

            return res.forbidden();
         }

         if(typeof next === 'function'){
           return next();
         }

         return;
      }catch(e){
         return res.forbidden();
      }
   })();
}
