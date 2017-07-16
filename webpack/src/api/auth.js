import store from '../store'

export default {
  // Send a request to the login URL and save the returned JWT
  loggedIn: false,
  loginStateChecked: false,

  login(context, creds) {
    let self = this;

    localStorage.setItem('loginCredentials', null);
    localStorage.setItem('loggedIn', false);

    $.post('/api/login', creds, function(data){
      //context.loggedIn = (data.err == null) ? true : false;
      self.loggedIn = (data.err == null) ? true : false;

      store.commit('setLoginState', self.loggedIn);

      if(context.loggedIn){
        localStorage.setItem('loginCredentials', JSON.stringify(creds));
        localStorage.setItem('loggedIn', context.loggedIn);
      }

      console.log('User auth status is ' + context.loggedIn);
    })
  },

  checkAuth(context) {
    let self = this;

    var jwt = localStorage.getItem('loggedIn');
    var creds = JSON.parse(localStorage.getItem('loginCredentials'));

    if(creds == 'null'){
      //context.loggedIn = false;
      //context.loginStateChecked = true;
      self.loggedIn = false;
      self.loginStateChecked = true;

      store.commit('setLoginState', self.loggedIn);
      store.commit('setLoginStateChecked', self.loginStateChecked);
      
      return;
    }
    
    $.post('/api/getUserData', function(data){
      if(data.err != null){
        console.log('Attempting re-login with credentials ', creds);

        $.post('/api/login', creds, function(data){
          //Re-login if we need to

          self.loggedIn = (data.err == null) ? true : false;
          self.loginStateChecked = true;

          store.commit('setLoginState', self.loggedIn);
          store.commit('setLoginStateChecked', self.loginStateChecked);

          if(self.loggedIn){
            console.log('Re-logged in to robinhood...');
          }else{
            console.log('Login from localStorage failed...');

            localStorage.setItem('loginCredentials', null);
            localStorage.setItem('loggedIn', false);
          }
        });
      }else{
        self.loggedIn = true;
        self.loginStateChecked = true;

        store.commit('setLoginState', self.loggedIn);
        store.commit('setLoginStateChecked', self.loginStateChecked);

        console.log('Login status looks good...');
      }
    });
  }
}