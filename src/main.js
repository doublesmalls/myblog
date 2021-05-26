import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

Vue.config.productionTip = false

import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue2Editor from "vue2-editor";
import waterfall from 'vue-waterfall2'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import live2d from 'ttzxh-vue-live2d'
import live2dcss from '../node_modules/ttzxh-vue-live2d/dist/ttzxh-vue-live2d.css'

Vue.use(live2d)
Vue.use(ViewUI)
Vue.config.productionTip = false

Vue.use(waterfall)
Vue.use(Vue2Editor);
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  if (to.fullPath.substr(0, 6) === '/admin') {
    if (store.state.userStore.userInfo) {
      if (store.state.userStore.userInfo.adminType) {
        next()
      } else {
        next({
          path: '/404'
        })
      }
    } else {
      next({
        path: '/'
      })
    }

  } else {
    next()
  }
})
router.afterEach(() => {
  ViewUI.LoadingBar.finish();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')