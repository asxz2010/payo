<template>
  <div class="marry-container">
    <div class="wrap" v-for="g in objList">
      <p>被翻日期: <span>{{ g.su_update_time }}</span></p>
      <div>
        <img src="http://qiniu.tecclub.cn/payo/img_chenggong_nv @2x.png" alt="PAYO社交">
        <div class="info">
          <p>编号: <span>{{ g.su_gid }}</span></p>
          <p>地址: <span>江苏-南京</span></p>
        </div>
      </div>
      <img src="http://qiniu.tecclub.cn/payo/icon_liaomeichengg_g@2x.png" alt="PAYO社交">
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    data() {
      return {
        page: 1, // 默认页数
        objList: {}, // 撩或被撩数据
        userinfo: {}, // Salt,province,addr,email等信息
        payodata: {}, // number,sex等信息
      }
    },
    methods: {
      /**
       * 被翻记录
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
        console.log(data)
        this.$axios.post(this.$global.api + 'signup/list', Qs.stringify(data), {
          headers: {
            UserNumber,
            Token,
            Timestamp,
            Sex
          },
        }).then(res => {
          if (res.data.code == 200) {
            this.objList = res.data.data.selectGirls
            console.log(res.data.data.selectGirls)
            for (let g of res.data.data.selectGirls) {
              console.log(g.su_secret)
            }
          }
        }).catch(err => {
          console.log(err.message)
        })
      }

    },
    mounted() {
      this.userinfo = JSON.parse(this.$global.getCookie('user_info'))
      this.payodata = JSON.parse(this.$global.getCookie('payo_data'))
      console.log(this.$route.query.type)
      this.getLiaoedList(this.$route.query.type)
      console.log(this.$route.query.type)
    }
  }
</script>

<style scoped lang="scss">
  .marry-container {
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
