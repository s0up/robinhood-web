<template>
  <div class="hello">
    <h1>Positions page</h1>
    <p>{{ msg }}</p>
    <div class="row">
      <table class="table table-striped table-condensed table-hover">
        <thead>
        <tr>
          <th>Symbol</th>
          <th>Shares</th>
          <th>Current</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
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
