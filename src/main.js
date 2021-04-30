import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

Vue.config.productionTip = false

import Iview from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
Vue.use(Iview)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')