<template>
  <div class='ticker-link'>
    <router-link :to="{name: 'stock-view', params: {symbol: symbol}}"><strong>{{symbol}}</strong></router-link>
  </div>
</template>
<script>
export default {
  props: ['symbol'],
  name: 'ticker-link'
}
</script>
