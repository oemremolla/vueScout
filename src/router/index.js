import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('@/components/pages/Home'),
    },
    {
      path: '/success',
      name: 'Success',
      component: () => import('@/components/pages/Success'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/components/pages/NotFound'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});

export default router;
