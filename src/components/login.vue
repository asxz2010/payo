<template>
  <div class="login-container" :style="{height: html_height+'px'}">
    <div class="wrap">
      <img src="http://qiniu.tecclub.cn/payo/payou@5x@2x.png" alt="啪友社交">
      <ul>
        <li>
          <p @click="showPopup">{{ address }}</p>
        </li>
        <li>
          <input type="text" v-model="id" placeholder="个人编号">
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
  import area from '@/assets/js/area.js'
  import {
    Toast
  } from 'vant'
  export default {
    name: 'app',
    data() {
      return {
        address: '所在地区', // 地址
        id: '', // 个人编号
        sex: '1', // 男1 女2
        email: '', // 邮箱
        areaList: area,
        address_show: false,
        html_height: 0,
      };
    },
    created() {
      this.html_height = this.$global.html_height
    },
    methods: {
      getAddress(addressArr) {
        if (addressArr.length > 0) {
          var address = ''
          for (let addr of addressArr) {
            address += addr.name
          }
          address == '' ? address = '请选择' : ''
          this.address = address
        }
        this.showPopup()
      },
      cancelAddress() {
        this.showPopup()
      },
      showPopup() {
        this.address_show = !this.address_show
      },
      login() {
        var message
        if (this.address === '所在地区' || this.address === '') {
          message = '请选择地区'
        } else if (this.id.split(" ").join('').length === 0 || this.address === '') {
          message = '请填写个人编号'
        } else if (!this.$global.check_email.test(this.email)) {
          message = '邮箱格式有误或为空'
        } else {
          Toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration: 1000
          })
          setTimeout(() => {
            var username = {
              id: 1,
              name: '小三',
              age: 1,
            }
            var username = JSON.stringify(username)
            this.$global.setCookie('username', username, 60 * 60)
            Toast.success({
              message: '登录成功',
              duration: 1000
            })
            setTimeout(() => {
              this.$router.push('/index')
            }, 1000)
          }, 1000)

          return
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
          // height: 3rem;
          font-size: 1.2rem;
          // padding: 1rem 0 1rem 1rem;
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
