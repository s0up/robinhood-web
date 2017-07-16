export default {
  // Send a request to the login URL and save the returned JWT
  login(context, creds) {
    let self = this;

    $.post('/api/login', creds, function(data){
      context.loggedIn = (data.err == null) ? true : false;

      if(context.loggedIn){
        localStorage.setItem('loginCredentials', creds);
        localStorage.setItem('loggedIn', context.loggedIn);
      }

      console.log('User auth status is ' + context.loggedIn);
    })
  },

  checkAuth(context) {
    let self = this;

    var jwt = localStorage.getItem('loggedIn');
    var creds = localStorage.getItem('loginCredentials');

    if(creds == 'null'){
      context.loggedIn = false;
      context.loginStateChecked = true;
      return;
    }
    
    $.post('/api/getUserData', function(data){
      if(data.err != null){
        console.log('Attempting re-login with credentials ', creds);

        $.post('/api/login', creds, function(data){
          //Re-login if we need to
          context.loggedIn = (data.err == null) ? true : false;

          if(context.loggedIn){
            console.log('Re-logged in to robinhood...');
          }else{
            localStorage.setItem('loginCredentials', null);
            localStorage.setItem('loggedIn', false);
            context.loggedIn = false;
          }
        });
      }else{
        context.loggedIn = true;
        context.loginStateChecked = true;
        console.log('Login status looks good...');
      }
    });
  }
}