<template>
  <div class="mine-container">
    <div class="top">
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
        <div>
          <img src="http://qiniu.tecclub.cn/payo/vip_siren@2x.png">
          <p>私人订制</p>
        </div>
        <div>
          <img src="http://51pyyy.cn/uploads/wxpayo/girl/icon-huiyuan.png">
          <p>会员认证</p>
        </div>
      </div>
    </div>

    <div class="middle">
      <ul>
        <li>
          <span>我的档案</span>
          <div class="iconfont iconxiangyou"></div>
        </li>
        <li>
          <span>会员升级</span>
          <div class="iconfont iconxiangyou"></div>
        </li>
        <li>
          <span>被翻记录</span>
          <div class="iconfont iconxiangyou"></div>
        </li>
        <li>
          <span>我的报名</span>
          <div class="iconfont iconxiangyou"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .mine-container {
    .top {
      width: 100%;
      background-image: url(http://51pyyy.cn/uploads/wxpayo/girl/payo-banner-bg.png);
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center;
      height: 250px;
      background-color: #2d2d33;
      text-align: center;
      font-weight: 300;
      color: #fff;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .wrap {
        width: 75%;
        height: 80%;


        img {
          width: 18vw;
          border-radius: 50%;
        }

        .number {
          font-size: .9rem;
          padding: 2rem 0 1rem;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 10vw;
          }
        }

        .date {
          letter-spacing: 1px;
          font-size: 3.2vw;
        }

      }

      .detail {
        width: 100%;
        display: flex;
        height: 10vw;
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
            width: 4vw;
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
        margin: auto;

        li {
          background: white;
          display: flex;
          justify-content: space-between;
          padding: .7rem 1rem;
          font-size: 0.9rem;
          letter-spacing: .1rem;
          margin: .5rem 0;
          border-radius: .2rem;

          .iconxiangyou {
            font-size: .9rem;
          }
        }
      }
    }
  }

</style>
