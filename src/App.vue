<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="page" v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view class="page" v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
    </transition>

    <div class="tabbar" v-show="flag">
      <div @click="chooseTab(0)">
        <div v-show="!tabFlag">
          <img src="@/assets/images/icon_liaomei.png" alt="">
          <p>{{ tip }}</p>
        </div>
        <div :class="tabFlag? 'active':'' " v-show="tabFlag">
          <img src="@/assets/images/icon_liaomei_act.png" alt="">
          <p>{{ tip }}</p>
        </div>
      </div>
      <div @click="chooseTab(1)">
        <div v-show="tabFlag">
          <img src="@/assets/images/icon_mine.png" alt="">
          <p>我的</p>
        </div>
        <div :class="!tabFlag? 'active':'' " v-show="!tabFlag">
          <img src="@/assets/images/icon_mine_act.png" alt="">
          <p>我的</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const route_LEV = {
    '/login': 0,
    '/index': 1,
    '/mine': 2,
    '/info': 3,
    '/marry': 3,
    '/rise_vip': 3,
    '/error': 3,
    '/detail': 4,
  }
  export default {
    name: 'App',
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        tip: '',
        flag: true,
        tabFlag: true,

        transitionName: '',
        LEVEL: route_LEV,
        isRouterAlive: true,
        keepAliveArr: ['index']
      }
    },
    created() {
      if(!localStorage.getItem('tabFlag')){
        localStorage.setItem('tabFlag', true)
      }
      this.tip = localStorage.getItem('tip')
      if (this.$route.path != '/index' && this.$route.path != '/mine') {
        this.flag = false
      } else {
        this.flag = true
      }
      if (localStorage.getItem('tabFlag')) {
        this.tabFlag = eval(localStorage.getItem('tabFlag'))
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      },
      chooseTab(num) {
        if (num == 0) {
          this.$router.push({
            path: '/index'
          })
        } else if (num == 1) {
          this.$router.push({
            path: '/mine'
          })
        }
      },
      toTabbar(path) {
        this.$router.push({
          path: '/' + path
        })
      }
    },
    watch: {
      '$route'(to, from) {
        let LEVEL = this.LEVEL
        let toDepth = LEVEL[to.path]
        let fromDepth = LEVEL[from.path]
        if ((toDepth === -1 || fromDepth === -1) || toDepth === fromDepth) {
          this.transitionName = ''
        } else {
          this.transitionName = toDepth < fromDepth ? 'fade-right' : 'fade-left'
        }
      },
      '$route.path': function(newVal) {
        if (newVal === '/index') {
          this.tabFlag = this.flag = true
          localStorage.setItem('tabFlag', true)
        } else if (newVal === '/mine') {
          this.tabFlag = false
          this.flag = true
          localStorage.setItem('tabFlag', false)
        } else {
          this.flag = false
        }
      }
    }

  }
</script>

<style lang="scss">
  .page {
    position: absolute;
    width: 100%;
    transition: all .5s linear;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #f4f4f4 !important;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  .container {
    background-color: #eeeeee;
    height: 400px;
  }

  .fade-left-enter-active,
  .fade-right-enter-active,
  .fade-left-leave-active,
  .fade-right-leave-active {
    transition: all 0.5s ease;
  }

  .fade-left-leave-to,
  .fade-right-enter {
    opacity: 0;
    transform: translateX(-100%);
  }

  .fade-left-enter,
  .fade-right-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  #app {
    font-family: 'txchj';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow-x: hidden;

    .header {
      width: 100%;
      height: 3rem;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
    }

    .tabbar {
      position: fixed;
      bottom: 0;
      height: 3rem;
      width: 100%;
      left: 0;
      display: flex;
      background: black;

      .active {
        color: #FFB929 !important;
      }

      &>div {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        &>div {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 50%;

          img {
            width: 1rem;
          }
        }
      }
    }
  }
</style>
