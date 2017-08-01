import Vue from 'vue'
import Router from 'vue-router'

/*User def components*/
import Positions from '@/components/Positions';
import RecentOrders from '@/components/RecentOrders';
import UserProfile from '@/components/UserProfile';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/positions',
      name: 'positions',
      component: Positions
    },
    {
      path: '/recent-orders',
      name: 'recent-orders',
      component: RecentOrders
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: UserProfile
    },
    {
      path: '/',
      name: 'dashboard',
      component: Positions
    }
  ]
})
