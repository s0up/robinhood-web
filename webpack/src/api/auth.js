import state from '@/state';
import util from '@/api/util';

export default {
   async checkLoginState(){
     try{
       let loginState = await util.post('/user/checkLoginState');

       if(loginState.result == true){
         state.commit('setLoginStateChecked', true);
         state.commit('setLoginState', true);
         state.commit('setUserData', loginState.userData);
       }else{
         state.commit('setLoginStateChecked', true);
         state.commit('setLoginState', false);
         state.commit('setUserData', null);
       }
     }catch(e){
       state.commit('setLoginStateChecked', true);
       state.commit('setLoginState', false);
       state.commit('setUserData', null);
     }
   },

   async login(context, username, password){
     try{
       let loginResult = await util.post('/user/login', {username: username, password: password});

       context.pendingLogin = false;
       
       state.commit('setLoginStateChecked', true);
       state.commit('setLoginState', true);
       state.commit('setUserData', loginResult.result);
     }catch(e){
       context.pendingLogin = false;

       state.commit('setLoginStateChecked', true);
       state.commit('setLoginState', false);
       state.commit('setUserData', null);

       context.error = e.toString();
     }
   },

   async logout(){
     try{
       await util.post('/user/logout');

       state.commit('setLoginState', false);
       state.commit('setLoginStateChecked', true);
     }catch(e){
       console.log("Logout failure" + e.toString());
     }
     /*
      $.post('/logout', {}, function(data){
         state.commit('setLoginState', false);
         state.commit('setLoginStateChecked', true);
      });*/
   }
}
