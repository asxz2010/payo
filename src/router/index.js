import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'  // 登录
import index from '@/components/index'  // 首页
import mine from '@/components/mine'  // 我的
import info from '@/components/info'  // 我的档案
import marry from '@/components/marry'  // 被翻记录
import rise_vip from '@/components/rise_vip'  // 会员升级
import error from '@/components/error'  // 错误

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '首页',
        requiresAuth: true
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/marry',
      name: 'marry',
      component: marry
    },
    {
      path: '/rise_vip',
      name: 'rise_vip',
      component: rise_vip
    },
    {
      path: '/error',
      name: 'error',
      component: error
    }
  ]
})
