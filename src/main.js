import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import '@/assets/css/iconfont.css'
import '@/assets/fonts/font.css'

import store from '@/store/index.js'

import clipboard from 'clipboard'
Vue.prototype.$clipboard = clipboard

import md5 from 'js-md5'
Vue.prototype.$md5 = md5

import common from '@/lib/common.vue'
Vue.prototype.$global = common

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import {
  DropdownMenu,
  DropdownItem,
  Overlay,
  Button,
  Dialog,
  Notify,
  Area,
  Popup,
  Toast,
  Skeleton
} from 'vant'
Vue.use(DropdownMenu).use(DropdownItem).use(Overlay).use(Button).use(Dialog).use(Notify).use(Area).use(Popup).use(Toast).use(Skeleton)

import {
  Cascader,
  Radio
} from 'element-ui'
Vue.use(Cascader).use(Radio)

import * as custom from '@/lib/filter.js'
// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.auth) {
    if (common.getCookie('payo_data')) {
      next()
    } else {
      document.title = from.meta.title
      next('/login')
    }
  } else if (to.path == '/login') {
    common.getCookie('payo_data') ? next('/index') : next()
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
// import $ from 'jquery'

import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Token'] = '123';
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
