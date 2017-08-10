<template>
<footer class='footer'>
  <div class='container'>
    <div class='row'>
      <div class="col-xs-6 text-center">
        Account Equity: <span v-money="portfolio.equity"></span>
      </div>
      <div class="col-xs-6 text-center">
        Market Close: <span v-from-now="marketClose"></span>
      </div>
    </div>
  </div>
</footer>
</template>
<script>
import state from '@/state';

export default {
  computed: {
    account(){
      return state.getters.currentAccount;
    },
    robinhoodUser(){
      return state.getters.robinhoodUser;
    },
    portfolio(){
      return state.getters.resource(this.account.portfolio);
    },
    nyse(){
      if(!this.markets){
        return;
      }

      return this.markets.find(market => {
        return market.acronym == 'NYSE';
      });
    },
    marketClose(){
      if(!this.nyse){
        return;
      }
      
      return this.nyse.todays_hours.closes_at;
    },
    markets(){
      return state.getters.markets;
    }
  }
}
</script>
<style>
html{  position: relative;
  min-height: 100%;}
body{margin-bottom: 80px;};

.footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: black;
  height: 80px;
  color: #9d9d9d;
  padding-top: 10px;
}
</style>
