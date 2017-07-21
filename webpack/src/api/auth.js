import state from '@/state';

export default {
   checkLoginState(){
      $.post('/api/getUserData', function(data){
         if(data.err != null){
            state.commit('setLoginStateChecked', true);
            state.commit('setLoginState', false);

            return;
         }

         state.commit('setLoginStateChecked', true);
         state.commit('setLoginState', true);
         state.commit('setUserData', data.result);
      });
   },

   login(context, username, password){
      context.pendingLogin = true;

      $.post('/api/login', {username: username, password: password}, function(data){
         context.pendingLogin = false;

         if(data.err != null){
            context.error = 'Invalid login credentials';

            return;
         }

         state.commit('setLoginState', true);

         context.$router.push('/positions');
      });
   },

   logout(){
      $.post('/logout', {}, function(data){
         state.commit('setLoginState', false);
         state.commit('setLoginStateChecked', true);
      });
   }
} 