import util from '@/util/util.js';
import moment from 'moment';

export default {
  register(Vue){
    //Format money as cash
    Vue.directive('money', {
      inserted: function (el) {
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

    Vue.directive('from-now', {
      inserted: function(el){
        el.innerHTML = moment(new Date(el.innerHTML)).fromNow().toString();
      }
    });
  }
}
