import state from '@/state';
import util from '@/api/util';

export default {
  /*
  account_number - Required: true
  interval - Required: false (Valid Values: week,day,10minute,5minute)
  span - Required: false (Valid Values: day,week,year,5year,all)
  */
  async getHistoricals(opts, throwError) {
    try{
      let historicals = await util.post('/robinhood/getHistoricals', {
        opts: opts
      });

      state.commit('addHistorical', historicals.result);
    }catch(e){
      if(throwError){
        throw e;
      }
    }
  },

  async getPositions(resource, throwError) {
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

      data.result.instruments.forEach(function(instrument) {
        state.commit('addInstrument', instrument);
      });

      data.result.quotes.forEach(function(quote) {
        state.commit('addQuote', quote);
      });

      return;
    } catch (e) {
      state.commit('setNextPosition', null);
      state.commit('setPrevousPosition', null);
      state.commit('setPositions', null);

      if (throwError) {
        throw e;
      }
    }
  },

  async getQuote(symbol, throwError) {
    try {
      let quote = await util.post('/robinhood/getQuote', {
        symbol: symbol
      });

      quote.result.instruments.forEach(function(instrument) {
        state.commit('addInstrument', instrument);
      });

      state.commit('addQuote', quote.result);

      return;
    } catch (e) {
      if (throwError) {
        throw e;
      }

      console.log("Robinhood quote retrieval failure", e);
    }
  },

  async getResource(resource, throwError) {
    try {
      let data = await util.post('/robinhood/getResource', {
        resource: resource
      });
      data.result.url = resource;
      state.commit('addResource', data.result);

      return;
    } catch (e) {
      console.log("Robinhood resource retrieval failure", e);

      if (throwError) {
        throw e;
      }
    }
  },

  async getRecentOrders(resource, throwError) {
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

      orders.result.instruments.forEach(function(instrument) {
        state.commit('addInstrument', instrument);
      });

      return;
    } catch (e) {
      state.commit('setNextOrder', false);
      state.commit('setPreviousOrder', false);
      state.commit('setRecentOrders', null);

      if (throwError) {
        throw e;
      }
    }
  },

  async cancelOrder(order, throwError) {
    try {
      await util.post('/robinhood/postResource', {
        resource: order
      });

      return true;
    } catch (e) {
      if (throwError) {
        throw e;
      }

      return false;
    }
  },

  async getAccounts(throwError) {
    try {
      let accounts = await util.post('/robinhood/getAccounts');

      state.commit('setAccounts', accounts.result.results);

      return true;
    } catch (e) {
      state.commit('setAccounts', []);

      if (throwError) {
        throw e;
      }
    }
  },

  async getUser(throwError) {
    try {
      let robinhoodUser = await util.post('/robinhood/getUser');

      state.commit('setRobinhoodUser', robinhoodUser.result);

      return;
    } catch (e) {
      state.commit('setRobinhoodUser', {});

      if (throwError) {
        throw e;
      }
    }
  },

  async getNews(symbol, throwError) {
    try {
      let newsResult = await util.post('/robinhood/getResource?resource=https://api.robinhood.com/midlands/news/' + symbol + '/');
      let news = newsResult.result;
      news.symbol = symbol;

      state.commit('addNews', news);

      return;
    } catch (e) {
      console.log("Robinhood news retrieval failure", e);

      if (throwError) {
        throw e;
      }
    }
  },

  async placeOrder(order, throwError) {
    try {
      await util.post('/robinhood/placeOrder', {
        order: order
      });
    } catch (e) {
      if (throwError) {
        throw e;
      }
    }
  },

  async getACHRelationships(throwError) {
    try {
      let relationships = await util.post('/robinhood/getACHRelationships');

      state.commit('setACHRelationships', relationships.result.results);

      return;
    } catch (e) {
      console.log("Robinhood error retrieving ACH relationships");

      if (throwError) {
        throw e;
      }
    }
  },

  async ACHTransfer(transfer, throwError) {
    try {
      await util.post('/robinhood/ACHTransfer', {
        transfer: transfer
      });

      return;
    } catch (e) {
      if (throwError) {
        throw e;
      }
    }
  },

  async getACHTransfers(throwError) {
    try {
      let transfers = await util.post('/robinhood/getACHTransfers');

      state.commit('setACHTransfers', transfers.result.results);

      return;
    } catch (e) {
      console.log("Robinhood error retrieving ACH transfers");

      if (throwError) {
        throw e;
      }
    }
  },

  async getAutomaticACHTransfers(throwError) {
    try {
      let transfers = await util.post('/robinhood/getAutomaticACHTransfers');

      state.commit('setAutomaticACHTransfers', transfers.result.results);

      return;
    } catch (e) {
      console.log("Robinhood error retrieving automatic ACH transfers");

      if (throwError) {
        throw e;
      }
    }
  },

  async getMarkets(throwError) {
    try {
      let markets = await util.post('/robinhood/getMarkets');

      state.commit('setMarkets', markets.result.results);

      return;
    } catch (e) {
      if (throwError) {
        throw e;
      }
    }
  }
}
