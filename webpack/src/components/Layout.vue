<template>
  <div class='dashboard-layout'>
    <main-nav></main-nav>
    <div class='container-fluid container-main'>
      <router-view v-if="loaded"></router-view>
    </div>
    <footer-page v-if="loaded"></footer-page>
  </div>
</template>
<script>
import state from '@/state';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default {
  created(){
    state.dispatch('robinhood/getAccounts');
    state.dispatch('robinhood/getUser');
    state.dispatch('robinhood/getMarkets');
  },
  computed: {
    loaded(){
      return (this.userData && this.account && this.robinhoodUser && this.portfolio);
    },
    userData: function(){
      return state.getters['auth/userData'];
    },
    account: function(){
      return state.getters['robinhood/currentAccount'];
    },
    loggedIn: function(){
       return state.getters['auth/loginState'];
    },
    loginStateChecked: function(){
       return state.getters['auth/loginStateChecked'];
    },
    robinhoodUser: function(){
      return state.getters['robinhood/robinhoodUser'];
    },
    portfolio(){
      return state.getters['robinhood/resource'](this.account.portfolio);
    },
    markets(){
      return state.getters.markets;
    }
  },
  watch: {
    account(account){
      state.dispatch('robinhood/getResource', account.portfolio);
    }
  },
  components: {
    'main-nav': Nav,
    'footer-page': Footer
  }
}
</script>

<!---<style>
  .container-fluid {
    background-color: #333333;
  }
</style>
