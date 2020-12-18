<template>
  <div class="index-container" ref="indextop" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy"
    infinite-scroll-distance="10" :infinite-scroll-immediate-check="busy2">
    <div class="address">
      <div>
        <div class="iconfont icondizhi"></div>
        <p @click="showPopup">{{ userinfo.addr }}</p>
      </div>
      <div v-if="payodata.sex == 1">
        <van-dropdown-menu>
          <van-dropdown-item v-model="userinfo.order" :options="option" @change="menuChange" />
        </van-dropdown-menu>
      </div>
      <div v-if="payodata.sex == 2">
        <van-dropdown-menu>
          <van-dropdown-item v-model="vipOrder" :options="option2" @change="vipChange" />
        </van-dropdown-menu>
      </div>
      <div v-if="payodata.sex == 2">
        <van-dropdown-menu>
          <van-dropdown-item v-model="ageOrder" :options="option3" @change="ageChange" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="top">
      <div class="inp">
        <form action="javascript:true">
          <input type="search" v-model="number" :placeholder="'输入'+ cz.msg2 +'编号'" @keyup.13="findMeiMei">
        </form>
      </div>
    </div>
    <div class="middle">
      <div v-if="!myGirlsShow" class="wrap wrap2">
        <p>没有你找的{{ cz.msg2 }},看看别的{{ cz.msg2 }}吧!</p>
      </div>
      <div v-else>
        <div class="wrap" v-for="g in myGirls" :key="g.id">
          <div class="content">
            <img v-if="g.cover_image!=''" :src="g.cover_image" alt="PAYO社交" :id="'img'+g.id" @mouseenter="sweetgirl('img'+g.id)">
            <img v-else src="../assets/images/girl.jpg" alt="PAYO社交" :id="'img'+g.id" @mouseenter="sweetgirl('img'+g.id)">
            <img v-if="g.face_score=='S' && payodata.sex==1" src="http://qiniu.tecclub.cn/payo/biaoqian_s@2x.png" alt="PAYO社交">
            <img v-else-if="g.face_score=='SS' && payodata.sex==1" src="http://qiniu.tecclub.cn/payo/icon_biaoqian_ss@2x.png"
              alt="PAYO社交">
            <img v-else-if="g.face_score=='A' && payodata.sex==1" src="http://qiniu.tecclub.cn/payo/icon_biaoqian_a@2x.png"
              alt="PAYO社交">
            <img v-else-if="g.face_score=='B' && payodata.sex==1" src="http://qiniu.tecclub.cn/payo/icon_biaoqian_b@2x.png"
              alt="PAYO社交">
          </div>
          <div class="liao_btn">
            <div>
              <img v-if="g.isSignup==1" src="http://qiniu.tecclub.cn/payo/btn_signed@2x.png" alt="PAYO社交" @click="getEwm(g)">
              <img v-else src="http://qiniu.tecclub.cn/payo/btn-liaoyixia@2x.png" alt="PAYO社交" @click="tkShow(g)">
            </div>
          </div>
          <div class="info">
            <div>
              <div>
                <p>编号: {{ g.number }}{{ g.boy_number }}</p>
                {{ g.age }}岁 {{ g.weight }}kg {{ g.height }}cm
              </div>
            </div>
            <div @click="add">
              地址: {{ g.province }}-{{ g.city }}
              <p @click.nactive="toDetail(g.cover_image)">点我看大图</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="tkShow">
      <div class="wrapper">
        <div class="block" @click.stop>
          <div class="d-4">
            <div class="d-1">
              <div class="tx">
                <img src="http://51pyyy.cn/uploads/wxpayo/girl/logo-payo.png" alt="PAYO社交">
                <div class="forever">{{ this.vipinfo.vip|cutString(1) }}</div>
              </div>
              <div v-if="this.vipinfo.isYongjiu==1" class="leftchance">本月剩余: 无限制</div>
              <div v-else class="leftchance">{{ cz.msg3 }}剩余: {{ this.vipinfo.monthSignNum }}{{ this.vipinfo.daySignNum }}次</div>
              <div v-if="payodata.sex!=1" class="leftchance2">本月剩余: {{ this.vipinfo.monthSignNum }}次</div>
            </div>
            <div class="d-2">
              <p>{{ this.vipinfo.number }}</p>
              <p v-if="this.vipinfo.isYongjiu==1">会员到期时间: {{ this.vipinfo.vip }}</p>
              <p v-else-if="this.vipinfo.expireTime">会员到期时间: {{ this.vipinfo.expireTime|cutString(10) }}</p>
            </div>
            <div class="d-3" v-if="!this.vipinfo.isYongjiu || this.vipinfo.isYongjiu!=1">
              <van-button icon="http://qiniu.tecclub.cn/payo/jewel_icon@2x.png" color="#FFB929" size="small" round
                plain @click="toVip">
                {{ cz.msg1 }}
              </van-button>
            </div>
            <div class="d-3" v-else></div>
          </div>

          <div class="d-5">
            <img :src="cz.msg5" alt="PAYO社交" @click="getGirl">
            <p>{{ cz.msg4 }},有其他问题请咨询客服</p>
          </div>
        </div>
      </div>
    </van-overlay>
    <van-dialog v-model="flag" :show-confirm-button="false" close-on-click-overlay>
      <p class="diag">{{ tip }}</p>
      <van-button color="#FFB929" class="btn" @mouseenter.native="copy" ref="copyBtn" :data-clipboard-text="kouling">点击复制口令</van-button>
    </van-dialog>
    <van-popup v-model="address_show" position="bottom">
      <van-area title="省份/直辖市" :columns-placeholder="['请选择']" :area-list="areaList" @confirm="getAddress" @cancel="cancelAddress"
        columns-num="2" visible-item-count="5" />
    </van-popup>
    <img v-if="btnFlag" src="http://51pyyy.cn/uploads/wxpayo/boy/gotop.png" alt="PAYO社交" class="hddb" @click="backTop">
    <div class="footer"></div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import {
    ImagePreview
  } from 'vant'
  import Qs from 'qs'
  export default {
    inject: ['reload'],
    name: 'index',
    data() {
      return {
        myGirlsShow: true,
        signup_show: false, // 报名成功
        scrollTop: 0, // 节点滚动高度
        btnFlag: false, // 回到顶部显示
        busy: false,
        busy2: true,
        startAge: 1,  // 最小年龄数
        endAge: 1,  // 最大年龄数
        ageOrder: 1,  // 年龄默认不限
        vipOrder: 1,  // 默认非私人订制
        scrollY: 0, // 滑动高度
        toPath: '', // 目标路由
        fromPath: '', // 源路由
        page: 0, // 页数
        kouling: '', // 口令
        tip: '', // 口令提示
        show: false,
        flag: false,
        address_show: false,
        imgpreview_show: false,
        areaList: {}, // 地区列表
        option: [{
          text: '时间排序',
          value: 1
        }, {
          text: '等级排序',
          value: 2
        }],
        option2: [{
          text: '全部',
          value: 1
        }, {
          text: '私人定制',
          value: 2
        }],
        option3: [{
          text: '不限',
          value: 1
        }, {
          text: '18～22岁',
          value: 18
        }, {
          text: '23～26岁',
          value: 23
        }, {
          text: '27～30岁',
          value: 27
        }, {
          text: '30以上',
          value: 30
        }],
        cz: {
          msg1: '升级',
          msg2: '妹妹',
          msg3: '本月',
          msg4: '点击报名将扣除1次报名机会（至尊、私人不限）',
          msg5: require('@/assets/images/bm.png')
        },
        myGirls: ['111'], // 妹子信息
        g_number: 0, // 要报名的girl的number
        userinfo: {}, // Salt,province,addr,email等信息
        payodata: {}, // number,sex等信息
        vipinfo: {}, // 用户vip信息
        number: '', // 搜索的用户id
        obj: '', // 临时对象
        initStop: false, // 停止请求接口
      }
    },
    created() {
      this.userinfo = JSON.parse(this.$global.getCookie('user_info'))
      this.payodata = JSON.parse(this.$global.getCookie('payo_data'))
      if (this.payodata.sex != 1) {
        this.cz.msg1 = '咨询'
        this.cz.msg2 = '哥哥'
        this.cz.msg3 = '本日'
        this.cz.msg4 = '点击翻牌将扣除1次翻牌机会'
        this.cz.msg5 = require('@/assets/images/fp.png')
      }
    },
    mounted() {
      this.getAreaList()
      this.loadMore()
      this.getVipInfo()
      this.dealHeight()
    },
    methods: {
      add() {
        // this.$store.commit('addCount', 1)
        this.$store.dispatch('getAddCount', 1)
      },

      /**
       * 计算高度，返回不刷新
       */
      dealHeight() {
        this.$nextTick(() => {
          let indextop = this.$refs.indextop
          indextop.addEventListener('scroll', function() {
            this.scrollY = indextop.scrollTop
          }, false)

          indextop.addEventListener('scroll', this.scrollToTop)
        })
      },

      /**
       * 上拉加载
       */
      loadMore() {
        if (this.initStop) return
        this.busy = true
        this.page++
        this.init(this.page)
        this.busy = false
      },

      /**
       * 初始化数据
       * @param {Object} page(页数)
       */
      init(page) {
        var Salt = this.userinfo.Salt
        var UserNumber = this.payodata.number // 用户number
        var Sex = this.payodata.sex // 性别
        var Timestamp = Math.round(new Date() / 1000) // 时间戳
        var Token = this.$md5(UserNumber + Salt + Timestamp)

        var order = this.userinfo.order
        // var vipOrder = this.userinfo.vipOrder
        // var ageOrder = this.userinfo.ageOrder
        var number = this.number
        var path = this.payodata.sex == 2? 'boy/list':'girl/list'
        this.userinfo.province = this.userinfo.province == '100000'?  '':this.userinfo.province
        return new Promise(resolve => {
          this.$axios.get(this.$global.api + path, {
            headers: {
              UserNumber,
              Token,
              Timestamp,
              Sex
            },
            params: {
              page,
              province: this.userinfo.province,
              order,
              // vipOrder,
              // ageOrder,
              number
            }
          }).then(res => {
            page == 1 ? this.myGirls = [] : ''
            if (res.status == 200) {
              let girl_list = res.data.data.list
              if (girl_list.length > 0) {
                if(this.payodata.sex!=1 && this.startAge != 1){
                  girl_list = this.getAgeList(girl_list)
                    for (let g of girl_list) {
                      this.myGirls.push(g)
                    }
                }else{
                  for (let g of girl_list) {
                    this.myGirls.push(g)
                  }
                }
              } else {
                this.initStop = true
              }
            } else {
              alert('接口错误: ' + res.status)
            }
            resolve('success')
          }).catch(err => {
            console.log('数据获取失败')
            console.log(err)
          })
        })
      },

      /**
       * 根据年龄筛选
       * @param {array} list
       */
      getAgeList(list){
        list = list.filter(item => item.age>=this.startAge && item.age<=this.endAge )
        return list
      },

      /**
       * 搜索对象
       */
      async findMeiMei() {
        this.page = 1
        this.startAge = this.endAge = 1
        await this.init(1)
        this.myGirlsShow = this.myGirls.length == 0 ? false : true
      },

      /**
       * 去升级
       */
      toVip() {
        this.tkShow()
        if (this.payodata.sex == 1) {
          this.$dialog.confirm({
              title: '是否去升级?',
              cancelButtonText: '暂不',
              confirmButtonColor: '#FFB929'
            })
            .then(() => {
              this.$router.push({
                path: '/rise_vip'
              })
            })
            .catch(() => {

            })
          return
        }
        this.$router.push({
          path: '/rise_vip'
        })
      },

      /**
       * 点我查看详情
       */
      toDetail(imgsrc) {
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
      async getAddress(addressArr) {
        if (addressArr.length > 0) {
          var address = ''
          for (let addr of addressArr) {
            address += addr.name
          }
          var province = addressArr[0].code
          var city = addressArr[1].code
          address == '' ? address = '请选择' : ''
          this.userinfo.addr = address
          this.userinfo.province = province
          this.$global.setCookie('user_info', JSON.stringify(this.userinfo), 60 * 60 * 24 * 31)
          this.myGirls = []
          this.page = 1
          this.number = ''
          await this.init()
          this.myGirlsShow = this.myGirls.length == 0 ? false : true
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
       * 地区
       */
      getAreaList() {
        this.$axios.get(this.$global.api + 'area/index', {
          params: {},
          headers: {}
        }).then(response => {
          let areaArr = response.data.data.area
          var provinceStr = '' // 省字符串
          var cityStr = '' // 市字符串
          new Promise((resolve, reject) => {
            var province_num = 0 // 省计数
            for (let a of areaArr) {
              province_num++
              provinceStr = provinceStr + '"' + a.id + '":"' + a.title + '",'
              if (a.list.length > 0) {
                for (let c of a.list) {
                  cityStr = cityStr + '"' + c.id + '":"' + c.title + '",'
                }
              }
              if (areaArr.length == province_num) {
                provinceStr = provinceStr.substring(0, provinceStr.length - 1)
                provinceStr = '"province_list":{ "100000":"全国",' + provinceStr + '}'
                cityStr = cityStr.substring(0, cityStr.length - 1)
                cityStr = ',"city_list":{ "100100":"",' + cityStr + '}'
                var areaStr = '{' + provinceStr + cityStr + '}'
                resolve(areaStr)
              }
            }
          }).then(res => {
            var areaList = JSON.parse(res)
            this.areaList = areaList
          }).catch(err => {
            console.log(err)
          })
        }).catch(error => {
          console.log(error)
        })
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
      tkShow(g) {
        this.show = !this.show
        if (g) {
          this.obj = g
        }
      },

      /**
       * 用户会员信息
       */
      getVipInfo() {
        new Promise(resolve => {
          var Salt = this.userinfo.Salt
          var UserNumber = this.payodata.number // 用户number
          var Sex = this.payodata.sex // 性别
          var Timestamp = this.$global.timestamp // 时间戳
          var Token = this.$md5(UserNumber + Salt + Timestamp)
          var path = Sex == 1 ? 'boy/chance' : 'girl/chance'
          this.$axios.get(this.$global.api + path, {
            headers: {
              UserNumber,
              Token,
              Timestamp,
              Sex
            },
          }).then(res => {
            if (res.data.code == 200) {
              if (res.data.data.boyNumber) {
                res.data.data.number = res.data.data.boyNumber
                res.data.data.boyNumber = undefined
              }
              this.vipinfo = res.data.data
              this.$global.setCookie('vipinfo', JSON.stringify(res.data.data), 60 * 60 * 24 * 31)
            }
            resolve()
          }).catch(err => {
            console.log(err.message)
          })
        })
      },

      /**
       * 显示/隐藏复制口令弹框
       */
      getGirl() {
        this.getMeiMei()
      },

      /**
       * 撩一下
       * @param {Object} g(撩的对象)
       */
      async getMeiMei() {
        let g = this.obj
        if (this.payodata.sex != 1) {
          this.getVipInfo()
          this.g_number = g.boy_number ? g.boy_number : g.number
          this.tkShow()
          let bool = await this.getA()
          if (bool == 200) {
            let index = this.myGirls.indexOf(g)
            this.$set(this.myGirls[index], 'isSignup', 1)
          }
        } else {
          this.tkShow()
          this.getVipInfo()
          this.g_number = g.boy_number ? g.boy_number : g.number
          let bool = await this.getA()
          if (bool == 200) {
            let index = this.myGirls.indexOf(g)
            this.$set(this.myGirls[index], 'isSignup', 1)
          }
        }
      },

      getA() {
        return new Promise(resolve => {
          var number = {
            number: this.g_number
          }
          var Salt = this.userinfo.Salt
          var UserNumber = this.payodata.number // 用户number
          var Sex = this.payodata.sex // 性别
          var Timestamp = this.$global.timestamp // 时间戳
          var Token = this.$md5(UserNumber + Salt + Timestamp)
          var path = Sex == 1 ? 'signup/girl' : 'signup/boy'
          this.$axios.post(this.$global.api + path, Qs.stringify(number), {
            headers: {
              UserNumber,
              Token,
              Timestamp,
              Sex
            },
          }).then(res => {
            this.getVipInfo()
            if (res.data.code == 200) {
              if (res.data.data.clipboard_text) {
                this.tip = res.data.data.clipboard_text + '，复制口令后，联系客服，可获得匹配结果~'
                this.kouling = res.data.data.clipboard_text
                this.signup_show = true
                this.flag = !this.flag
              } else {
                if (res.data.data.weima.length > 0) {
                  ImagePreview({
                    images: [res.data.data.weima],
                    showIndex: false
                  })
                }else{
                  this.$toast('未找到二维码，请联系客服！')
                }
              }
              resolve(200)
            } else {
              this.$notify({
                type: 'warning',
                message: res.data.message
              });
              resolve(201)
            }
          }).catch(err => {
            console.log(err.message)
          })
        })
      },

      getEwm(g) {
        var params = {
          number: g.boy_number
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
      },

      /**
       * 时间或等级排序
       * @param {Object} value
       */
      async menuChange(value) {
        this.userinfo.order = value
        this.$global.setCookie('user_info', JSON.stringify(this.userinfo), 60 * 60 * 24 * 31)
        this.myGirls = []
        this.page = 1
        this.number = ''
        await this.init(1)
        this.myGirlsShow = this.myGirls.length == 0 ? false : true
      },

      /**
       * 筛选私人订制
       * @param {Object} value
       */
      vipChange(value){
        this.userinfo.vipOrder = value  // 1全部 2私人定制
        this.$global.setCookie('user_info', JSON.stringify(this.userinfo), 60 * 60 * 24 * 31)
        this.myGirls = []
        this.page = 1
        this.number = ''
        this.init(1)
      },

      /**
       * 筛选年龄
       * @param {Object} value
       */
      async ageChange(value){
        if(value == 18){
          this.startAge = value
          this.endAge = 22
        } else if(value == 23){
          this.startAge = value
          this.endAge = 26
        }else if(value == 27){
          this.startAge = value
          this.endAge = 30
        }else if(value == 30){
          this.startAge = value
          this.endAge = 100
        }else{
          this.startAge = 1
          this.endAge = 1
        }

        this.myGirls = []
        this.page = 1
        this.number = ''
        await this.init(1)
        this.myGirlsShow = this.myGirls.length == 0 ? false : true
      },

      // 点击回到顶部，加计时器是为了过渡顺滑
      backTop() {
        let indextop = this.$refs.indextop
        let timer = setInterval(() => {
          let ispeed = Math.floor(-this.scrollTop / 5)
          indextop.scrollTop = this.scrollTop + ispeed
          if (this.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于700显示回顶部图标
      scrollToTop() {
        let scrollTop = this.$refs.indextop.scrollTop
        this.scrollTop = scrollTop
        if (this.scrollTop > 700) {
          this.btnFlag = true
        } else {
          this.btnFlag = false
        }
      }

    },
    beforeRouteLeave(to, from, next) {
      this.scrollY = document.querySelector('.index-container').scrollTop
      next()
    },
    destroyed() {
      let indextop = this.$refs.indextop
      indextop.removeEventListener('scroll', this.scrollToTop)
      this.$store.dispatch('settings/addKeepAlivePage', 'index')
    },
    activated() {
      document.querySelector('.index-container').scrollTop = this.scrollY
      if (localStorage.getItem('login') == '/login') {
        localStorage.removeItem('login')
        location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">
  .hddb {
    position: fixed;
    bottom: 80px;
    right: 0;
    width: 5rem;
  }

  .index-container {
    height: 94vh;
    overflow-y: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
    overflow-y: scroll;

    .address {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 92%;
      margin: auto;
      font-size: 1rem;
      padding: 0.5rem 0 0;
      letter-spacing: .1rem;
      &>div:nth-child(1){
        width: 38%;
      }
      &>div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32%;

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

        p{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
      padding-top: 2vw;

      .wrap2 {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        letter-spacing: 3px;
        text-align: center;
      }

      .wrap {
        width: 94%;
        margin: 2vw auto 4vw;
        background: white;
        padding: 2vw 2vw 0;
        height: 108vw;
        border-radius: 0.5rem;

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
              background: #FFB929;
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

          .leftchance2 {
            position: absolute;
            top: 10vw;
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
          padding: 0 7vw 3vw;
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

  /deep/ .van-dropdown-menu__title::after {
    border-color: transparent transparent #323233 #323233;
  }

  /deep/ .van-dropdown-menu__title--active::after {
    border-color: transparent transparent #FFB929 #FFB929;
  }
</style>
