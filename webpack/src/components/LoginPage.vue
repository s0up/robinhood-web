<template>
    <div class="container" @keyup.enter="login">
      <div class="form-signin">
        <h2 class="form-signin-heading">Robinhood Login</h2>
        <label for="inputEmail" class="sr-only">Username</label>
        <input v-model="username" type="text" id="username" class="form-control" placeholder="Username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div v-if="error != null" class='alert alert-danger'>{{error}}</div>
        <button v-if="pendingLogin == false" @click="login" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <button v-if="pendingLogin == true" class="btn btn-lg btn-block">Logging In...</button>
      </div>
    </div> <!-- /container -->
</template>
<script>
import auth from '../api/auth';

export default {
  name: 'login-page',
  data(){
   return {
      username: null,
      password: null,
      error: null,
      pendingLogin: false
   }
  },
  methods: {
   login: function(){
      auth.login(this, this.username, this.password);
   }
  },
  watch: {
   error: function(value){
      let context = this;

      setTimeout(function(){
         context.error = null;
      }, 3000);
   }
  }
}
</script>
