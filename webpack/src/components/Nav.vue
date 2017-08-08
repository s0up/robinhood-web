<!-- Static navbar -->
<template>
  <nav id='header' class="navbar navbar-inverse navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/" class="navbar-brand">RobinhoodWeb</router-link>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <div class="navbar-form navbar-left" role="search"  @keyup.enter="search">
            <div class="form-group">
                <input v-model="ticker_search" type="text" class="form-control input-sm" placeholder="Ticker Search">
            </div>
            <button @click="search" type="submit" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-search"></span>
            </button>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <!--<li><router-link to="/stock-chart" class="nav-link">StockCharts</router-link></li>-->
          <li><router-link to="/positions" class="nav-link">Positions</router-link></li>
          <li><router-link to="/recent-orders" class="nav-link">Orders</router-link></li>
          <li><router-link :to="{name: 'banking'}" class="nav-link">Banking</router-link></li>
          <li v-if="userData != null" class='dropdown'>
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">{{userData.robinhood_username}}
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><router-link to="/user-profile" class="nav-link">User Profile</router-link></li>
              <!--<li><router-link to="/investment-profile" class="nav-link">Investment Profile</router-link></li>-->
              <li><a v-on:click="logout">Logout</a></li>
            </ul>
          </li>
          <!--
          <li v-if="account" class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
              Available To Widthdraw: <span v-money="account.cash_available_for_withdrawal"></span>
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li v-if="account"><a class="nav-link">Uncleared Deposits: <span v-money="account.uncleared_deposits"></span></a></li>
            </ul>
          </li>-->
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>
<script>
import state from '@/state';
import auth from '@/api/auth';
import robinhood from '@/api/robinhood';

export default {
  name: 'main-nav',
  created(){
    auth.checkLoginState();
    robinhood.getAccounts();
  },
  data(){
    return {
      ticker_search: ""
    }
  },
  methods: {
    logout: function(){
      auth.logout();
    },
    search(){
      if(this.ticker_search == ""){
        return;
      }

      let ticker = this.ticker_search.toUpperCase();

      this.ticker_search = "";

      this.$router.push({name: 'stock-view', params: {symbol: ticker}});
    }
  },
  computed: {
    userData: function(){
      return state.getters.userData;
    },
    account: function(){
      return state.getters.currentAccount;
    }
  }
}
</script>
<style scoped>
.navbar-inverse .navbar-brand {
  color: #fff;
  font-weight: bold;
}

</style>
