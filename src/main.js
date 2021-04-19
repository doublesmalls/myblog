import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

Vue.config.productionTip = false

import Iview from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.use(ElementUI)

Vue.use(Iview)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')