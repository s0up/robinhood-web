<template>
<div id="app">
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Robinhood</a>
      </div>
      <div v-if="loginStateChecked" id="navbar" class="navbar-collapse collapse">
        <ul v-if="loggedIn" class="navbar-nav">
          <li class="nav-item"><router-link to="positions" class="nav-link" router-link="Positions">Positions</router-link></li>
        </ul>
        <form class="navbar-form navbar-right">
          <div v-if="loggedIn !== true" class="form-group">
            <input v-model="email" type="text" placeholder="Email" class="form-control">
          </div>
          <div v-if="loggedIn !== true" class="form-group">
            <input v-model="password" type="password" placeholder="Password" class="form-control">
          </div>
          <button v-if="loggedIn !== true" v-on:click="authenticate" type="submit" class="btn btn-success">Sign in</button>
        </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <!-- <img src="./assets/logo.png"> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
  </template>
  <script>
  import auth from './api/auth';

  export default {
    created: function(){
      auth.checkAuth(this);
    },
    data: function(){
      return {
        email: '',
        password: '',
        loggedIn: false,
        loginStateChecked: false
      }
    },
    methods: {
     authenticate: function(event){
      auth.login(this, {username: this.email, password: this.password})
     }
    },

    watch: {
      loggedIn: function(status){
        if(status === true)
          this.$router.push('/positions');
      }
    }
  }
  </script>
  <style>
  body {
  padding-top: 50px;
  padding-bottom: 20px;
  }
  /*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  }*/
  </style>