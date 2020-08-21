import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import common from '@/lib/common.vue'
Vue.prototype.$global = common

import '@/assets/css/iconfont.css'

import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

import { Tabbar, TabItem } from 'mint-ui'
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)

import { Cascader, Radio } from 'element-ui'
Vue.use(Cascader)
Vue.use(Radio)

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

// import axios from 'axios'
// Vue.prototype.$axios = axios

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   if (to.meta.requiresAuth) {
//     if (localStorage.getItem('user')) {
//       next()
//     } else {
//       document.title = from.meta.title
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
