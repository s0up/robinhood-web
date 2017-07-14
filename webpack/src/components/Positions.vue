<template>
  <h1>Positions page <span class='alert alert-success'>Bootstrap is working!</span></h1>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'This replaced stuff inside {{ msg }}'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
