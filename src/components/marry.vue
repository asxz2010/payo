<template>
  <div class="marry-container" ref="marry" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy"
    infinite-scroll-distance="10" :infinite-scroll-immediate-check="busy2">
    <div v-if="!bool" class="wrap2">
      <div class="iconfont iconmeiyoushuju"></div>
      <p>暂时没有数据</p>
    </div>
    <div v-else v-for="g in objList" class="wrap">
      <p>{{ tip }}日期: <span>{{ g.su_update_time }}</span></p>
      <div>
        <img :src="imgsrc" alt="PAYO社交">
        <div class="info">
          <p>编号: <span>{{ g.id }}</span></p>
          <p>地址: <span>{{ g.province }}-{{ g.city }}</span></p>
        </div>
        <div class="deta" @click="toDetil(g)">查看详情</div>
        <p v-if="g.su_res=='success' && type==2" class="succ">被翻成功</p>
        <p v-else-if="g.su_res=='wait' && type==2" class="wait">被翻等待</p>
        <p v-else-if="g.su_res=='refuse' && type==2" class="refu">被翻失败</p>
      </div>
      <img v-if="g.su_res=='success' && type==1" src="../assets/images/success_liao.png" alt="PAYO社交">
      <img v-else-if="g.su_res=='wait' && type==1" src="../assets/images/wait_liao.png" alt="PAYO社交">
      <img v-else-if="g.su_res=='refuse' && type==1" src="../assets/images/fail_liao.png" alt="PAYO社交">
    </div>

  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    data() {
      return {
        busy: false,
        busy2: true,
        scrollY: 0, // 节点滚动高度
        bool: true, // objList非空
        type: 1, // 默认是报名
        page: 1, // 默认页数
        objList: [], // 撩或被撩数据
        userinfo: {}, // Salt,province,addr,email等信息
        payodata: {}, // number,sex等信息
        imgsrc: ''
      }
    },
    created() {
      this.userinfo = JSON.parse(this.$global.getCookie('user_info'))
      this.payodata = JSON.parse(this.$global.getCookie('payo_data'))
      this.imgsrc = this.payodata.sex == 1 ? require('@/assets/images/woman.png') : require('@/assets/images/man.png')
      this.dealHeight()

      var type = this.$route.query.type
      if (this.payodata.sex == 1 && type == 1) {
        this.tip = '报名'
      } else if (this.payodata.sex == 1 && type == 2) {
        this.tip = '被翻'
      } else if (this.payodata.sex == 2 && type == 1) {
        this.tip = '翻牌'
      } else if (this.payodata.sex == 2 && type == 2) {
        this.tip = '被撩'
      }
      this.type = type
      this.objList = []
      this.getLiaoedList(type)
      this.scrollY = 0
    },
    methods: {
      /**
       * 被翻/报名记录
       */
      getLiaoedList(type) {
        var Salt = this.userinfo.Salt
        var UserNumber = this.payodata.number // 用户number
        var Sex = this.payodata.sex // 性别
        var Timestamp = this.$global.timestamp // 时间戳
        var Token = this.$md5(UserNumber + Salt + Timestamp)
        var data = {
          page: this.page,
          number: UserNumber,
          type,
          sex: Sex
        }
        this.$axios.post(this.$global.api + 'signup/list', Qs.stringify(data), {
          headers: {
            UserNumber,
            Token,
            Timestamp,
            Sex
          },
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            let lists = res.data.data.lists
            if (lists.length > 0) {
              for (let g of res.data.data.lists) {
                if (g.su_res == 'refund') {
                  continue
                }
                if (Sex == 1) {
                  g.id = g.su_gid
                } else {
                  g.id = g.su_bid
                }
                this.objList.push(g)
              }
            }
          }
          this.bool = this.objList.length > 0 ? true : false
        }).catch(err => {
          console.log(err)
        })
      },

      loadMore() {
        this.busy = true
        this.page++
        this.getLiaoedList(this.type)
        this.busy = false
      },

      /**
       * @param {String} number(报名对象id)
       */
      async toDetil(obj) {
        let imgObj = await this.getImgSrc(obj.id)
        if (imgObj.id == 2) {
          this.$toast('该用户没有上传图片')
        } else {
          this.$router.push({
            path: '/detail',
            query: {
              imgsrc: imgObj.imgsrc,
              obj
            }
          })
        }
      },

      /**
       * @param {String} number(报名对象id)
       */
      getImgSrc(number) {
        var Salt = this.userinfo.Salt
        var UserNumber = this.payodata.number // 用户number
        var Sex = this.payodata.sex // 性别
        var Timestamp = Math.round(new Date() / 1000) // 时间戳
        var Token = this.$md5(UserNumber + Salt + Timestamp)

        var order = this.userinfo.order
        var path = 'girl/list'
        if (this.payodata.sex == 2) {
          path = 'boy/list'
        }
        return new Promise(resolve => {
          this.$axios.get(this.$global.api + path, {
            headers: {
              UserNumber,
              Token,
              Timestamp,
              Sex
            },
            params: {
              page: 1,
              province: this.userinfo.province,
              order,
              number
            }
          }).then(res => {
            let list = res.data.data.list
            if (list.length > 0) {
              resolve({
                id: 1,
                imgsrc: list[0].cover_image
              })
            } else {
              resolve({
                id: 2,
                imgsrc: ''
              })
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },

      // 为了计算距离顶部的高度，当高度大于700显示回顶部图标
      scrollToTop() {
        let scrollTop = this.$refs.marry.scrollTop
        this.scrollTop = scrollTop
        if (this.scrollTop > 700) {
          this.btnFlag = true
        } else {
          this.btnFlag = false
        }
      },

      /**
       * 计算高度，返回不刷新
       */
      dealHeight() {
        this.$nextTick(() => {
          let marry = this.$refs.marry
          marry.addEventListener('scroll', function() {
            this.scrollY = marry.scrollTop
          }, false)
          marry.addEventListener('scroll', this.scrollToTop)
        })
      },

    },
    mounted() {

    },
    beforeRouteLeave(to, from, next) {
      this.scrollY = document.querySelector('.marry-container').scrollTop
      next()
    },
    destroyed() {
      document.querySelector('.marry-container').removeEventListener('scroll', this.scrollToTop)
    },
    activated() {
      this.bool = true
      if (localStorage.getItem('mine') == '/mine') {
        localStorage.removeItem('mine')
        var type = this.$route.query.type
        this.tip = type == 1 ? '报名' : '被翻'
        this.type = type
        this.objList = []
        this.page = 1
        this.getLiaoedList(type)
        this.scrollY = 0
      }
      if (this.payodata.sex == 1 && this.type == 1) {
        document.title = '报名记录'
        this.tip = '报名'
      } else if (this.payodata.sex == 1 && this.type  == 2) {
        document.title = '被翻记录'
        this.tip = '被翻'
      } else if (this.payodata.sex == 2 && this.type  == 1) {
        document.title = '翻牌记录'
        this.tip = '翻牌'
      } else if (this.payodata.sex == 2 && this.type  == 2) {
        document.title = '被撩记录'
        this.tip = '被撩'
      }
      document.querySelector('.marry-container').scrollTop = this.scrollY
    }

  }
</script>

<style scoped lang="scss">
  .marry-container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    overflow-y: scroll;
    padding: .5rem;

    .wrap2 {
      width: 100%;
      height: 100%;
      color: #FFB929;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .iconfont {
        font-size: 4rem;
        transform: translateY(-4rem);
      }

      p {
        letter-spacing: 1px;
        font-size: 0.7rem;
        transform: translateY(-3rem);
      }
    }

    .wrap {
      width: 100%;
      margin: auto;
      height: 9rem;
      background: url(http://qiniu.tecclub.cn/payo/bg_beifanjilu@2x.png) no-repeat;
      background-size: 100% 100%;
      padding: 1rem;
      letter-spacing: 1px;
      font-size: .9rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-bottom: 0.4rem;

      &:last-child {
        margin-bottom: 0;
      }

      &>div {
        display: flex;
        align-items: center;
        position: relative;

        img {
          width: 4rem;
        }

        .info {
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-evenly;

          p:nth-child(2) {
            color: #666;
          }
        }

        .deta {
          align-self: flex-end;
          position: absolute;
          right: 0;

          padding: 0.1rem .5rem;
          border-radius: 0.6rem;
          color: #FFB929;
          font-size: .7rem;
          letter-spacing: .1rem;
          border: 1px solid #FFB929;
        }

        &>p {
          position: absolute;
          right: 0;
        }

        .succ {
          color: #B3DF79;
        }

        .wait {
          color: #F6C77E;
        }

        .refu {
          color: #BCBCBC;
        }
      }

      &>img {
        position: absolute;
        top: 0;
        right: 0;
        width: 4rem;
      }
    }


  }
</style>
