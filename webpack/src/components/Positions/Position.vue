<template>
   <tr v-if="instrument != null">
      <td>{{instrument.symbol}}</td>
      <td>{{instrument.simple_name}}</td>
      <td>{{position.quantity}}</td>
      <td>{{position.average_buy_price}}</td>
      <td>{{position.created_at}}</td>
   </tr>
</template>
<script>
import robinhood from '@/api/robinhood';

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
*/

export default {
   name: 'position',
   props: ['row'],
   data(){
      return {
         instrument: null,
         fundamentals: null
      }
   },
   created(){
      var self = this;

      robinhood.getResource(this.position.instrument, function(data){
         self.instrument = data.result;
      });
   },
   computed:{
      position: function(){
         return this.row;
      }
   },
   watch: {
      instrument: function(instrument){
         var self = this;

         //Get the fundamental data once the instrument data is present
         robinhood.getResource(instrument.fundamentals, function(data){
            self.fundamentals = data.result;
         });
      }
   }
}
</script>