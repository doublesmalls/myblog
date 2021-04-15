import Vue from 'vue';
import VueRouter from 'vue-router';

import adminLayout from '@/views/layout/slideMenu.vue';

Vue.use(VueRouter);
const constRoutes = [{
  path: '/admin',
  name: 'adminLayout',
  component: adminLayout,
  redirect:'/admin/user',
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
  ]
}];

const router = new VueRouter({
  mode: 'history',
  routes: constRoutes
});
// 路由白名单
// const whiteList = [];

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;