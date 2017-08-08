<template>
<div class='dashboard text-center'>
  <h3 class="text-center">Welcome to Robinhood-Web</h3>
  <p class="text-danger">Dashboard stats are coming soon...</p>
</div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';

export default {
  created(){
    robinhood.getAccounts();
    robinhood.getUser();

    if(this.account){
      //If the account already exists on creation, lets get the portfolio
      robinhood.getResource(this.account.portfolio);
      robinhood.getResource('https://api.robinhood.com/accounts/' + this.account.account_number + '/recent_day_trades/');
    }
  },
  computed: {
    account(){
      return state.getters.currentAccount;
    },
    robinhoodUser(){
      return state.getters.robinhoodUser;
    },
    portfolio(){
      if(this.account){
        return state.getters.resource(this.account.portfolio);
      }else{
        return null;
      }
    },
    dayTrades(){
      if(this.account){
        return state.getters.resource('https://api.robinhood.com/accounts/' + this.account.account_number + '/recent_day_trades/').results;
      }else{
        return null;
      }
    }
  },
  watch: {
    account(){
      //If the account wasn't already present, grab portfolio.
      robinhood.getResource(this.account.portfolio);
      robinhood.getResource('https://api.robinhood.com/accounts/' + this.account.account_number + '/recent_day_trades/');
    }
  }
}
</script>
