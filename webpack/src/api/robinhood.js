import state from '@/state';
import util from '@/api/util';

export default {
  async getPositions(resource) {
    let self = this;

    try {
      let data = null;

      if (typeof resource === 'undefined' || resource === null) {
        data = await util.post('/robinhood/getPositions');
      } else {
        data = await util.post('/robinhood/getPositions', {
          resource: resource
        });
      }

      state.commit('setNextPosition', data.result.next);
      state.commit('setPrevousPosition', data.result.previous);
      state.commit('setPositions', data.result.results);
    } catch (e) {
      state.commit('setNextPosition', null);
      state.commit('setPrevousPosition', null);
      state.commit('setPositions', null);
    }
  },

  async getQuote(symbol, throwError) {
    try {
      let quote = await util.post('/robinhood/getQuote', {
        symbol: symbol
      });

      state.commit('addQuote', quote.result);

      return;
    } catch (e) {
      if(throwError){
        throw e;
      }

      console.log("Robinhood quote retrieval failure", e);
    }
  },

  async getResource(resource) {
    try {
      let data = await util.post('/robinhood/getResource', {
        resource: resource
      });
      data.result.url = resource;
      state.commit('addResource', data.result);
    } catch (e) {
      console.log("Robinhood resource retrieval failure", e);
    }
  },

  async getRecentOrders(resource) {
    try {
      let orders = null;

      if (typeof resource === 'undefined' || resource === null) {
        orders = await util.post('/robinhood/getRecentOrders');
      } else {
        orders = await util.post('/robinhood/getRecentOrders', {
          resource: resource
        });
      }

      state.commit('setNextOrder', orders.result.next);
      state.commit('setPreviousOrder', orders.result.previous);
      state.commit('setRecentOrders', orders.result.results);
    } catch (e) {
      state.commit('setNextOrder', false);
      state.commit('setPreviousOrder', false);
      state.commit('setRecentOrders', null);
    }
  },

  async cancelOrder(order) {
    try {
      await util.post('/robinhood/cancelOrder', {order: order});

      return true;
    } catch (e) {
      return false;
    }
  },

  async getAccounts() {
    try {
      let accounts = await util.post('/robinhood/getAccounts');

      state.commit('setAccounts', accounts.result.results);
    } catch (e) {
      state.commit('setAccounts', []);
    }
  },

  async getUser(){
    try{
      let robinhoodUser = await util.post('/robinhood/getUser');

      state.commit('setRobinhoodUser', robinhoodUser.result);
    }catch(e){
      state.commit('setRobinhoodUser', {});
    }
  },

  async getNews(symbol) {
    try {
      let newsResult = await util.post('/robinhood/getResource?resource=https://api.robinhood.com/midlands/news/' + symbol + '/');
      let news = newsResult.result;
      news.symbol = symbol;

      state.commit('addNews', news);
    } catch (e) {
      console.log("Robinhood news retrieval failure", e);
    }
  },

  async placeOrder(context, order) {
    context.submitting = true;
    try {
      await util.post('/robinhood/placeOrder', order);

      context.submitting = false;
      context.order_complete = true;
    } catch (e) {
      context.order_error = e.toString();
      context.submitting = false;
    }
  },

  async getACHRelationships(){
    try{
      let relationships = await util.post('/robinhood/getACHRelationships');

      state.commit('setACHRelationships', relationships.result.results);

      return;
    }catch(e){
      console.log("Robinhood error retrieving ACH relationships");
    }
  },

  async ACHTransfer(transfer, throwError){
    try{
      await util.post('/robinhood/ACHTransfer', transfer);

      return;
    }catch(e){
      if(throwError){
        throw e;
      }
    }
  },

  async getACHTransfers(){
    try{
      let transfers = await util.post('/robinhood/getACHTransfers');

      state.commit('setACHTransfers', transfers.result.results);

      return;
    }catch(e){
      console.log("Robinhood error retrieving ACH transfers");
    }
  },

  async getAutomaticACHTransfers(){
    try{
      let transfers = await util.post('/robinhood/getAutomaticACHTransfers');

      state.commit('setAutomaticACHTransfers', transfers.result.results);

      return;
    }catch(e){
      console.log("Robinhood error retrieving automatic ACH transfers");
    }
  }
}
