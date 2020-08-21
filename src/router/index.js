import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import index from '@/components/index'
import mine from '@/components/mine'

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
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
