<template>
  <div v-if="loaded" class='stock-view'>
    <h3>Viewing {{quote.instrument.name}}</h3>
    <p>This should probably have a lot more information displayed, with a graph, and purchase options</p>
  </div>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';

export default {
  created(){
    robinhood.getQuote(this.symbol);
  },
  data(){
    return {
      loaded: false
    }
  },
  computed: {
    symbol(){
      return this.$route.params.symbol;
    },
    quote(){
      return state.getters.quote(this.symbol);
    }
  },

  watch: {
    quote(){
      this.loaded = true;
    }
  }
}
</script>
