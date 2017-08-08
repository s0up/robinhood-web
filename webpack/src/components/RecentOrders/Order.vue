<template>
   <tr>
      <td><ticker-link :symbol="order.instrument.symbol"></ticker-link></td>
      <td v-bind:class="{'text-success': order.state == 'filled', 'text-danger': order.state == 'cancelled', 'text-info' : order.state == 'confirmed'}">{{order.state.toUpperCase()}}</td>
      <td>{{order.side.toUpperCase()}}</td>
      <td>{{order.type.toUpperCase()}}</td>
      <td v-round="0">{{order.quantity}}</td>
      <td v-money>{{(order.average_price) ? order.average_price : 'N/A'}}</td>
      <td>{{orderAge}}</td>
      <td>
        <a @click="cancel" v-if="order.state === 'queued'" class="text-danger">CANCEL</a>
        <span v-else>N.A.</span>
      </td>
   </tr>
</template>
<script>
/*Sample order data
account:"https://api.robinhood.com/accounts/5RX96505/"
average_price:"106.25000000"
cancel:null
created_at:"2016-12-21T22:54:20.302340Z"
cumulative_quantity:"14.00000"
executions:Array[1]
extended_hours:true
fees:"0.05"
id:"821ad684-5c10-44cb-a762-1c5da0735fa8"
instrument:"https://api.robinhood.com/instruments/809adc21-ef75-4c3d-9c0e-5f9a167f235b/"
last_transaction_at:"2017-01-06T14:59:51.837000Z"
override_day_trade_checks:false
override_dtbp_checks:false
position:"https://api.robinhood.com/positions/5RX96505/809adc21-ef75-4c3d-9c0e-5f9a167f235b/"
price:"106.25000000"
quantity:"14.00000"
ref_id:"692226eb-b09b-4d00-9877-55cd2f7989f3"
reject_reason:null
side:"sell"
state:"filled"
stop_price:null
time_in_force:"gtc"
trigger:"immediate"
type:"limit"
updated_at:"2017-01-06T14:59:51.880313Z"
url:"https://api.robinhood.com/orders/821ad684-5c10-44cb-a762-1c5da0735fa8/"
*/

import robinhood from '@/api/robinhood';
import state from '@/state';
import moment from 'moment';
import TickerLink from '@/components/Common/TickerLink';

export default {
   name: 'recent-order',
   props: ['row'],
   created(){

   },
   computed: {
      orderAge: function(){
         return moment(new Date(this.order.created_at)).fromNow().toString();
      },
      order: function(){
         return this.row;
      }
   },
   methods: {
     cancel(){
       var self = this;

       (async () => {
         try{
           await robinhood.cancelOrder(self.order.cancel);

           robinhood.getRecentOrders();
         }catch(e){
           console.log("Something went wrong canceling this order ", e);
         }
       })();
     }
   },
   components: {
     'ticker-link': TickerLink
   }
}
</script>
