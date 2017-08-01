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
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/positions" class="nav-link">Positions</router-link></li>
          <li><router-link to="/recent-orders" class="nav-link">Recent Orders</router-link></li>
          <li v-if="userData != null" class='dropdown'>
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">{{userData.username}}
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><router-link to="/user-profile" class="nav-link">User Profile</router-link></li>
              <li><router-link to="/investment-profile" class="nav-link">Investment Profile</router-link></li>
              <li><a v-on:click="logout">Logout</a></li>
            </ul>
          </li>
          <li v-if="account"><a class="nav-link">Available To Withdraw: ${{parseFloat(account.cash_available_for_withdrawal).toFixed(2)}}</a></li>
          <li v-if="account"><a class="nav-link">Total Cash: ${{parseFloat(account.cash).toFixed(2)}}</a></li>
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
  methods: {
    logout: function(){
      auth.logout();
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
