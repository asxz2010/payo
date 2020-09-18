<template>
  <div class="index-container">
    <div class="address">
      <div>
        <div class="iconfont icondizhi"></div>
        <p @click="showPopup">{{ address }}</p>
      </div>
      <div>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="top">
      <div class="inp">
        <input type="number" placeholder="输入妹子编号" @keyup.13="findMeiMei">
      </div>
    </div>
    <div class="middle">
      <scroller :on-infinite="infinite" ref="indexscroller">
        <div class="wrap" v-for="g in myGirls" :key="g.id">
          <div class="content">
            <img :src="g.cover_image" alt="PAYO社交" :id="'img'+g.id" @mouseenter="sweetgirl('img'+g.id)">
            <img v-if="g.face_score=='S'" src="http://qiniu.tecclub.cn/payo/biaoqian_s@2x.png" alt="PAYO社交">
            <img v-else-if="g.face_score=='SS'" src="http://qiniu.tecclub.cn/payo/icon_biaoqian_ss@2x.png" alt="PAYO社交">
            <img v-else-if="g.face_score=='A'" src="http://qiniu.tecclub.cn/payo/icon_biaoqian_a@2x.png" alt="PAYO社交">
            <img v-else src="http://qiniu.tecclub.cn/payo/icon_biaoqian_b@2x.png" alt="PAYO社交">
          </div>
          <div class="liao_btn">
            <div>
              <img src="http://qiniu.tecclub.cn/payo/btn-liaoyixia@2x.png" alt="PAYO社交" @click="getMeiMei">
              <!-- <img src="http://qiniu.tecclub.cn/payo/btn_signed@2x.png" alt="PAYO社交" > -->
            </div>
          </div>
          <div class="info">
            <div>
              <div>
                <p>编号: {{ g.number }}</p>
                {{ g.age }}岁 {{ g.weight }}kg {{ g.height }}cm
              </div>
            </div>
            <div>
              地址: {{ g.province }}-{{ g.city }}
              <p @click="toDetail(g.cover_image)">点我看详情</p>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <van-overlay :show="show" @click="getMeiMei">
      <div class="wrapper">
        <div class="block" @click.stop>
          <div class="d-4">
            <div class="d-1">
              <div class="tx">
                <img src="http://51pyyy.cn/uploads/wxpayo/girl/logo-payo.png" alt="PAYO社交">
                <div class="forever">永</div>
              </div>
              <div class="leftchance">本月剩余: 3次</div>
            </div>
            <div class="d-2">
              <p>10548</p>
              <p>会员到期时间: 永久</p>
            </div>
            <div class="d-3">
              <van-button icon="http://qiniu.tecclub.cn/payo/jewel_icon@2x.png" color="#FFB929" size="small" round
                plain @click="toVip">
                升级
              </van-button>
            </div>
          </div>

          <div class="d-5">
            <img src="http://qiniu.tecclub.cn/payo/btn_baoming@2x.png" alt="PAYO社交" @click="getGirl">
            <p>点击报名将扣除1次报名机会（至尊、私人不限）有其他问题请咨询客服</p>
          </div>
        </div>
      </div>
    </van-overlay>
    <van-dialog v-model="flag" :show-confirm-button="false" close-on-click-overlay>
      <p class="diag">{{ koulin }}</p>
      <van-button color="#FFB929" class="btn" @mouseenter.native="copy" ref="copyBtn" :data-clipboard-text="koulin">点击复制口令</van-button>
    </van-dialog>
    <van-popup v-model="address_show" position="bottom">
      <van-area title="省份/直辖市" :columns-placeholder="['请选择']" :area-list="areaList" @confirm="getAddress" @cancel="cancelAddress"
        columns-num="1" visible-item-count="5" />
    </van-popup>
    <div class="footer"></div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import Qs from 'qs'
  import area from '@/assets/js/area.js'
  export default {
    data() {
      return {
        page: 0, // 页数
        address: '请选择地区',
        koulin: '七夕七夕',
        show: false,
        flag: false,
        address_show: false,
        imgpreview_show: false,
        value1: 0,
        value2: 'a',
        areaList: area,
        myid: 1340,
        option: [{
            text: '等级排序',
            value: 0
          },
          {
            text: '时间排序',
            value: 1
          }
        ],
        myGirls: []
      }
    },
    created() {
      // this.init(this.page)
    },
    methods: {
      init(page) {
        this.address = localStorage.getItem('address')
        var Salt = '51payo'
        var UserNumber = '10548' // 用户number
        var Timestamp = Math.round(new Date() / 1000) // 时间戳
        var Sex = '1' // 性别
        var Token = this.$md5(UserNumber + Salt + Timestamp)
        var payodata = JSON.parse(this.$global.getCookie('payo_data'))
        var userinfo = JSON.parse(this.$global.getCookie('user_info'))
        var path = 'girl/list'
        if (payodata.sex == 2) {
          path = 'boy/list'
        }
        this.$axios.get(this.$global.api + 'girl/list', {
          headers: {
            UserNumber,
            Token,
            Timestamp,
            Sex
          },
          params: {
            page,
            province: userinfo.province
          }
        }).then(res => {
          console.log('数据获取成功')
          console.log(res.data.data.list)
          if (res.status == 200) {
            let girl_list = res.data.data.list
            if (girl_list.length > 0) {
              for (let g of girl_list) {
                this.myGirls.push(g)
              }
            }
          } else {
            alert('接口错误: ' + res.status)
          }
        }).catch(err => {
          console.log('数据获取失败')
          console.log(err)
        })
      },

      /**
       * 上拉加载
       */
      infinite() {
        new Promise((resolve, reject) => {
          this.page++
          this.init(this.page)
          resolve('success')
        }).then(res => {
          this.$refs.indexscroller.finishInfinite(true)
        })
      },

      /**
       * 搜索妹妹
       */
      findMeiMei() {
        alert('找到了一个妹妹')
      },

      /**
       * 去升级
       */
      toVip() {
        this.getMeiMei()
        this.$dialog.confirm({
            title: '升级',
            message: '是否去升级?',
            confirmButtonText: '去升级',
            cancelButtonText: '暂不'
          })
          .then(() => {
            this.$router.push({
              path: '/rise_vip'
            })
          })
          .catch(() => {

          })
      },

      /**
       * 点我查看详情
       */
      toDetail(imgsrc) {
        // console.log(imgsrc)
        this.$router.push({
          path: '/detail',
          query: {
            imgsrc
          }
        })
      },

      /**
       * 获取地区
       * @param {Array} addressArr (地址)
       */
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

      /**
       * 取消选择地区
       */
      cancelAddress() {
        this.showPopup()
      },

      /**
       * 显示/隐藏地区
       */
      showPopup() {
        this.address_show = !this.address_show
      },

      /**
       * 图片预览
       * @param {number} id (图片id)
       */
      sweetgirl(id) {
        const viewer = new Viewer(document.getElementById(id), {
          navbar: false,
          toolbar: false,
          button: false,
          title: false
        })
      },

      /**
       * 显示/隐藏撩一下弹框
       */
      getMeiMei() {
        this.show = !this.show
      },

      /**
       * 显示/隐藏复制口令弹框
       */
      getGirl() {
        this.getMeiMei()
        this.flag = !this.flag
      },

      /**
       * 点击复制口令
       */
      copy() {
        const clipboard = new this.$clipboard(this.$refs.copyBtn)
        clipboard.on('success', () => {
          this.$notify({
            message: '复制成功',
            background: '#07C160',
            color: 'white',
            duration: 1500
          })
          this.flag = false
          clipboard.destroy()
        })
        clipboard.on('error', () => {
          this.$notify({
            message: '复制失败',
            background: '#FF976A',
            color: 'white',
            duration: 1500
          })
          this.flag = false
          clipboard.destroy()
        })
      }

    }
  }
