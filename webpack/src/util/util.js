export default {
   formatMoney: function(amount){
      return ((parseFloat(amount) < 0) ? '-' : '') + '$' + Math.abs(parseFloat(amount)).toFixed(2).toString();
   }
}
