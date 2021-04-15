import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

Vue.config.productionTip = false

import Iview from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(Iview)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')