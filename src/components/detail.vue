<template>
  <div class="rise-container" :style="{height: html_height+'px'}">
    <div>
      <img :src="imgsrc" alt="PAYO社交">
      <div class="wrap">
        <p class="dp1" @click="goBack">返回</p>
        <p v-if="payodata.sex != 1" class="dp1" @click="getEwm">查看二维码</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import {
    ImagePreview
  } from 'vant'
  const route_LEV = {
    '/login': 0,
    '/index': 1,
    '/mine': 2,
    '/info': 3,
    '/marry': 3,
    '/rise_vip': 3,
    '/detail': 3,
    '/error': 3,
  }
  export default {
    data() {
      return {
        LEVEL: route_LEV,
        html_height: 0,
        imgsrc: '' ,// 图片url
        obj: {},
        payodata: {}
      }
    },
    created() {
      this.html_height = this.$global.html_height
      this.imgsrc = this.$route.query.imgsrc
      this.obj = this.$route.query.obj
      this.userinfo = JSON.parse(this.$global.getCookie('user_info'))
      this.payodata = JSON.parse(this.$global.getCookie('payo_data'))
      document.title = this.payodata.sex == 1 ? '妹妹资料' : '哥哥资料'
      console.log(this.obj)
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },

      getEwm() {
        let number = this.payodata.sex == 1? this.obj.su_bid:this.obj.su_bid
        var params = {
          number
        }
        var Salt = this.userinfo.Salt
        var UserNumber = this.payodata.number // 用户number
        var Sex = this.payodata.sex // 性别
        var Timestamp = this.$global.timestamp // 时间戳
        var Token = this.$md5(UserNumber + Salt + Timestamp)
        this.$axios.get(this.$global.api + 'boy/ewm', {
          params,
          headers: {
            UserNumber,
            Token,
            Timestamp,
            Sex
          },
        }).then(res => {
          console.log(res)
          if (res.data.code == 200) {
            if (res.data.data.weima.length > 0) {
              ImagePreview({
                images: [res.data.data.weima],
                showIndex: false
              })
              return
            }
          }
          this.$toast('未找到二维码，请联系客服！')

        }).catch(err => {
          console.log(err.message)
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .rise-container {
    width: 100%;
    background: #F5BC4B;
    display: flex;
    justify-content: center;
    align-items: center;

    &>div {
      width: 90%;
      background: white;
      border-radius: 1rem;
      padding-bottom: 3vh;


      img {
        width: 80%;
        margin: 3vh auto;
        display: block;
      }

      .wrap {
        display: flex;
        justify-content: space-evenly;
        .dp1 {
          text-align: center;
          letter-spacing: 1px;
          border: 1px solid #FFB928;
          border-radius: 1rem;
          color: #FFB928;
          padding: 0.6rem 1rem;
        }
      }
    }
  }
</style>
