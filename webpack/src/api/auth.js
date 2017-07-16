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
    let self = this;

    var jwt = localStorage.getItem('loggedIn');
    var creds = localStorage.getItem('loginCredentials');

    if(creds == 'null'){
      this.user.authenticated = false;

      return;
    }

    console.log('Auth check status ', jwt, creds);

    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }

    /*Asynchronous auth check*/
    $.post('/api/getUserData', function(data){
      if(data.err != null){
        console.log('Attempting re-login with credentials ', creds);

        $.post('/api/login', creds, function(data){
          //Re-login if we need to
          self.user.authenticated = (data.err == null) ? true : false;

          if(self.user.authenticated){
            console.log('Re-logged in to robinhood...');
          }else{
            localStorage.setItem('loginCredentials', null);
            localStorage.setItem('loggedIn', false);
            self.user.authenticated = false;
          }
        });
      }else{
        console.log('Login status looks good...');
      }
    });
  }
}