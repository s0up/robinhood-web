<!-- TODO: figure out limits of template tag and what's allowed outside of it -->

<!--
<template>
  <div class="hello">
    <h1>Positions page</h1>
    <p>{{ msg }}</p>
    <div class="row">
      <script type="text/x-template" id="grid-template">
      <table class="table table-striped table-condensed table-hover">
        <thead>
        <tr>
          <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
          </th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filteredData">
            <td v-for="key in columns">
              {{entry[key]}}
            </td>
          </tr>
        </tbody>
      </table>
      </script>
    </div>
  </div>
</template>
-->
<template>
  <div v-if="loggedIn == true" class="positions">
    <h1>Positions Page</h1>
    <div v-if="requestComplete == false" class='alert alert-info'>Loading...</div>
    <div v-if="error !== null" class='alert alert-danger'>OH NOES ERROR! {{error}}</div>
    <table v-if="apiResponse != null" class="table table-striped table-condensed table-hover">
      <thead>
        <th v-for="key in columns">{{key}}</th>
      </thead>
      <tbody>
        <tr v-for="row in apiResponse">
          <td v-for="key in columns">
            {{row[key]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'positions',
  created() {
    var self = this;

    wait();

    function wait(){
      if(self.loggedIn){
        $.post('/api/getPositions?nonzero=true', function(data){
          self.requestComplete = true;
          
          if(data.err !== null){
            self.error = data.err;
            return;
          }

          self.apiResponse = data.result.results;
          self.columns = Object.keys(self.apiResponse[0]);
        });
      }else{
        setTimeout(function(){
          wait();
        }, 3000);
      }
    }
  },
  data () {
    return {
      apiResponse: null,
      requestComplete: false,
      error: null,
      columns: ['rawr', 'hi'],
      msg: 'This replaced stuff inside msg'
    }
  },
  watch: {
    error: function(val){
      var self = this;

      setTimeout(function(){
        self.error = null;
      }, 5000);
    }
  },
  computed: {
    loggedIn: {
      get: function(){
        return store.getters.isLoggedIn;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
