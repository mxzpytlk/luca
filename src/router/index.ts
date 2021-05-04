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
    path: RouterPath.REGISTER,
    component: () => import('../views/auth/Auth.vue'),
  },
  {
    path: RouterPath.MAIN,
    component: () => import('../views/luca-container/LucaContainer.vue'),
    children: [
      {
        path: RouterPath.NEW_NOTE,
        component: () => import('../views/new-note/NewNote.vue'),
      },
      {
        path: RouterPath.DELETE_SECTOR,
        component: () => import('../views/delete-sector/DeleteSector.vue'),
      },
      {
        path: RouterPath.EDIT,
        component: () => import('../views/edit-page/EditPage.vue'),
      },
      {
        path: RouterPath.PLAN,
        component: () => import('../views/day-plan/DayPlan.vue'),
      },
      {
        path: '*',
        component: () => import('../views/day-plan/DayPlan.vue'),
      },
      {
        path: '',
        component: () => import('../views/day-plan/DayPlan.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => store.getters.isLoggedIn ? import('../views/luca-container/LucaContainer.vue') : import('../views/auth/Auth.vue'),
    children: [
      {
        path: '*',
        component: () => import('../views/day-plan/DayPlan.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from , next) => {
  const path = to.path;
  const loginPath = [RouterPath.AUTH, RouterPath.REGISTER];
  const isLoggedIn = store.getters.isLoggedIn;

  if (!loginPath.some((item) => item === path)) {
    if (isLoggedIn) {
      next();
    } else {
      next(RouterPath.AUTH);
    }
  } else if (isLoggedIn) {
    next(RouterPath.MAIN);
  }
  next();
});

export default router;
