import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Positions from '@/components/Positions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/positions',
      name: 'Positions',
      component: Positions
    }
  ]
})
