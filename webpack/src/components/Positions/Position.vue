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

export default {
   name: 'position',
   props: ['row'],
   data(){
      return {
         instrument: null
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
   }
}
</script>