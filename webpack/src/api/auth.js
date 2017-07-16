export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds) {
    let self = this;

    $.post('/api/login', creds, function(data){
      self.user.authenticated = (data.err == null) ? true : false;

      if(self.user.authenticated){
        localStorage.setItem('loginCredentials', creds);
        localStorage.setItem('loggedIn', self.user.authenticated);
      }
      

      console.log('User auth status is ' + self.user.authenticated);
    })
  },

  checkAuth() {
    var jwt = localStorage.getItem('loggedIn');

    console.log('Auth check status ', jwt);
    
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  }
}