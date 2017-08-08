import Vue from 'vue';
import Router from 'vue-router';

import auth from '@/api/auth';

/*User def components*/
import Dashboard from '@/components/Dashboard';
import Positions from '@/components/Positions';
import RecentOrders from '@/components/RecentOrders';
import UserProfile from '@/components/UserProfile';
import InvestmentProfile from '@/components/InvestmentProfile';
import StockChart from '@/components/StockChart';
import StockView from '@/components/StockView';
import Banking from '@/components/Banking';

Vue.use(Router)

const router = new Router({
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
      path: '/investment-profile',
      name: 'investment-profile',
      component: InvestmentProfile
    },
    {
      path: '/stock-view/:symbol',
      name: 'stock-view',
      component: StockView
    },
    {
      path: '/stock-chart',
      name: 'stock-chart',
      component: StockChart
    },
    {
      path: '/banking',
      name: 'banking',
      component: Banking
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    }
  ]
});

router.beforeEach(function(to, from, next){
  auth.checkLoginState();

  return next();
});

export default router;
