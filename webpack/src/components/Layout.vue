<template>
  <div class='dashboard-layout'>
    <main-nav></main-nav>
    <div class='container'>
      <router-view v-if="loaded"></router-view>
    </div>
    <footer-page></footer-page>
  </div>
</template>
<script>
import state from '@/state';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import robinhood from '@/api/robinhood';

export default {
  created(){
    robinhood.getAccounts();
    robinhood.getUser();
    robinhood.getMarkets();
  },
  computed: {
    loaded(){
      return (this.userData && this.account && this.robinhoodUser && this.portfolio);
    },
    userData: function(){
      return state.getters.userData;
    },
    account: function(){
      return state.getters.currentAccount;
    },
    loggedIn: function(){
       return state.getters.loggedIn;
    },
    loginStateChecked: function(){
       return state.getters.loginStateChecked;
    },
    robinhoodUser: function(){
      return state.getters.robinhoodUser;
    },
    portfolio(){
      return state.getters.resource(this.account.portfolio);
    },
    markets(){
      return state.getters.markets;
    }
  },
  watch: {
    account(account){
      robinhood.getResource(account.portfolio);
    }
  },
  components: {
    'main-nav': Nav,
    'footer-page': Footer
  }
}
</script>
