<template>
  <div class="login-container" :style="{height: html_height+'px'}">
    <div class="wrap">
      <img src="http://qiniu.tecclub.cn/payo/payou@5x@2x.png" alt="啪友社交">
      <ul>
        <li>
          <p @click="showPopup">{{ address }}</p>
        </li>
        <li>
          <input type="text" v-model="usernumber" placeholder="个人编号">
        </li>
        <li class="l-radio">
          <el-radio v-model="sex" label="1">男</el-radio>
          <el-radio v-model="sex" label="2">女</el-radio>
        </li>
        <li>
          <input type="email" v-model="email" placeholder="邮箱 (请认真填写,方便找回)">
        </li>
      </ul>
      <div class="btn" @click="login">
        <img src="http://qiniu.tecclub.cn/payo/btn_yuehui@2x.png" alt="开始约会">
      </div>
      <div class="contact">
        <div>
          <div class="line right"></div>
        </div>
        <div>
          <a href="" class="link">获取payo编号</a>
        </div>
        <div>
          <div class="line"></div>
        </div>
        <div></div>
      </div>
    </div>
    <van-popup v-model="address_show" position="bottom">
      <van-area title="省份/直辖市" :columns-placeholder="['请选择']" :area-list="areaList" @confirm="getAddress" @cancel="cancelAddress"
        columns-num="1" visible-item-count="5" />
    </van-popup>
  </div>
</template>

