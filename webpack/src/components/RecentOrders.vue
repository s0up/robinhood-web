<template>
   <div class='row'>
      <div class='col-md-12'>
         <h3>Recent Orders</h3>
      </div>
      <div class='col-md-12'>
         <table class='recent-orders table table-hover'>
            <thead>
               <tr>
                  <th>Stock</th>
                  <th>State</th>
                  <th>Order Side</th>
                  <th>Order Type</th>
                  <th>Quantity</th>
                  <th>Average Price</th>
                  <th>Order Age</th>
               </tr>
            </thead>
            <tbody v-if="orders.length > 0">
               <recent-order v-for="(order, index) in orders" :row="order" :key="index"></recent-order>
            </tbody>
         </table>
         <nav aria-label="Page navigation example">
           <ul class="pagination">
             <li v-if="previousOrder != null" @click="previousPage" class="page-item"><a class="page-link">Previous</a></li>
             <li v-if="nextOrder != null" @click="nextPage" class="page-item"><a class="page-link">Next</a></li>
           </ul>
         </nav>
      </div>
   </div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';
import Order from '@/components/RecentOrders/Order';

export default {
   name: 'recent-orders',
   created(){
      robinhood.getRecentOrders();
   },
   methods: {
      nextPage: function(){
         robinhood.getRecentOrders(self.nextOrder);
      },
      previousPage: function(){
         robinhood.getRecentOrders(self.previousOrder);
      }
   },
   computed: {
      previousOrder: function(){
         return state.getters.previousOrder;
      },
      nextOrder: function(){
         return state.getters.nextOrder;
      },
      orders: function(){
         return state.getters.recentOrders;
      }
   },
   components: {
      'recent-order': Order
   }
}
</script>