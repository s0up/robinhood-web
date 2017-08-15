<template>
<div class="dashboard container-fluid">
  <h1>Welcome to Robinhood-Web</h1>
  <hr>
  <h3>Entire Portfolio Value</h3>
  <ul class="nav nav-tabs nav-justified">
    <li role="presentation" v-bind:class="{'active': graphSpan == 'day'}" @click="graphSpan = 'day'; graphInterval = '5minute'"><a>Day</a></li>
    <li role="presentation" v-bind:class="{'active': graphSpan == 'week'}" @click="graphSpan = 'week'; graphInterval = '10minute'"><a>Week</a></li>
    <li role="presentation" v-bind:class="{'active': graphSpan == 'year'}" @click="graphSpan = 'year'; graphInterval = 'day'"><a>Year</a></li>
    <li role="presentation" v-bind:class="{'active': graphSpan == '5year'}" @click="graphSpan = '5year'; graphInterval = 'week'"><a>5 Year</a></li>
  </ul>
  <div class="small" v-if="graphData">
    <line-chart :chart-data="graphData" :options="chartOptions"></line-chart>
  </div>
  <hr>
  <h3>Account Stats</h3>
  <ul class="list-group">
    <li class="list-group-item">
      <span class="badge" v-money="portfolio.adjusted_equity_previous_close"></span> Previous Close Equity
    </li>
  </ul>
</div>
</template>
<script>
import state from '@/state';
import LineChart from '@/components/Graphs/LineChart';
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
  created() { //Requests historical data from Robinhood for the following attributes
    this.updateChartData();
  },
  data() { //Initializes ChartOptions as null
    return {
      chartOptions: null,
      updateTimer: setTimeout(function() {}, 0),
      graphInterval: '5minute',
      graphSpan: 'day'
    }
  },
  computed: {
    account() { // Gets accountID of current user
      return state.getters['robinhood/currentAccount'];
    },
    robinhoodUser() { // Gets current user's Username
      return state.getters['robinhood/robinhoodUser'];
    },
    portfolio() { //Gets current user's portfolio
      return state.getters['robinhood/resource'](this.account.portfolio);
    },
    graphView() {
      return {
        account_number: this.account.account_number,
        interval: this.graphInterval,
        span: this.graphSpan
      }
    },
    historicals() {
      return state.getters['robinhood/historical'](this.graphView);
    },
    graphData() {
      if (!this.historicals) {
        return;
      }

      return this.getLineGraphData(this.historicals);
    }
  },
  methods: {
    updateChartData() {
      clearTimeout(this.updateTimer);

      state.dispatch('robinhood/getHistoricals', this.graphView);

      this.updateTimer = setTimeout(() => this.updateChartData(), 10000);
    },

    getLineGraphData(data) {
      let lineGraphData = [];
      let priceData = [];
      let priceLabelData = [];

      let momentFormat = "LT";

      switch (data.span) {
        case 'week':
          momentFormat = "MMM Do";
          break;
        case 'month':
          momentFormat = "MMM Do";
          break;
        case 'year':
          momentFormat = "MMM Do";
          break;
        case '5year':
          momentFormat = "MMM YYYY";
          break;
        default:
          momentFormat = "LT";
          break;
      }

      data.equity_historicals.forEach(function(item) {
        priceData.push(parseFloat(item.adjusted_close_equity).toFixed(2));
        priceLabelData.push(moment(new Date(item.begins_at)).format(momentFormat));
      });

      //priceData.push(parseFloat(this.quote.last_trade_price).toFixed(2));
      //priceLabelData.push(moment().format(momentFormat));

      this.chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          labels: {
            fontColor: '#FFFFFF'
          }
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          yAxes: [{
            id: 'first-y-axis',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value ($)',
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
          }],
          xAxes: [{
            display: true,
            autoSkip: true,
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
        label: 'Portfolio Value',
        yAxisID: 'first-y-axis',
        fill: false,
        pointRadius: 0,
        borderColor: '#00CC99',
        lineTension: .05,
        data: priceData
      });


      return {
        labels: priceLabelData,
        datasets: lineGraphData
      }
    }
  },
  watch: {
    graphView() {
      this.updateChartData();
    }
  },
  components: {
    'line-chart': LineChart
  },
  beforeDestroy() {
    clearTimeout(this.updateTimer);
  }
}
</script>


<style>
.small {
  margin: 0px auto;
  background-color: #333333;
}
</style>
