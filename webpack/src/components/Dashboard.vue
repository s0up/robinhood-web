<template>
<div class="dashboard">
  <h3 class="text-center">Welcome to Robinhood-Web</h3>
  <div class="small" v-if="dayLineGraphData">
    <line-chart :chart-data="dayLineGraphData" :options="chartOptions"></line-chart>
  </div>
</div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';
import LineChart from '@/components/Test/StockChart/LineChart';

export default {
  created() {   //Requests historical data from Robinhood for the following attributes
    robinhood.getHistoricals({
      account_number: this.account.account_number,
      interval: '5minute',
      span: 'day'
    });
  },
  data() {  //Initializes ChartOptions as null
    return {
      chartOptions: null
    }
  },
  computed: {
    account() {  // Gets accountID of current user
      return state.getters.currentAccount;
    },
    robinhoodUser() {  // Gets current user's Username
      return state.getters.robinhoodUser;
    },
    portfolio() { //Gets current user's portfolio
      return state.getters.resource(this.account.portfolio);
    },

    dayHistoricals() { //Gets the historical data
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
              min: parseInt(Math.floor(range.min)),
              //max: parseFloat(range.max),
              fontColor: '#FFFFFF',
              axesColor: '#FFFFFF'
            }
          }],
          xAxes: [{
            display: true,
            ticks: {
              fontColor: '#FFFFFF'
            }
          }]
        }
      }

      lineGraphData.push({
        label: 'Equity',
        fill: false,
        pointRadius: 0,
        borderColor: '#00CC99',
        lineTension: .05,
        //backgroundColor: '#f00000',
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


<style>
  .small {
       max-width: 1000px;
       margin:  0px auto;
       background-color: #333333;
     }
</style>
