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
Vue.use(ViewUI)
Vue.config.productionTip = false

Vue.use(waterfall)
Vue.use(Vue2Editor);
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')