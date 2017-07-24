<template>
   <tr v-if="loaded">
      <td>{{instrument.symbol}}</td>
      <td>{{instrument.name}}</td>
      <td>{{parseFloat(position.quantity).toFixed(0)}}</td>
      <td>${{parseFloat(position.average_buy_price).toFixed(2)}} USD</td>
      <td>${{parseFloat(quote.ask_price).toFixed(2)}} USD</td>
      <td>${{parseFloat(quote.last_trade_price).toFixed(2)}} USD</td>
      <td>{{totalValue}}</td>
      <td v-bind:class="{'text-success': roi > 0, 'text-danger': roi < 0}">${{roi}}  USD</td>
      <td>{{createdFromNow}}</td>
   </tr>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';

/*Example data
Instrument Response: 
"result": {
 "min_tick_size": null,
 "type": "stock",
 "splits": "https://api.robinhood.com/instruments/e4a542ca-0e11-454a-9b23-08823027fbb5/splits/",
 "margin_initial_ratio": "0.5000",
 "url": "https://api.robinhood.com/instruments/e4a542ca-0e11-454a-9b23-08823027fbb5/",
 "quote": "https://api.robinhood.com/quotes/HRL/",
 "symbol": "HRL",
 "bloomberg_unique": "EQ0010075300001000",
 "list_date": "1994-01-03",
 "name": "Hormel Foods",
 "fundamentals": "https://api.robinhood.com/fundamentals/HRL/",
 "state": "active",
 "country": "US",
 "day_trade_ratio": "0.2500",
 "tradeable": true,
 "maintenance_ratio": "0.2500",
 "id": "e4a542ca-0e11-454a-9b23-08823027fbb5",
 "market": "https://api.robinhood.com/markets/XNYS/",
 "simple_name": "Hormel"
}

Quote Response: 
ask_price
ask_size
bid_price
bid_size
has_traded
instrument
last_extended_hours_trade_price
last_trade_price
last_trade_price_source
previous_close
previous_close_date
symbol
trading_halted
updated_at
*/
import moment from 'moment';

export default {
   name: 'position',
   props: ['row'],
   created(){
      if(!this.loaded)
         robinhood.getResource(this.position.instrument);
   },
   computed:{
      totalValue: function(){
         if(this.loaded === false)
            return 0;

         return '$' + (this.position.quantity * this.quote.last_trade_price).toFixed(2) + ' USD';
      },
      createdFromNow: function(){
         return moment(new Date(this.position.created_at)).fromNow().toString();
      } ,
      position: function(){
         return this.row;
      },
      loaded: function(){
         return (this.quote != null && this.instrument != null) ? true : false;
      },
      quote: function(){
         if(typeof this.instrument == 'undefined')
            return null;

         return state.getters.quote(this.instrument.symbol);
      },
      instrument: function(){
         return state.getters.resource(this.position.instrument);
      },
      roi: function(){
         if(this.loaded === false)
            return 0;

         return ((this.quote.last_trade_price * this.position.quantity - (this.position.average_buy_price * this.position.quantity))).toFixed(2);
      }
   },
   watch: {
      instrument: function(hasInstrument){
         robinhood.getQuote(this.instrument.symbol);
      }
   }
}
</script>