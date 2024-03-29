import Vue from 'vue';
import VueRouter from 'vue-router';

import adminLayout from '@/views/layout/slideMenu.vue';

Vue.use(VueRouter);
const constRoutes = [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/admin',
    name: 'adminLayout',
    component: adminLayout,
    redirect: '/admin/user',
    children: [{
        path: 'user',
        name: 'adminUser',
        component: () => import('@/views/pages/admin/user.vue')
      },
      {
        path: 'article',
        name: 'adminArticle',
        component: () => import('@/views/pages/admin/article.vue')
      },
      {
        path: 'message',
        name: 'adminMessage',
        component: () => import('@/views/pages/admin/message.vue')
      },
      {
        path: 'comment',
        name: 'adminComment',
        component: () => import('@/views/pages/admin/comment.vue')
      },
    ],
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/pages/home/layout/layout.vue'),
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/pages/home/home.vue')
    }, {
      path: '/article',
      name: 'article',
      component: () => import('@/views/pages/home/article.vue')
    }, {
      path: '/comment',
      name: 'comment',
      component: () => import('@/views/pages/home/comment.vue')
    }, {
      path: '/picture',
      name: 'picture',
      component: () => import('@/views/pages/home/picture.vue')
    }, {
      path: '/detail',
      name: 'Detail',
      component: () => import('@/views/pages/home/detail.vue')
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/pages/common/404.vue')
  },
  {
    path: '*',
    component: () => import('@/views/pages/common/404.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes: constRoutes,
});
// 路由白名单
// const whiteList = [];

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;