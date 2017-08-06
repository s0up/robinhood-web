"use strict";

const RobinhoodAPI = require('robinhood-api');

module.exports = class{
  constructor(userId){
    this.userId = userId;
    this.api = new RobinhoodAPI();
  }

  async connect(){
    try{
      let userData = await User.findOne({user_id: this.userId});
      let skipLogin = false;

      if(typeof userData === 'undefined')
        throw new Error("Unable to locate this user");

      if(userData.robinhood_token !== null){
        this.api.token = userData.robinhood_token;
        skipLogin = true;
      }

      if(!skipLogin){
        let loginResult = await this.api.login({username: userData.robinhood_username, password: userData.robinhood_password});
        await User.update({user_id: this.userId}, {robinhood_token: loginResult.token});
      }

      return true;
    }catch(e){
      throw e;
    }
  }

  async getPositions(resource){
    try{
      let positionData = null;
      let self = this;

      if(typeof resource === 'undefined' || resource === null){
        positionData = await self.api.getPositions({nonzero: true});
      }else{
        positionData = await self.api.getResource(resource);
      }

      let promises = [];

      if(positionData.results.length > 0){
        for(let result of positionData.results){
          promises.push((async () => {
            result['instrument'] = await self.api.getResource(result['instrument']);

            if('quote' in result['instrument']){
              result['instrument']['quote'] = await self.api.getResource(result['instrument']['quote']);
            }

            return;
          })());
        }
      }

      await Promise.all(promises);

      return positionData;
    }catch(e){
      throw e;
    }
  }

  async getRecentOrders(resource){
    try{
      let orderData = null;
      let self = this;

      if(typeof resource === 'undefined' || resource === null){
        orderData = await self.api.getRecentOrders();
      }else{
        orderData = await self.api.getResource(resource);
      }

      let promises = [];

      if(orderData.results.length > 0){
        for(let result of orderData.results){
          promises.push((async () => {
            result['instrument'] =  await self.api.getResource(result['instrument']);

            return;
          })());
        }
      }

      await Promise.all(promises);

      return orderData;
    }catch(e){
      throw e;
    }
  }

  async getQuote(symbol){
    try{
      let quote = await this.api.getQuote({symbol: symbol});

      if('instrument' in quote){
        quote['instrument'] = await this.api.getResource(quote['instrument']);
      }

      if('market' in quote['instrument']){
        quote['instrument']['market'] = await this.api.getResource(quote['instrument']['market']);
      }

      return quote;
    }catch(e){
      throw e;
    }
  }

  async getQuotes(symbols){
    try{
      return await this.api.getQuotes({symbols: symbols});
    }catch(e){
      throw e;
    }
  }

  async getAccounts(){
    try{
      return await this.api.getAccounts();
    }catch(e){
      throw e;
    }
  }

  async getResource(resource){
    try{
      return await this.api.getResource(resource);
    }catch(e){
      throw e;
    }
  }
}
