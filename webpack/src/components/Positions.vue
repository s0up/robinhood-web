<template>
   <div class='row'>
      <div class='col-md-12'>
         <h3>Currently Held Positions</h3>
      </div>
      <div class='col-md-12'>
         <table class='positions table table-hover'>
            <thead>
               <th>Stock</th>
               <th>Company</th>
               <th>Num Shares</th>
               <th>Avg Buy Price</th>
               <th>Ask Price</th>
               <th>Last Trade Price</th>
               <th>Current Total Value</th>
               <th>ROI</th>
               <th>Held Since</th>
            </thead>
            <tbody v-if="positions.length > 0">
               <position v-for="(position, index) in positions" :key="index" :row="position"></position>
            </tbody>
         </table>
         <nav aria-label="Page navigation example">
           <ul class="pagination">
             <li v-if="previousPosition != null" @click="previousPage" class="page-item"><a class="page-link">Previous</a></li>
             <li v-if="nextPosition != null" @click="nextPage" class="page-item"><a class="page-link">Next</a></li>
           </ul>
         </nav>
      </div>
   </div>
</template>
<script>
import state from '@/state';
import robinhood from '@/api/robinhood';
import Position from '@/components/Positions/Position';

/* Example data
"shares_held_for_stock_grants": "0.0000",
"account": "https://api.robinhood.com/accounts/5RX96505/",
"intraday_quantity": "0.0000",
"intraday_average_buy_price": "0.0000",
"url": "https://api.robinhood.com/positions/5RX96505/fd0c2695-e591-4c28-bdf7-068895ae3b14/",
"created_at": "2016-11-01T05:55:11.041226Z",
"updated_at": "2016-11-01T13:30:10.979996Z",
"shares_held_for_buys": "0.0000",
"average_buy_price": "115.5700",
"instrument": "https://api.robinhood.com/instruments/fd0c2695-e591-4c28-bdf7-068895ae3b14/",
"shares_held_for_sells": "0.0000",
"quantity": "2.0000"
*/

export default {
   name: 'positions',
   created(){
      robinhood.getPositions();
   },
   computed: {
      positions: function(){
         return state.getters.positions;
      },
      nextPosition: function(){
         return state.getters.nextPosition;
      },
      previousPosition: function(){
         return state.getters.previousPosition;
      }
   },
   methods: {
      nextPage: function(){
         robinhood.getPositions(self.nextPosition);
      },
      previousPage: function(){
         robinhood.getPositions(self.previousPosition);
      }
   },
   components: {
      'position' : Position
   }
}
</script>