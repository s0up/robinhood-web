<template>
<div class="dashboard">
  <h3 class="text-center">Welcome to Robinhood-Web</h3>
  <div class="small" v-if="dayLineGraphData">
    <line-chart :chart-data="dayLineGraphData" :options="chartOptions"></line-chart>
  </div>
</div>
</template>
<script>
import state from '@/state';
import LineChart from '@/components/Test/StockChart/LineChart';
import moment from 'moment';

/*
# get_history :AAPL, "5minute", {span: "day"}
# get_history :AAPL, "10minute", {span: "week"}
# get_history :AAPL, "day", {span: "year"}
# get_history :AAPL, "week", {span: "5year"}
5minute / span day
10minute / span week
day / span year
week / span 5year
*/

export default {
  created() {   //Requests historical data from Robinhood for the following attributes
    this.updateChartData();
  },
  data() {  //Initializes ChartOptions as null
    return {
      chartOptions: null,
      updateTimer: setTimeout(function(){}, 0)
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

    dayGains(){
      if(!this.dayHistoricals){
        return;
      }

      return {
        first_item: this._.clone(this.dayHistoricals.equity_historicals).shift(),
        last_item: this._.clone(this.dayHistoricals.equity_historicals).pop(),
      }
    },

    dayHistoricals() { //Gets the historical data
      return state.getters.historical({
        interval: '5minute',
        span: 'day'
      });
    },

    weekHistoricals() { //Gets the historical data
      return state.getters.historical({
        interval: '10minute',
        span: 'week'
      });
    },

    yearHistoricals(){
      return state.getters.historical({
        interval: 'day',
        span: 'year'
      });
    },

    fiveYearHistoricals(){
      return state.getters.historical({
        interval: 'week',
        span: '5year'
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
    updateChartData(){
      this.updateTimer = setTimeout(() => {
        console.log("Updating chart data...");

        robinhood.getHistoricals({
          account_number: this.account.account_number,
          interval: '5minute',
          span: 'day'
        });

        /*

        robinhood.getHistoricals({
          account_number: this.account.account_number,
          interval: '10minute',
          span: 'week'
        });

        robinhood.getHistoricals({
          account_number: this.account.account_number,
          interval: 'day',
          span: 'year'
        });

        robinhood.getHistoricals({
          account_number: this.account.account_number,
          interval: 'week',
          span: '5year'
        });*/

        this.updateChartData();
      }, 5000);
    },
    getLineGraphData(data) {
      let lineGraphData = [];
      let equityData = [];
      let netWorthData = [];
      let equityLabelData = [];

      data.forEach(function(item){
        equityData.push(parseFloat(item.adjusted_open_equity));
        equityLabelData.push(moment(item.begins_at).format("LT"));
        netWorthData.push(parseFloat(item.net_return));
      });

      this.chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          labels: {
            fontColor: '#FFFFFF'
          }
        },
        scales: {

          yAxes: [{
            id: 'first-y-axis',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Equity ($)',
              fontColor: "#FFFFFF",
            },
            gridLines: {
              color: "#FFFFFF",
              lineWidth: 2,
            },
            ticks: {
              beginAtZero: false,
              fontColor: '#FFFFFF',
            }
          },
            {
              id: 'second-y-axis',
              position: 'right',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Net Worth ($)',
                fontColor: "#FFFFFF",
              },
              gridLines: {
                color: "#FFFFFF",
                lineWidth: 2,
                display: false,
              },
              ticks: {
                beginAtZero: false,
                fontColor: '#FFFFFF',
              }

            }],
          xAxes: [{
            display: true,
            gridLines: {
              color: "#FFFFFF",
              lineWidth: 2,
            },
            ticks: {
              fontColor: '#FFFFFF'
            }
          }]
        }
      }

      lineGraphData.push({
        label: 'Equity',
        yAxisID: 'first-y-axis',
        fill: false,
        pointRadius: 0,
        borderColor: '#00CC99',
        lineTension: .05,
        data: equityData
      },
        {
          label: 'NetWorth',
          yAxisID: 'second-y-axis',
          fill: false,
          pointRadius: 0,
          borderColor: '#339999',
          lineTension: .05,
          data: netWorthData
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
  },
  beforeDestroy(){
    clearTimeout(this.updateTimer);
  }
}
</script>


<style>
  .small {
    margin:  0px auto;
    background-color: #333333;
     }
</style>
