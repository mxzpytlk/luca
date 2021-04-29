import { RouterPath } from '@/core/enums/router-path';
import store from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: RouterPath.AUTH,
    component: () => import('../views/auth/Auth.vue'),
  },
  {
    path: '/login',
    component: {
      render: (h) => h('div', ['Board Page', h('router-view')]),
    },
  },
  {
    path: RouterPath.DEFAULT,
    component: () => import('../views/auth/Auth.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from , next) => {
  const path = to.path;
  if (path !== RouterPath.AUTH) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next(RouterPath.AUTH);
    }
  }
  next();
});

export default router;
