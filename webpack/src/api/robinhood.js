import state from '@/state';
import util from '@/api/util';

export default {
   async getPositions(resource){
      let self = this;

      try{
        let data = null;

        if(typeof resource === 'undefined' || resource === null){
          data = await util.post('/robinhood/getPositions');
        }else{
          data = await util.post('/robinhood/getPositions', {resource: resource});
        }

        state.commit('setNextPosition', data.result.next);
        state.commit('setPrevousPosition', data.result.previous);
        state.commit('setPositions', data.result.results);
      }catch(e){
        state.commit('setNextPosition', null);
        state.commit('setPrevousPosition', null);
        state.commit('setPositions', null);
      }
   },

   async getQuote(symbol, cb){
     try{
       let quote = await util.post('/robinhood/getQuote', {symbol: symbol});

       state.commit('addQuote', quote.result);
     }catch(e){
       console.log("Robinhood quote retrieval failure", e);
     }
   },

   async getResource(resource){
     try{
       let data = await util.post('/robinhood/getResource', {resource: resource});
       data.result.url = resource;
       state.commit('addResource', data.result);
     }catch(e){
       console.log("Robinhood resource retrieval failure", e);
     }
   },

   async getRecentOrders(resource){
     try{
       let orders = null;

       if(typeof resource === 'undefined' || resource === null){
         orders = await util.post('/robinhood/getRecentOrders');
       }else{
         orders = await util.post('/robinhood/getRecentOrders', {resource: resource});
       }

       state.commit('setNextOrder', orders.result.next);
       state.commit('setPreviousOrder', orders.result.previous);
       state.commit('setRecentOrders', orders.result.results);
     }catch(e){
       state.commit('setNextOrder', false);
       state.commit('setPreviousOrder', false);
       state.commit('setRecentOrders', null);
     }
   },

   async getAccounts(){
     try{
       let accounts = await util.post('/robinhood/getAccounts');

       state.commit('setAccounts', accounts.result.results);
     }catch(e){
       state.commit('setAccounts', []);
     }
   },

   async getNews(symbol){
     try{
       let newsResult = await util.post('/robinhood/getResource?resource=https://api.robinhood.com/midlands/news/' + symbol + '/');
       let news = newsResult.result;
       news.symbol = symbol;

       state.commit('addNews', news);
     }catch(e){
       console.log("Robinhood news retrieval failure", e);
     }
   }
}
