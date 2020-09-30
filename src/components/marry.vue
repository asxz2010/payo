<template>
  <div class="marry-container" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="10"
    :infinite-scroll-immediate-check="busy2">
    <div class="wrap" v-for="g in objList">
      <p>{{ tip }}日期: <span>{{ g.su_update_time }}</span></p>
      <div>
        <img src="http://qiniu.tecclub.cn/payo/img_chenggong_nv @2x.png" alt="PAYO社交">
        <div class="info">
          <p>编号: <span>{{ g.id }}</span></p>
          <p>地址: <span>{{ g.province }}-{{ g.city }}</span></p>
        </div>
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
        type: 1, // 默认是报名
        page: 1, // 默认页数
        objList: [], // 撩或被撩数据
        userinfo: {}, // Salt,province,addr,email等信息
        payodata: {}, // number,sex等信息
      }
    },
    created() {
      document.title = this.$route.query.type == 1 ? '报名记录' : '被翻记录'
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
          if (res.data.code == 200) {
            let lists = res.data.data.lists
            if (lists.length > 0) {
              console.log(lists)
              for (let g of res.data.data.lists) {
                if(g.su_res == 'refund'){
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
    },
    mounted() {
      this.userinfo = JSON.parse(this.$global.getCookie('user_info'))
      this.payodata = JSON.parse(this.$global.getCookie('payo_data'))
      var type = this.$route.query.type
      type == 1 ? this.tip = '报名' : this.tip = '被翻'
      this.type = type
      this.getLiaoedList(type)
    }
  }
</script>

<style scoped lang="scss">
  .marry-container {
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    overflow-y: scroll;
    padding: .5rem;

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