</script>

<style scoped lang="scss">
  .index-container {
    .address {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 92%;
      margin: auto;
      font-size: 1rem;
      padding: 0.5rem 0 0;
      letter-spacing: .1rem;

      &>div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        div:focus {
          outline-color: red !important;
        }

        .iconfont {
          margin-right: .3rem;
          color: #FFB929;
          font-weight: bold;
        }

        .iconshuaxinzhongjieban {
          font-size: .6rem;
        }
      }
    }

    .top {
      height: 6vh;
      width: 92%;
      margin: auto;
      display: flex;
      align-items: center;

      .inp {
        width: 100%;

        input {
          width: 100%;
          padding: .6rem 1rem;
          text-align: center;
          background: white;
          border-radius: 4rem;
          border: 0;
          outline: none;
        }

        input::-webkit-input-placeholder {
          letter-spacing: .1rem;
          text-align: center;
          color: #ccc;
          font-weight: bold;
          font-size: .9rem;
        }

        input::-moz-input-placeholder {
          letter-spacing: .1rem;
          text-align: center;
          color: #ccc;
          font-weight: bold;
          font-size: .9rem;
        }

        input::-ms-input-placeholder {
          letter-spacing: .1rem;
          text-align: center;
          color: #ccc;
          font-weight: bold;
          font-size: .9rem;
        }
      }
    }

    .middle {
      position: relative;
      height: 80vh;
      margin-top: 2vw;

      .wrap {
        width: 94%;
        margin: 0 auto 4vw;
        background: white;
        padding: 2vw 2vw 0;
        height: 108vw;
        border-radius: 0.5rem;

        &:last-of-type {
          margin-bottom: 6rem !important;
        }

        .content {
          height: 72%;
          overflow: hidden;
          position: relative;

          &>img:nth-child(1) {
            width: 100%;
            height: auto;
            position: absolute;
            top: -39vw;
          }

          &>img:nth-child(2) {
            position: absolute;
            width: 5rem;
          }


        }

        .liao_btn {
          position: relative;
          width: 100%;
          height: 9%;

          &>div {
            width: 100%;
            position: absolute;
            top: -2rem;

            img {
              width: 60%;
              display: block;
              margin: auto;
            }
          }
        }

        .info {
          height: 17%;
          font-size: 1rem;
          color: #666;


          &>div {
            margin: .4rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &>div {
              display: flex;
              padding: .2rem 0;

              p {
                color: #333;
                margin-right: 2rem;
              }
            }

            &>p {
              padding: 0.1rem .5rem;
              border-radius: 0.6rem;
              color: white;
              font-size: .7rem;
              letter-spacing: .1rem;
              background: #EB3E3F;
            }
          }

          &>div:nth-child(1) {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }

    .footer {
      width: 100%;
      height: 3rem;
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;

    .block {
      width: 80%;
      min-height: 70vw;
      background-color: #fff;
      border-radius: 1rem;

      .d-4 {
        background: url(http://qiniu.tecclub.cn/payo/bg_modals@2x.png) no-repeat;
        background-size: cover;
        font-size: .9rem;
        letter-spacing: 1px;

        .d-1 {
          position: relative;

          .tx {
            width: 14vw;
            height: 16vw;
            position: absolute;
            left: 50%;
            margin-left: -7vw;
            top: -7vw;

            img {
              width: 100%;
              display: block;
              border-radius: 50%;
              padding: 2px;
              background: white;
            }

            .forever {
              position: absolute;
              bottom: 0;
              right: 0;
              color: white;
              background: #FFB929;
              border-radius: 50%;
              font-size: .9rem;
              width: 1.3rem;
              height: 1.3rem;
              text-align: center;
            }
          }

          .leftchance {
            position: absolute;
            top: 3vw;
            right: -1vw;
            background: #222;
            color: #ccc;
            padding: 1vw 2vw;
            font-size: 0.8rem;
            border-top-left-radius: 30vw;
            border-bottom-left-radius: 30vw;
          }
        }

        .d-2 {
          padding-top: 9vw;
          text-align: center;

          p {
            padding-top: 3vw;
          }
        }

        .d-3 {
          display: flex;
          justify-content: center;
          padding: 4vw 0;
        }
      }

      .d-5 {
        &>img {
          display: block;
          margin: 3vw auto;
          width: 70%;
        }

        p {
          color: #999;
          font-size: 0.8rem;
          padding: 0 7vw;
          text-align: center;
          letter-spacing: 1px;
        }
      }

    }
  }


  .diag {
    padding: 2rem 1rem;
    letter-spacing: 1px;
    text-align: center;
    font-size: .9rem;
  }

  .btn {
    margin: auto;
    display: block;
    width: 100%;
  }

  /deep/ .van-button__content {
    justify-content: center;
  }

  /deep/ ._v-content {
    padding-bottom: 15vh;
  }

  /deep/ .el-radio__label {
    font-size: 1rem;
  }

  /deep/ .el-cascader {
    width: 10rem;
  }

  /deep/ .el-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-input__inner {
    background: transparent;
    border: 0;
    padding: 0;
    color: black;
  }

  /deep/ .el-input__inner::-webkit-input-placeholder {
    letter-spacing: .1rem;
    color: black;
    font-size: .8rem;
  }

  /deep/ .el-input__inner::-moz-input-placeholder {
    letter-spacing: .1rem;
    color: black;
    font-size: .8rem;
  }

  /deep/ .el-input__inner::-ms-input-placeholder {
    letter-spacing: .1rem;
    color: black;
    font-size: .8rem;
  }


  /deep/ .van-dropdown-menu:focus {
    border: red !important;
  }

  /deep/ .van-dropdown-menu__bar:focus {
    border: red !important;
  }

  /deep/ .van-dropdown-menu__item:focus {
    border: red !important;
  }

  /deep/ .van-dropdown-menu__bar {
    background-color: transparent !important;
    box-shadow: none;
  }

  /deep/ .van-dropdown-menu__title--active {
    color: #FFB929;
  }

  /deep/ .van-dropdown-item__option--active {
    color: #FFB929;
  }

  /deep/ .van-dropdown-item__icon {
    color: #FFB929;
  }

  /deep/ .van-popup--top {
    // left: 50%;
  }

  /deep/ .van-button--plain {
    background-color: transparent;
  }

  /deep/ .van-button__content {
    display: flex;
    align-items: center;
  }

  /deep/ .van-icon__image {
    width: 1rem;
    margin-right: 0.3rem;
  }

  /deep/ .van-button {
    padding: 0 1rem !important;
  }

  /deep/ .van-picker__toolbar button {
    border: none;
    background: white;
  }

  /deep/ .van-image__img {
    width: 100vw;
    height: 100vh;
    position: fixed;
  }
</style>
