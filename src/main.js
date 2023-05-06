import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**
 * 导入element.js和样式
 */
import ElementUI from 'element-ui'; // element.js
import 'element-ui/lib/theme-chalk/index.css'; // element.css
Vue.use(ElementUI); // element.js

/**
 * 导入axios
 */
import axios from './axios'
Vue.prototype.$axios = axios

/**
 * 导入mock
 */
import './mock.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
