<template>
  <div v-if='loginStateChecked' id="app">
    <login-page v-if="!loggedIn"></login-page>
    <layout v-if="loggedIn === true"></layout>
  </div>
</template>
<script>
import LoginPage from '@/components/LoginPage';
import Layout from '@/components/Layout';
import state from '@/state';
import auth from '@/api/auth';

export default {
   name: 'app',
   components: {
      'login-page' : LoginPage,
      'layout': Layout
   },
   computed: {
      loggedIn: function(){
         return state.getters.loggedIn;
      },
      loginStateChecked: function(){
         return state.getters.loginStateChecked;
      }
   }
}
</script>
