<template>
  <div v-if="loaded" class='stock-view'>
    <h3>Viewing Financials For {{quote.instrument.name}}</h3>
    <p>This should probably have a lot more information displayed, with a graph, and purchase options</p>
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
import robinhood from '@/api/robinhood';
import state from '@/state';

export default {
  created(){
    robinhood.getQuote(this.symbol);
    robinhood.getNews(this.symbol);
  },
  data(){
    return {
      loaded: false,
      hasNews: true
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
    }
  },

  watch: {
    quote(){
      this.loaded = true;
    },
    news(newsItem){
      if('results' in newsItem && newsItem.results.length > 0){
        this.hasNews = true;
        this.$forceUpdate();
      }else{
        this.hasNews = false;
      }
    }
  }
}
</script>
