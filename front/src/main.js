// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/views/user/UserShare.css'
import '@/views/user/UserShare.js'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.timeout = 5000;

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.defaults.baseURL = 'http://localhost:8000/';

new Vue({
  el: '#app',
  router,
  render: h => h(App)

})
