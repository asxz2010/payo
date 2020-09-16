import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import '@/assets/css/iconfont.css'

import clipboard from 'clipboard'
Vue.prototype.$clipboard = clipboard

import md5 from 'js-md5'
Vue.prototype.$md5 = md5

import common from '@/lib/common.vue'
Vue.prototype.$global = common

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import {
  DropdownMenu,
  DropdownItem,
  Overlay,
  Button,
  Dialog,
  Notify,
  Area,
  Popup,
  Toast
} from 'vant'
Vue.use(DropdownMenu).use(DropdownItem).use(Overlay).use(Button).use(Dialog).use(Notify).use(Area).use(Popup).use(Toast)

import {
  Cascader,
  Radio
} from 'element-ui'
Vue.use(Cascader).use(Radio)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.auth) {
    if (common.getCookie('username')) {
      // if (true) {
      next()
    } else {
      document.title = from.meta.title
      next('/login')
    }
  } else {
    next()
  }
})

// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// Vue.use(iView)

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// import vueCanvasPoster from 'vue-canvas-poster'
// Vue.use(vueCanvasPoster)

import axios from 'axios'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://api.51pyvip.com/'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