<script>
  import Qs from 'qs'
  import {
    Toast
  } from 'vant'
  export default {
    name: 'app',
    data() {
      return {
        address: '所在地区', // 地址
        province: 0, // 地区code
        usernumber: '', // 个人编号
        sex: '1', // 男1 女2
        email: '', // 邮箱
        areaList: {},
        address_show: false,
        html_height: 0,
      };
    },
    created() {
      this.html_height = this.$global.html_height
    },
    mounted() {
      this.init()
    },
    methods: {
      getAddress(addressArr) {
        if (addressArr.length > 0) {
          var address = ''
          var province = 0
          for (let addr of addressArr) {
            address += addr.name
            province = addr.code
          }
          address == '' ? address = '请选择' : '',
            this.address = address
          this.province = province
        }
        this.showPopup()
      },
      cancelAddress() {
        this.showPopup()
      },
      showPopup() {
        this.address_show = !this.address_show
      },
      init() {
        this.$axios.get(this.$global.api + 'area/index', {
          params: {},
          headers: {}
        }).then(response => {
          let areaArr = response.data.data.area
          var provinceStr = '' // 省字符串
          var province_list
          // var cityStr = '' // 市字符串
          // var city_list
          new Promise((resolve, reject) => {
            var province_num = 0 // 省计数
            for (let a of areaArr) {
              province_num++
              provinceStr = provinceStr + '"' + a.id + '":"' + a.title + '",'
              // if (a.list.length > 0) {
              //   for (let c of a.list) {
              //     cityStr = cityStr + '"' + c.id + '":"' + c.title + '",'
              //   }
              // }
              if (areaArr.length == province_num) {
                provinceStr = provinceStr.substring(0, provinceStr.length - 1)
                provinceStr = '"province_list":{' + provinceStr + '}'
                // cityStr = cityStr.substring(0, cityStr.length - 1)
                // cityStr = '"city_list":{' + cityStr + '}'
                var areaStr = provinceStr
                resolve(areaStr)
              }
            }
          }).then(res => {
            var areaStr = '{' + res + '}'
            var areaList = JSON.parse(areaStr)
            console.log(areaList)
            this.areaList = areaList
          }).catch(err => {
            console.log(err)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      login() {
        var message
        if (this.address === '所在地区' || this.address === '') {
          message = '请选择地区'
        } else if (this.usernumber.split(" ").join('').length === 0 || this.address === '') {
          message = '请填写个人编号'
        } else if (!this.$global.check_email.test(this.email)) {
          message = '邮箱格式有误或为空'
        } else {
          Toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration: 1000
          })
          var Salt = '51payo'
          var UserNumber = this.usernumber // 用户number 10548
          var Sex = this.sex // 性别
          var Timestamp = Math.round(new Date() / 1000) // 时间戳
          var Token = this.$md5(UserNumber + Salt + Timestamp)

          var province = this.province // 省份code
          var sex = this.sex // 性别
          var city = '320100' // 城市code
          var number = this.usernumber // 用户number
          var email = this.email
          let data = {
            sex,
            city,
            province,
            number,
            email
          }
          this.$axios.post(this.$global.api + 'login', Qs.stringify(data), {
            headers: {
              'UserNumber': UserNumber,
              'Token': Token,
              'Timestamp': Timestamp,
              'Sex': Sex
            }
          }).then(res => {
              if (res.data.code == 200) {
                var data = JSON.stringify(res.data.data)
                var userinfo = JSON.stringify({
                  addr: this.address,
                  province,
                  email,
                  Salt
                })
              this.$global.setCookie('payo_data', data, 60 * 60 * 24)
              this.$global.setCookie('user_info', userinfo, 60 * 60 * 24)
              Toast.success({
                message: '登录成功',
                duration: 1000
              })
              setTimeout(() => {
                this.$router.push('/index')
              }, 1000)
            } else {
              Toast.fail({
                message: res.data.code,
                duration: 1000
              })
            }
          }).catch(err => {
          console.log(err)
        })
      }
      this.$notify({
        message,
        background: '#FF976A',
        color: 'white',
        duration: 1500
      })
    }

  }
  }
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    background: url(http://qiniu.tecclub.cn/payo/BG-login@2x.png) no-repeat;
    background-size: cover;
    overflow: hidden;

    .wrap {
      width: 80%;
      margin: 20vw auto 0;
      font-size: 1rem;
      letter-spacing: .2rem;

      img {
        width: 70vw;
        margin: auto;
        display: block;
      }

      ul {
        margin: 2rem 0 3rem;
        padding: 0;

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 16vw;
          border-bottom: 1px solid #999;

          p {
            color: white;
            padding-left: 1rem;
            width: 100%;
          }

          .iconfont {
            color: white;
          }

          input {
            width: 80%;
            background: transparent;
            border: none;
            color: white;
            padding-left: 1rem;
            outline: none;
            font-size: 1.2rem;
          }

          input::-webkit-input-placeholder {
            letter-spacing: .1rem;
            color: white;
            font-size: 1rem;
          }

          input::-moz-input-placeholder {
            letter-spacing: .1rem;
            color: white;
            font-size: 1rem;
          }

          input::-ms-input-placeholder {
            letter-spacing: .1rem;
            color: white;
            font-size: 1rem;
          }
        }

        .l-radio {
          justify-content: flex-start;
          padding-left: 1rem;
          font-size: 1.2rem;
        }
      }

      .btn {
        width: 100%;

        img {
          width: 100%;
        }
      }

      .contact {
        display: flex;
        align-items: center;
        text-align: center;
        margin-top: 1rem;

        &>div:nth-child(1),
        &>div:nth-child(2),
        &>div:nth-child(3) {
          flex: 1;
        }

        &>div:nth-child(3) {
          clear: both;
        }

        .line {
          height: 1px;
          width: 50%;
          background: #FFB929;
        }

        .right {
          float: right;
        }

        .link {
          color: #FFB929;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 1px;
        }
      }
    }
  }

  /deep/ .el-radio__label {
    font-size: 1rem;
  }

  .el-cascader {
    width: 100%;
  }

  /deep/ .el-radio {
    color: white;
  }

  /deep/ .el-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-input__inner {
    background: transparent;
    border: 0;
    color: white;
  }

  /deep/ .el-input__inner::-webkit-input-placeholder {
    letter-spacing: .1rem;
    color: white;
    font-size: 1rem;
  }

  /deep/ .el-input__inner::-moz-input-placeholder {
    letter-spacing: .1rem;
    color: white;
    font-size: 1rem;
  }

  /deep/ .el-input__inner::-ms-input-placeholder {
    letter-spacing: .1rem;
    color: white;
    font-size: 1rem;
  }

  /deep/ .van-picker__toolbar button {
    border: none;
    background: white;
  }
</style>
