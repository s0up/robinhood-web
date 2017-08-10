<template>
<div class='dashboard text-center'>
  <h3 class="text-center">Welcome to Robinhood-Web</h3>
  <p class="text-danger">Dashboard stats are coming soon...</p>
</div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';

export default {
  created(){
    robinhood.getHistoricals({
      account_number: this.account.account_number,
      interval: '5minute',
      span: 'day'
    });
  },
  computed: {
    account(){
      return state.getters.currentAccount;
    },
    robinhoodUser(){
      return state.getters.robinhoodUser;
    },
    portfolio(){
      return state.getters.resource(this.account.portfolio);
    },

    dayHistoricals(){
      return state.getters.historical({interval: '5minute', span: 'day'});
    },

    dayLineGraphData(){
      if(!this.dayHistoricals){ //Dont try to build the line graph data before day historicals exists
        return null;
      }

      return this.getLineGraphData(this.dayHistoricals.equity_historicals);
    }
  },
  methods: {
    getLineGraphData(data){
      let lineGraphData = [];

      data.forEach(function(item){
        lineGraphData.push({
          time: item.begins_at,
          net: item.net_return
        });
      });

      return lineGraphData;
    }
  },
  watch: {

  }
}
</script>
