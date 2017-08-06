<template>
   <tr>
      <td><ticker-link :symbol="position.instrument.symbol"></ticker-link></td>
      <td>{{position.instrument.name}}</td>
      <td v-round="0">{{(position.quantity)}}</td>
      <td v-money>{{position.average_buy_price}}</td>
      <td v-money>{{position.instrument.quote.ask_price}}</td>
      <td v-money>{{position.instrument.quote.last_trade_price}}</td>
      <td v-money>{{totalValue}}</td>
      <td v-money v-bind:class="{'text-success': roi > 0, 'text-danger': roi < 0}">{{roi}}</td>
      <td>{{heldFromNow}}</td>
   </tr>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';
import moment from 'moment';
import util from '@/util/util';
import TickerLink from '@/components/Common/TickerLink';

export default {
   name: 'position',
   props: ['row'],
   computed:{
     totalValue: function(){
        return (this.position.quantity * this.position.instrument.quote.last_trade_price);
     },
     heldFromNow: function(){
        return moment(new Date(this.position.updated_at)).fromNow().toString();
     } ,
     position: function(){
        return this.row;
     },
     roi: function(){
        if(this.loaded === false)
           return 0;

        return ((this.position.instrument.quote.last_trade_price * this.position.quantity - (this.position.average_buy_price * this.position.quantity)));
     }
   },
   components: {
     'ticker-link': TickerLink
   }
}
</script>
