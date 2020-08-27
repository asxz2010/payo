<template>
  <div class="mine-container">
    <div class="top">
      <div class="help">
        <div class="iconfont iconwenhao"></div>
        <span @click="toPages('/rise_vip')">帮助</span>
      </div>
      <div class="wrap">
        <img src="http://51pyyy.cn/uploads/wxpayo/girl/logo-payo.png" alt="PAYO社交">
        <div class="number">
          <img src="http://51pyyy.cn/uploads/wxpayo/girl/v.png" alt="PAYO社交">
          <div>10548</div>
        </div>
        <p class="date">会员到期时间：2022年02月12日</p>
      </div>
      <div class="detail">
        <div>
          <img src="http://51pyyy.cn/uploads/wxpayo/boy/man.png">
        </div>
        <div v-show="!ssvip">
          <img src="@/assets/images/vip.png">
          <p>私人订制</p>
        </div>
        <div v-show="ssvip">
          <img src="@/assets/images/ssvip.png">
          <p>永久私人订制</p>
        </div>
        <div>
          <img src="http://51pyyy.cn/uploads/wxpayo/girl/icon-huiyuan.png">
          <p>会员认证</p>
        </div>
      </div>
    </div>

    <div class="middle">
      <ul>
        <li @click="toPages('/info')">
          <div>
            <div class="iconfont icondangan"></div>
            <span>我的档案</span>
          </div>
          <div>
            <div class="iconfont iconxiangyou"></div>
          </div>
        </li>
        <li @click="toPages('/rise_vip')">
          <div>
            <div class="iconfont iconxinbaniconshangchuan-"></div>
            <span>会员升级</span>
          </div>
          <div>
            <div class="iconfont iconxiangyou"></div>
          </div>
        </li>
        <li @click="toPages('/marry')">
          <div>
            <div class="iconfont iconjilu"></div>
            <span>被翻记录</span>
          </div>
          <div>
            <div class="iconfont iconxiangyou"></div>
          </div>
        </li>
        <li @click="toPages('/error')">
          <div>
            <div class="iconfont iconqiangzhipeidui"></div>
            <span>我的报名</span>
          </div>
          <div>
            <div class="iconfont iconxiangyou"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ssvip: true,
      }
    },
    methods: {
      toPages(str){
        // if(str === 'rise_vip'){
        //   window.location.replace(str)
        // }
        // else{
        //   this.$router.push({path:str})
        // }
        str? this.$router.push({path:str}):''
      }
    }
  }
</script>

<style scoped lang="scss">
  .mine-container {
    .top {
      width: 100%;
      background-image: url(http://51pyyy.cn/uploads/wxpayo/girl/payo-banner-bg.png);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      height: 34vh;
      background-color: #2d2d33;
      text-align: center;
      font-weight: 300;
      color: #fff;
      position: relative;

      .help {
        position: absolute;
        top: 1rem;
        right: 0;
        background: #222;
        color: #ccc;
        padding: 1vw 2vw;
        display: flex;
        font-size: .8rem;
        align-items: center;
        border-top-left-radius: 30vw;
        border-bottom-left-radius: 30vw;

        span {
          margin-left: .5rem;
          letter-spacing: 1px;
        }
      }

      .wrap {
        width: 74vw;
        /* height: 53%; */
        letter-spacing: 1px;
        position: absolute;
        left: 50%;
        top: 1rem;
        margin-left: -37vw;


        &>img {
          width: 18vw;
          border-radius: 50%;
          padding: 2px;
          background: white;
        }

        .number {
          font-size: 1.3rem;
          padding: 1rem 0 1rem;
          display: flex;
          justify-content: center;
          align-items: center;


          img {
            width: 3.5rem;
          }
        }

        .date {
          letter-spacing: 2px;
          font-size: 4vw;
        }

      }

      .detail {
        width: 100%;
        display: flex;
        height: 16%;
        position: absolute;
        bottom: 0;
        background: rgba(0, 0, 0, 0.25);

        &>div {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          font-size: 3.5vw;

          img {
            width: 5vw;
          }
        }

        &>div:nth-child(2) {
          border-left: 1px solid black;
          border-right: 1px solid black;
        }
      }

    }

    .middle {
      ul {
        width: 95%;
        margin: 1rem auto;

        li {
          background: white;
          display: flex;
          justify-content: space-between;
          padding: .7rem 1rem;
          font-size: 4vw;
          letter-spacing: .1rem;
          margin: .5rem 0;
          border-radius: .2rem;

          &>div {
            display: flex;
            align-items: center;

            span {
              margin-left: 0.8rem;

            }

            .iconfont {
              font-size: 1.1rem;
            }

            .iconxiangyou {
              font-size: .9rem;
            }
          }


        }
      }
    }
  }
</style>
