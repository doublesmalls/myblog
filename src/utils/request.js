import axios from 'axios';
import Vue from 'vue';
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios
export { axios };
