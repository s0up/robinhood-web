import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  loggedIn: false,
  loginStateChecked: false
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setLoginState: function(state, loginState){
    state.loggedIn = loginState;
  },

  setLoginStateChecked: function(state, loginStateChecked){
    state.loginStateChecked = loginStateChecked;
  }
}


// getters are functions
const getters = {
  isLoggedIn: function(){
    return state.loggedIn;
  },

  isLoginStateChecked: function(){
    return state.loginStateChecked;
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  mutations
})