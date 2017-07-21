<template>
  <div v-if='loginStateChecked' id="app">
    <main-nav v-if="loggedIn == true"></main-nav>
    <login-page v-else></login-page>
    <div class='container'>
      <router-view v-if="loggedIn == true"></router-view>
    </div>
  </div>
</template>
<script>
import LoginPage from '@/components/LoginPage';
import nav from '@/components/Nav';
import state from '@/state';
import auth from '@/api/auth';

export default {
   name: 'app',
   created(){
      auth.checkLoginState();
   },
   components: {
      'main-nav': nav,
      'login-page' : LoginPage
   },
   computed: {
      loggedIn: function(){
         return state.getters.loggedIn;
      },
      loginStateChecked: function(){
         return state.getters.loginStateChecked;
      }
   },
}
</script>