<template>
  <div v-if="loaded" class='stock-view'>
    <div class="row">
    <div class="col-md-9">
      <h3>{{quote.instrument.name}}</h3>
    </div>
    <div class="col-md-3">
      <div class="pull-right">
        <button v-if="currentPosition" v-on:click="isBuying = !isBuying" class="btn btn-success">Buy More</button>
        <button v-if="currentPosition" class="btn btn-warning">Sell</button>
        <button v-if="!currentPosition" v-on:click="isBuying = !isBuying" class="btn btn-success">Buy</button>
        <button class="btn btn-primary">Watch</button>
      </div>
    </div>
  </div>
    <div class="clear"></div>

    <transition name="fade">
    <div v-if="isBuying">
      <hr>
      <form>
        <div class="form-group">
          <label for="buyType">Buy Type</label>
          <select class="form-control" id="buyType">
            <option>Market Price</option>
            <option>Limit Buy</option>
          </select>
        </div>
        <div class="form-group">
          <label for="buyTimeInForce">Buy Type</label>
          <select class="form-control" id="buyTimeInForce">
            <option>Good til close</option>
            <option>Good til canceled</option>
          </select>
        </div>
      </form>
      <hr>
    </div>
    </transition>

    <div id="tv-medium-widget">Loading....</div>
    <div v-if="currentPosition" class="table-responsive">
      <h3>Current Position</h3>
      <position-table>
        <position slot="position-table-body" :row="currentPosition"></position>
      </position-table>
    </div>
    <div v-if="hasNews" class="table-responsive">
      <h3>Recent news for {{quote.instrument.name}}</h3>
      <table class="table table-hover table-condensed">
        <thead>
        </thead>
        <tbody>
          <tr v-for="item in news.results">
            <td><a v-bind:href="item.url" target="_blank">{{item.title}}</a></td>
            <td v-from-now>{{item.published_at}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Position from '@/components/Positions/Position';
import PositionTable from '@/components/Positions/PositionTable';
import robinhood from '@/api/robinhood';
import state from '@/state';
import '@/assets/js/tv.js'; //TradingView

export default {
  created(){
    robinhood.getQuote(this.symbol);
    robinhood.getNews(this.symbol);
    robinhood.getPositions();
  },
  data(){
    return {
      loaded: false,
      hasNews: true,
      isBuying: false
    }
  },
  computed: {
    symbol(){
      return this.$route.params.symbol;
    },
    quote(){
      return state.getters.quote(this.symbol);
    },
    news(){
      return state.getters.news(this.symbol);
    },
    positions(){
      return state.getters.positions;
    },
    currentPosition(){
      return this.positions.find(position => {return position.instrument.symbol == this.symbol});
    }
  },

  watch: {
    quote(){
      this.loaded = true;
    },
    news(newsItem){
      if('results' in newsItem && newsItem.results.length > 0){
        this.hasNews = true;
      }else{
        this.hasNews = false;
      }
    }
  },

  updated(){
    var self = this;

    $(document).ready(function(){
      if($("#tv-medium-widget").is(":visible")){
        new TradingView.MediumWidget({
          "container_id": "tv-medium-widget",
          "symbols": [
            self.quote.instrument.symbol
          ],
          "gridLineColor": "#e9e9ea",
          "fontColor": "#83888D",
          "underLineColor": "#dbeffb",
          "trendLineColor": "#4bafe9",
          "width": "100%",
          "height": 400,
          "locale": "en"
        });
      }
    });
  },

  components: {
    'position': Position,
    'position-table': PositionTable
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
