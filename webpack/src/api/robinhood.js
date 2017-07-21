import state from '@/state';

export default {
   getPositions(){
      $.post('/api/getPositions?nonzero=true', function(data){
         state.commit('setNextPosition', data.result.next);
         state.commit('setPrevousPosition', data.result.previous);
         state.commit('setPositions', data.result.results);
      });
   },

   getResource(url, cb){
      $.post('/api/getResource', {url: url}, function(data){
         return cb(data);
      });
   }
}