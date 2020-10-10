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
          <div>{{ this.vipinfo.number }}</div>
        </div>
        <p v-if="this.vipinfo.vip" class="date">会员到期时间：{{ this.vipinfo.expire_time|cutString(10) }}</p>
      </div>
      <div v-if="this.vipinfo.vip" class="detail">
        <div>
          <img src="http://51pyyy.cn/uploads/wxpayo/boy/man.png">
        </div>
        <div>
          <img v-if="this.vipinfo.vip == '永久私人订制'" src="@/assets/images/ssvip.png">
          <img v-else-if="this.vipinfo.vip == '私人订制'" src="@/assets/images/vip.png">
          <p>{{ this.vipinfo.vip }}</p>
        </div>
        <div>
          <img src="http://51pyyy.cn/uploads/wxpayo/girl/icon-huiyuan.png">
          <p>会员认证</p>
        </div>
      </div>
    </div>

    <div class="middle">
      <ul>
        <li @click="toInfo('/info')">
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
        <li @click="toPages('/marry', 2)">
          <div>
            <div class="iconfont iconjilu"></div>
            <span>被翻记录</span>
          </div>
          <div>
            <div class="iconfont iconxiangyou"></div>
          </div>
        </li>
        <li @click="toPages('/marry', 1)">
          <div>
            <div class="iconfont iconqiangzhipeidui"></div>
            <span>我的报名</span>
          </div>
          <div>
            <div class="iconfont iconxiangyou"></div>
          </div>
        </li>
        <li @click="loginOut()">
          <div>
            <div class="iconfont icontuichudenglu"></div>
            <span>退出</span>
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
  import {
    Toast
  } from 'vant'
  export default {
    // name: 'mine',
    inject: ['reload'],
    data() {
      return {
        vipinfo: {}, // 用户vip信息
        userinfo: {}, // Salt,province,addr,email等信息
        payodata: {}, // number,sex等信息
      }
    },
    created() {
      this.userinfo = JSON.parse(this.$global.getCookie('user_info'))
      this.payodata = JSON.parse(this.$global.getCookie('payo_data'))
    },
    methods: {
      /**
       * 退出登录
       */
      loginOut() {
        this.$dialog.confirm({
            title: '退出登录？',
            cancelButtonText: '暂不'
          })
          .then(() => {
            Toast.loading({
              message: '正在退出...',
              forbidClick: true,
              duration: 1500
            })
            this.$global.delCookie('user_info')
            this.$global.delCookie('payo_data')
            localStorage.removeItem('tabFlag')
            setTimeout(() => {
              Toast.success({
                message: '已退出',
                duration: 1000
              })
              setTimeout(() => {
                this.$router.push({
                  path: '/login'
                })
              }, 1500)
            }, 1500)
          })
          .catch(() => {})
      },

      /**
       * @param {Object} str(路由)
       * @param {Object} type(1为报名，2为翻)
       */
      toPages(str, type) {
        str ? this.$router.push({
          path: str,
          query: {
            type
          }
        }) : ''
      },

      /**
       * @param {String} path(路由)
       * @param {String} imgsrc(图片)
       */
      toInfo(path) {
        path ? this.$router.push({
          path: path,
          query: {
            imgsrc: this.vipinfo.cover_image
          }
        }) : ''
      },

      /**
       * 用户会员信息
       */
      getVipInfo() {
        var Salt = this.userinfo.Salt
        var UserNumber = this.payodata.number // 用户number
        var Sex = this.payodata.sex // 性别
        var Timestamp = this.$global.timestamp // 时间戳
        var Token = this.$md5(UserNumber + Salt + Timestamp)
        var path = Sex == 1 ? 'boy/view' : 'girl/view'
        this.$axios.get(this.$global.api + path, {
          params: {
            number: UserNumber
          },
          headers: {
            UserNumber,
            Token,
            Timestamp,
            Sex
          },
        }).then(res => {
          if (res.data.code == 200) {
            let data = res.data.data
            if(data.boy_number){
              data.number = data.boy_number
              data.boy_number = undefined
            }
            this.vipinfo = data
          }
          console.log(res)
        }).catch(err => {
          console.log(err.message)
        })
      },

    },
    mounted() {
      this.getVipInfo()
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
