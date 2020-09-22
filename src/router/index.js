import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login' // 登录
import index from '@/components/index' // 首页
import mine from '@/components/mine' // 我的
import info from '@/components/info' // 我的档案
import marry from '@/components/marry' // 被翻记录
import rise_vip from '@/components/rise_vip' // 会员升级
import detail from '@/components/detail' // 点我查看详情
import error from '@/components/error' // 错误

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) { //解决拖动时多个页面互相影响的问题，当切换到新路由时，想要页面滚到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollHeight
      }
    }
    return {
      x: 0,
      y: 0
    }
  },
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
        auth: true,
        keepAlive: true,
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
        title: '个人中心',
        auth: true,
        keepAlive: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/info',
      name: 'info',
      component: info,
      meta: {
        title: '档案',
        auth: true
      }
    },
    {
      path: '/marry',
      name: 'marry',
      component: marry,
      meta: {
        title: '被翻记录',
        auth: true
      }
    },
    {
      path: '/rise_vip',
      name: 'rise_vip',
      component: rise_vip,
      meta: {
        title: '升级VIP',
        auth: true
      }
    },
    {
      path: '/error',
      name: 'error',
      component: error,
      meta: {
        title: '错误'
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        title: '小姐姐资料'
      }
    }
  ]
})
