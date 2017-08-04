<template>
   <tr>
      <td>{{position.instrument.symbol}}</td>
      <td>{{position.instrument.name}}</td>
      <td>{{parseFloat(position.quantity).toFixed(0)}}</td>
      <td>${{parseFloat(position.average_buy_price).toFixed(2)}} USD</td>
      <td>${{parseFloat(position.instrument.quote.ask_price).toFixed(2)}} USD</td>
      <td>${{parseFloat(position.instrument.quote.last_trade_price).toFixed(2)}} USD</td>
      <td>{{totalValue}}</td>
      <td v-bind:class="{'text-success': roi > 0, 'text-danger': roi < 0}">${{roi}}  USD</td>
      <td>{{heldFromNow}}</td>
   </tr>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';
import moment from 'moment';

export default {
   name: 'position',
   props: ['row'],
   computed:{
     totalValue: function(){
        if(this.loaded === false)
           return 0;

        return '$' + (this.position.quantity * this.position.instrument.quote.last_trade_price).toFixed(2) + ' USD';
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

        return ((this.position.instrument.quote.last_trade_price * this.position.quantity - (this.position.average_buy_price * this.position.quantity))).toFixed(2);
     }
   }
}
</script>
