import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

Vue.config.productionTip = false

import Iview from 'iview'
import 'iview/dist/styles/iview.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(Iview)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')