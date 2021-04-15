/*
 * @Author: your name
 * @Date: 2021-03-29 10:58:51
 * @LastEditTime: 2021-04-07 11:05:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cqc\cqzhongwang-index-vue\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/slideMenu.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/admin',
  name: 'Layout',
  component: Layout,
  children: [{
    path: '/user',
    name: 'adminUser',
    component: () => import('@/views/pages/admin/user.vue')
  }]
}, ];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

export default router;