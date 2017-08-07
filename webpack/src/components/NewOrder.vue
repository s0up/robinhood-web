<template>
<transition name="fade">
  <div class='new-order'>
    <button @click="$emit('cancelOrder')" type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
    <hr>
    <div class="form-group">
      <label for="buyType">Buy Type</label>
      <select v-model="type" class="form-control" id="buyType">
          <option value='market'>Market Order</option>
          <option value='limit'>Limit Order</option>
        </select>
    </div>
    <div class="form-group">
      <label for="buyTimeInForce">Time in Force</label>
      <select v-model="time_in_force" class="form-control" id="buyTimeInForce">
          <option value='gfd'>Good for Day</option>
          <option value='gtc'>Good til canceled</option>
          <option value='ioc'>Immediate or cancel</option>
          <option value='fok'>Fill or Kill</option>
          <option value='opg'>Limit-On-Open order</option>
        </select>
    </div>
    <div class="form-group">
      <div class="alert alert-info alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <span v-if="time_in_force == 'gfd'">
          A day order or good for day order (GFD) (the most common) is a market or limit order that is in force from the time the order is submitted to the end of the day's trading session. For stock markets, the closing time is defined by the exchange.
        </span>
        <span v-if="time_in_force == 'gtc'">
          A good 'til canceled (GTC) order can be placed by an investor to buy or sell a security at a specified price that remains active until it is either rescinded by the investor or the trade is executed. GTC orders offer an alternative to placing a sequence of day orders, which expire at the end of each trading day.
        </span>
        <span v-if="time_in_force == 'ioc'">
          An immediate or cancel (IOC) order, also known as an "accept order", is a finance term used in investment banking or securities transactions that refers "an order to buy or sell a stock that must be executed immediately".
        </span>
        <span v-if="time_in_force == 'fok'">
          A fill or kill (FOK) order is "an order to buy or sell a stock that must be executed immediately"—a few seconds, customarily—in its entirety; otherwise, the entire order is cancelled; no partial fulfillments are allowed.
        </span>
        <span v-if="time_in_force == 'opg'">
          OPG is used with a Limit order to indicate a Limit-On-Open order, or with a Market order to indicate a Market-on-Open order.
        </span>
      </div>
    </div>
    <div class="form-group">
      <label for="trigger">Trigger</label>
      <select v-model="trigger" class="form-control" id="trigger">
        <option value='immediate'>Immediate</option>
        <option value='stop'>Stop</option>
      </select>
    </div>
    <div class="form-group" v-if="type == 'limit'">
      <label for="price">Price</label>
      <input type='text' class="form-control" v-model="price"/>
    </div>
    <div class="form-group" v-if="trigger == 'stop'">
      <label for="stopPrice">Stop Price</label>
      <input type='text' class="form-control" v-model="stop_price"/>
    </div>
    <div class="form-group">
      <label for="quantity">Quantity</label>
      <input type="text" class="form-control" v-model="quantity"/>
    </div>
    <div class="form-group">
      <label for="side">Side</label>
      <select v-model="side" class="form-control" id="side">
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
    </div>
    <div class="form-group">
      <label for="extendedHours">Extended Hours</label>
      <input type='checkbox' v-model="extended_hours" class="form-control"/>
    </div>
    <div class="form-group">
      <button @click="order" class="btn btn-primary">Submit Order</button>
    </div>
    <hr>
  </div>
</transition>
</template>
<script>
import robinhood from '@/api/robinhood';
import state from '@/state';

export default {
  props: ['symbol'],
  created() {
    robinhood.getQuote(this.symbol);
  },
  data() {
    return {
      type: 'market',
      time_in_force: 'gfd',
      trigger: 'immediate',
      price: 0,
      stop_price: 0,
      quantity: 1,
      side: 'buy',
      extended_hours: false
    }
  },
  computed: {
    quote() {
      return state.getters.quote(this.symbol);
    },
    account() {
      return state.getters.currentAccount;
    },
    formData(){
      let formData = {
        account: this.account.account_number,
        instrument: this.quote.instrument.id,
        symbol: this.symbol,
        type: this.type,
        time_in_force: this.time_in_force,
        trigger: this.trigger,
        quantity: this.quantity,
        side: this.side
      }

      if(this.type === 'limit'){
        formData.price = this.price;
      }

      if(this.trigger === 'stop'){
        formData.stop_price = this.stop_price;
      }

      if(this.extended_hours === true){
        formData.extended_hours = true;
      }

      return formData;
    }
  },
  methods: {
    order(){
      console.log("Submitting order", this.formData);
    }
  },
  watch: {
    quote(){
      this.price = this.quote.ask_price;
    }
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
