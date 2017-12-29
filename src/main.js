// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { createStore } from './store'
import vueTitle from 'vue-wechat-title'
import axios from 'axios'
import 'normalize.css'
import './libs/cssrem'

// Store 生成
const store = createStore()
Vue.use(vueTitle)
Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$go = function(path) {
  router.push(path)
}
Vue.prototype.$replace = function(location) {
  router.replace(location)
}

function updateOnlineStatus(e) {
  if (navigator.onLine) {
    store.state.gToast.state = false
  } else {
    store.state.gToast.state = true
  }
}

router.beforeEach((to, from, next) => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  next()
})

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  mounted() {
    var eHead = document.head
    var cLink = document.createElement('link')
    cLink.rel = 'stylesheet'
    cLink.href = 'https://cdn.bootcss.com/ionicons/2.0.1/css/ionicons.min.css'
    eHead.appendChild(cLink)
  }
})
