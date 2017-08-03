/*SQL wrapper to work with async/await on non ORM'd queries*/

module.exports = {
   query: function(query, options){
      return new Promise(function(resolve, reject){
         User.query(query, options, function(err, result){
            if(err)
               return reject(err);

            return resolve(result);
         });
      });
   }
}
