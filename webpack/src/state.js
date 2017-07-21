import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  loggedIn: false,
  loginStateChecked: false,
  userData: null,
  positions: [],
  nextPosition: null,
  previousPosition: null,
  quotes: {},
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  /*User state data*/
  setLoginState: function(state, loginState){
    state.loggedIn = loginState;
  },

  setLoginStateChecked: function(state, loginStateChecked){
    state.loginStateChecked = loginStateChecked;
  },

  setUserData: function(state, userData){
    state.userData = userData;
  },

  setPositions: function(state, positions){
    state.positions = positions;
  },

  setNextPosition: function(state, position){
    state.nextPosition = position;
  },

  setPrevousPosition: function(state, position){
    state.previousPosition = position;
  },

  setQuotes: function(state, quotes){
    state.quotes = quotes;
  },
  
  addQuote: function(state, quote){
    state.quotes[quote.symbol] = quote;
  }
}


// getters are functions
const getters = {
  loggedIn: function(){
    return state.loggedIn;
  },

  loginStateChecked: function(){
    return state.loginStateChecked;
  },

  userData: function(){
    return state.userData
  },

  positions: function(){
    return state.positions;
  },

  nextPosition: function(){
    return state.nextPosition;
  },

  previousPosition: function(){
    return state.previousPosition;
  },

  quotes: function(){
    return state.quotes;
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  mutations
})