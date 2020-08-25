<template>
  <div id="app">
    <!-- <div class="header">
111
    </div> -->
    <transition mode="out-in" :name="transitionName">
      <router-view />
    </transition>
    <!-- <mt-tabbar v-model="selected" v-show="flag">
      <mt-tab-item id="撩妹" @click.native="toTabbar('index')">
        <img slot="icon" src="@/assets/images/team.png">
        <img slot="icon" src="@/assets/images/teamAct.png">
        撩妹
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="toTabbar('mine')">
        <img slot="icon" src="@/assets/images/mine.png">
        <img slot="icon" src="@/assets/images/mineAct.png">
        我的
      </mt-tab-item>
    </mt-tabbar> -->
    <div class="tabbar" v-show="flag">
      <div @click="chooseTab(0)">
        <div v-show="!tabFlag">
          <img src="@/assets/images/icon_liaomei.png" alt="">
          <p>撩妹</p>
        </div>
        <div :class="tabFlag? 'active':'' " v-show="tabFlag">
          <img src="@/assets/images/icon_liaomei_act.png" alt="">
          <p>撩妹</p>
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
    '/index': 0,
    '/mine': 1
  }
  export default {
    name: 'App',
    data() {
      return {
        selected: '撩妹',
        flag: true,
        tabFlag: true,

        transitionName: '',
        LEVEL: route_LEV
      }
    },
    created() {
      this.$route.path === '/login' ? this.flag = false : ''
    },
    methods: {
      chooseTab(num) {
        if (num == 0) {
          this.tabFlag = true
          this.$router.push({
            path: '/index'
          })
        } else if (num == 1) {
          this.tabFlag = false
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
        this.$route.path === '/index' || this.$route.path === '/mine' ? this.flag = true : this.flag = false
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }


  body {
    margin: 0;
    background-color: #f4f4f4 !important;
    // overflow: hidden;
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
  .fade-right-enter-active {
    transition: all .08 ease
  }

  .fade-left-leave-active,
  .fade-right-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  }

  .fade-left-leave-to,
  .fade-right-enter {
    transform: translate3d(-100%, 0, 0);
    opacity: 0
  }

  .fade-left-enter,
  .fade-right-leave-to {
    transform: translate3d(50%, 0, 0);
    opacity: 0
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

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
