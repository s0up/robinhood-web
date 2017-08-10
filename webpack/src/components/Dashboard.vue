<template>
<div class='dashboard text-center'>
  <h3 class="text-center">Welcome to Robinhood-Web</h3>
  <div v-if="dayLineGraphData" class="small">
    <line-chart :chart-data="dayLineGraphData" :options="chartOptions"></line-chart>
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
      chartOptions: null
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

      let range = data.reduce((range, item) => {
        if(range.min == 0){
          range.min = item.adjusted_open_equity;
        }

        if(range.max == 0){
          range.max = item.adjusted_open_equity;
        }

        range.min = (item.adjusted_open_equity < range.min) ? item.adjusted_open_equity : range.min;
        range.max = (item.adjusted_open_equity > range.max) ? item.adjusted_open_equity : range.max;

        equityData.push(parseFloat(item.adjusted_open_equity));
        equityLabelData.push(item.begins_at);

        return range;
      }, {min: 0, max: 0});

      this.chartOptions = {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              min: parseFloat(range.min),
              max: parseFloat(range.max)
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
