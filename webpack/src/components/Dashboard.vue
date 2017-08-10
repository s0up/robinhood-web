<template>
<div class='dashboard text-center'>
  <h3 class="text-center">Welcome to Robinhood-Web</h3>
  <div v-if="dayLineGraphData && dayChartOptions" class="small">
    <line-chart :chart-data="dayLineGraphData" :options="dayChartOptions"></line-chart>
  </div>
</div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';
import LineChart from '@/components/Test/StockChart/LineChart';

export default {
  created() {
    robinhood.getHistoricals({
      account_number: this.account.account_number,
      interval: '5minute',
      span: 'day'
    });
  },
  data() {
    return {
      dayChartOptions: null
    }
  },
  computed: {
    account() {
      return state.getters.currentAccount;
    },
    robinhoodUser() {
      return state.getters.robinhoodUser;
    },
    portfolio() {
      return state.getters.resource(this.account.portfolio);
    },

    dayHistoricals() {
      return state.getters.historical({
        interval: '5minute',
        span: 'day'
      });
    },

    dayLineGraphData() {
      if (!this.dayHistoricals) { //Dont try to build the line graph data before day historicals exists
        return null;
      }

      return this.getLineGraphData(this.dayHistoricals.equity_historicals);
    }
  },
  methods: {
    getLineGraphData(data) {
      let lineGraphData = [];

      let equityData = [];
      let equityLabelData = [];
      let min = 0;
      let max = 0;

      data.forEach(function(item) {
        if (min == 0) {
          min = item.adjusted_open_equity;
        }else if(item.adjusted_open_equity < min){
          min = item.adjusted_open_equity;
        }

        if (max == 0) {
          max = item.adjusted_open_equity;
        }else if(item.adjusted_open_equity > max){
          max = item.adjusted_open_equity;
        }

        equityData.push(parseFloat(item.adjusted_open_equity));
        equityLabelData.push(item.begins_at);
      });

      this.dayChartOptions = {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              min: parseFloat(min),
              max: parseFloat(max)
            }
          }]
        }
      }

      lineGraphData.push({
        label: 'Equity',
        backgroundColor: '#f00000',
        data: equityData
      });

      return {
        labels: equityLabelData,
        datasets: lineGraphData
      }
    }
  },
  watch: {

  },
  components: {
    'line-chart': LineChart
  }
}
</script>
