<template>
   <div class='row'>
      <div class='col-md-12'>
         <h3>Currently Held Positions</h3>
      </div>
      <div class='col-md-12'>
        <div class="table-responsive">
          <position-table>
            <position slot="position-table-body" v-for="(position, index) in positions" :key="index" :row="position"></position>
          </position-table>
        </div>
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

import Position from '@/components/Positions/Position';
import PositionTable from '@/components/Positions/PositionTable';

export default {
   name: 'positions',
   created(){
     state.dispatch('robinhood/getPositions');
   },
   data(){
     return {
       positionTimer: setTimeout(function(){}, 0)
     }
   },
   computed: {
      positions: function(){
         return state.getters['robinhood/positions'];
      },
      nextPosition: function(){
         return state.getters['robinhood/nextPosition'];
      },
      previousPosition: function(){
         return state.getters['robinhood/previousPosition'];
      }
   },
   beforeDestroy(){
     clearTimeout(this.positionTimer);
   },
   methods: {
      getPositions(){
        state.dispatch('robinhood/getPositions');
        this.positionTimer = setTimeout(this.getPositions, 10000);
      },
      nextPage: function(){
         state.dispatch('robinhood/getPositions', self.nextPosition);
      },
      previousPage: function(){
         state.dispatch('robinhood/getPositions', self.previousPosition);
      }
   },
   components: {
      'position' : Position,
      'position-table': PositionTable
   }
}
</script>
