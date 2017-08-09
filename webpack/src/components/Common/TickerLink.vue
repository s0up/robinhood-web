<template>
  <div class='ticker-link'>
    <router-link v-if="!basic" v-bind:class='textClass' :to="{name: 'stock-view', params: {symbol: symbol}}"><strong>{{symbolText}}</strong></router-link>
    <router-link v-else :to="{name: 'stock-view', params: {symbol: symbol}}"><strong>{{symbol}}</strong></router-link>
  </div>
</template>
<script>
import state from '@/state';
import robinhood from '@/api/robinhood';

export default {
  props: ['symbol', 'basic'],
  name: 'ticker-link',
  created(){
    if(this.basic){
      return;
    }

    if(!state.getters.quote(this.symbol)){
      robinhood.getQuote(this.symbol);
    }
  },
  computed: {
    quote(){
      return state.getters.quote(this.symbol);
    },
    symbolText(){
      if(!this.quote){
        return this.symbol;
      }

      return this.symbol + " (" + this.dayGains + "%)";
    },
    dayGains(){
      if(!this.quote){
        return 0;
      }

      return (((parseFloat(this.quote.last_trade_price) / parseFloat(this.quote.adjusted_previous_close)) * 100) - 100).toFixed(2);
    },
    textClass(){
      if(this.dayGains == 0){
        return '';
      }

      return (this.dayGains > 0) ? 'text-success' : 'text-danger';
    }
  }
}
</script>
