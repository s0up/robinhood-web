<!-- TODO: figure out limits of template tag and what's allowed outside of it -->

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


<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'This replaced stuff inside msg'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
