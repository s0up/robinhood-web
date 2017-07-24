import state from '@/state';

export default {
   getPositions(resource){
      let self = this;

      if(typeof resource !== 'undefined'){
         self.getResource(resource, function(data){
            state.commit('setNextPosition', data.result.next);
            state.commit('setPrevousPosition', data.result.previous);
            state.commit('setPositions', data.result.results);
         });
      }else{
         $.post('/api/getPositions?nonzero=true', function(data){
            state.commit('setNextPosition', data.result.next);
            state.commit('setPrevousPosition', data.result.previous);
            state.commit('setPositions', data.result.results);
         });
      }
   },

   getQuote(symbol, cb){
      $.post('/api/getQuote', {symbol: symbol}, function(data){
         state.commit('addQuote', data.result);
      });
   },

   getRecentOrders(resource){
      if(typeof resource !== 'undefined'){
         self.getResource(resource, function(data){
            state.commit('setNextOrder', data.result.next);
            state.commit('setPreviousOrder', data.result.previous);
            state.commit('setRecentOrders', data.result.results);
         });
      }else{
         $.post('/api/getRecentOrders', function(data){
            state.commit('setNextOrder', data.result.next);
            state.commit('setPreviousOrder', data.result.previous);
            state.commit('setRecentOrders', data.result.results);
         });
      }
   },

   getResource(url, cb){
      let cachedResource = state.getters.resource(url);
      
      if(typeof cachedResource !== 'undefined'){
         if(typeof cb === 'function'){
            return cb(cachedResource);
         }
      }

      $.post('/api/getResource', {url: url}, function(data){
         data.result.url = url;
         state.commit('addResource', data.result);

         if(typeof cb === 'function')
            return cb(data);
      });
   }
}