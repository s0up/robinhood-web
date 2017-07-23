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
            data.result.next = "https://api.robinhood.com/positions/?nonzero=true";
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

   getResource(url, cb){
      $.post('/api/getResource', {url: url}, function(data){
         data.result.url = url;
         state.commit('addResource', data.result);

         if(typeof cb === 'function')
            return cb(data);
      });
   }
}