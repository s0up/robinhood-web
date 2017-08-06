import util from '@/util/util.js';

export default {
  register(Vue){
    //Format money as cash
    Vue.directive('money', {
      // When the bound element is inserted into the DOM...
      inserted: function (el) {
        // Focus the element
        if(isNaN(parseFloat(el.innerHTML))){
          return;
        }

        el.innerHTML = util.formatMoney(el.innerHTML);
      }
    });

    Vue.directive('round', {
      inserted: function(el, binding){
        if(isNaN(parseFloat(el.innerHTML))){
          return;
        }

        binding.value = (typeof binding.value === 'undefined') ? 2 : binding.value;

        el.innerHTML = parseFloat(el.innerHTML).toFixed(binding.value);
      }
    });
  }
}
