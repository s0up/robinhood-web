import Vue from 'vue'
import Router from 'vue-router'

/*User def components*/
import Positions from '@/components/Positions';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/positions',
      name: 'positions',
      component: Positions
    }
  ]
})
