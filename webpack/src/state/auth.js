import util from '@/util/util';

export default {
  namespaced: true,

  state: {
    loginStateChecked: false,
    userData: null,
    loginState: null
  },

  actions: {
    async checkLoginState(state){
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

        return;
      }catch(e){
        state.commit('setLoginStateChecked', true);
        state.commit('setLoginState', false);
        state.commit('setUserData', null);

        throw e;
      }
    },

    async login(state, credentials){
      try{
        let loginResult = await util.post('/user/login', {username: credentials.username, password: credentials.password});
        state.commit('setLoginStateChecked', true);
        state.commit('setLoginState', true);
        state.commit('setUserData', loginResult.result);

        return loginResult;
      }catch(e){
        state.commit('setLoginStateChecked', true);
        state.commit('setLoginState', false);
        state.commit('setUserData', null);

        throw e;
      }
    },

    async logout(state){
      try{
        await util.post('/user/logout');

        state.commit('setLoginState', false);
        state.commit('setLoginStateChecked', true);

        return;
      }catch(e){
        throw e;
      }
    }
  },

  mutations: {
    setLoginState: (state, loginState) => state.loginState = loginState,
    setLoginStateChecked: (state, loginStateChecked) => state.loginStateChecked = loginStateChecked,
    setUserData: (state, userData) => state.userData = userData
  },

  getters: {
    loginState: (state) => state.loginState,
    loginStateChecked: (state) => state.loginStateChecked,
    userData: (state) => state.userData
  }
}
