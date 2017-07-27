export default {
   formatMoney: function(amount){
      return ((parseFloat(amount) < 0) ? '-' : '') + '$' + parseFloat(amount).toFixed(2).toString();
   }
}