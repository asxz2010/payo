<template>
  <div class="index-container">
    <div class="address">
      <div>
        <div class="iconfont icondizhi"></div>
        <!-- <p>南京市-江苏省</p> -->
        <el-cascader :options="options2" @active-item-change="handleItemChange" v-model="address"></el-cascader>
      </div>
      <div>
        <!-- <div class="iconfont iconshuaxinzhongjieban"></div>
        <p>等级</p> -->
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="top">
      <div class="inp">
        <input type="number" name="" placeholder="输入妹子号码">
      </div>
    </div>
    <div class="middle">
      <scroller :on-infinite="infinite" ref="indexscroller">
        <div class="wrap" v-for="g in myGirls" :key="g.id">
          <div class="content">
            <img :src="g.imgsrc" alt="" @click="sweetgirl">
          </div>
          <div class="liao_btn">
            <div>
              <img src="http://qiniu.tecclub.cn/payo/btn-liaoyixia@2x.png" alt="" @click="getMeiMei">
            </div>
          </div>
          <div class="info">
            <div>
              <div>
                <p>编号: {{ g.id }}</p>
                {{ g.age }}岁 {{ g.weight }}kg {{ g.height }}cm
              </div>
            </div>
            <div>
              地址: {{ g.address }}
              <p>点我看详情</p>
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
              <div>
                <img src="http://51pyyy.cn/uploads/wxpayo/girl/logo-payo.png" alt="">
                <div>永</div>
              </div>
            </div>
            <div class="d-2">
              <p>10548</p>
              <p>会员到期时间: 永久</p>
            </div>
            <div class="d-3">
              <van-button icon="http://qiniu.tecclub.cn/payo/jewel_icon@2x.png" color="#FFB929" size="small" round
                plain>
                升级
              </van-button>
            </div>
          </div>

          <div class="d-5">
            <img src="http://qiniu.tecclub.cn/payo/btn_baoming@2x.png" alt="">
            <p>点击报名将扣除1次报名机会（至尊、私人不限）有其他问题请咨询客服</p>
          </div>
        </div>
      </div>
    </van-overlay>
    <div class="footer"></div>
  </div>
</template>

<script>
  import {
    ImagePreview
  } from 'vant';
  export default {
    data() {
      return {
        show: false,
        value1: 0,
        value2: 'a',
        option: [{
            text: '等级排序',
            value: 0
          },
          {
            text: '时间排序',
            value: 1
          }
        ],
        address: ['江苏', '连云港'],
        myGirls: [{
            id: 1337,
            imgsrc: 'http://qiniu.tecclub.cn/2020/08/11/15971360865f325cd61389a.jpg',
            age: 28,
            weight: 150,
            height: 160,
            address: '浙江省-杭州市'
          },
          {
            id: 1338,
            imgsrc: 'http://qiniu.tecclub.cn/2020/08/11/15971360865f325cd61389a.jpg',
            age: 28,
            weight: 150,
            height: 160,
            address: '浙江省-杭州市'
          },
          {
            id: 1339,
            imgsrc: 'http://qiniu.tecclub.cn/2020/08/11/15971360865f325cd61389a.jpg',
            age: 28,
            weight: 150,
            height: 160,
            address: '浙江省-杭州市'
          },
          {
            id: 1340,
            imgsrc: 'http://qiniu.tecclub.cn/2020/08/11/15971360865f325cd61389a.jpg',
            age: 28,
            weight: 150,
            height: 160,
            address: '浙江省-杭州市'
          },
          {
            id: 1341,
            imgsrc: 'http://qiniu.tecclub.cn/2020/08/11/15971360865f325cd61389a.jpg',
            age: 28,
            weight: 150,
            height: 160,
            address: '浙江省-杭州市'
          },
        ],
        options2: [{
          value: '江苏',
          label: '江苏',
          children: [{
              value: '南京',
              label: '南京'
            },
            {
              value: '扬州',
              label: '扬州'
            },
            {
              value: '连云港',
              label: '连云港'
            }
          ]
        }, {
          label: '浙江',
          children: []
        }],
        // props: {
        //   value: 'label',
        //   children: 'cities'
        // }
      }
    },
    methods: {
      infinite() {
        let that = this
        setTimeout(() => {
          that.$refs.indexscroller.finishInfinite(true);
        }, 1000)
      },
      handleItemChange(val) {
        console.log('active item:', val);
      },
      sweetgirl() {
        console.log(111111)
        ImagePreview(['http://qiniu.tecclub.cn/2020/08/11/15971360865f325cd61389a.jpg'])
      },
      getMeiMei() {
        this.show = !this.show
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
      font-size: .8rem;
      padding: .5rem 0;
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
        }

        .iconshuaxinzhongjieban {
          font-size: .6rem;
        }
      }
    }

    .top {
      height: 3rem;
      width: 92%;
      margin: auto;
      display: flex;
      align-items: center;

      .inp {
        width: 100%;

        input {
          width: 100%;
          padding: .6rem 1rem;
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
          font-size: 1rem;
        }

        input::-moz-input-placeholder {
          letter-spacing: .1rem;
          text-align: center;
          color: #ccc;
          font-weight: bold;
          font-size: 1rem;
        }

        input::-ms-input-placeholder {
          letter-spacing: .1rem;
          text-align: center;
          color: #ccc;
          font-weight: bold;
          font-size: 1rem;
        }
      }
    }

    .middle {
      .wrap {
        width: 94%;
        margin: 2vw auto 4vw;
        background: white;
        padding: 2vw 2vw 0;
        height: 108vw;

        &:last-of-type {
          margin-bottom: 6rem !important;
        }

        .content {
          height: 72%;
          overflow: hidden;
          position: relative;

          &>img {
            width: 100%;
            height: auto;
            position: absolute;
            top: -39vw;
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



  /deep/ ._v-container {
    position: relative;
  }

  /deep/ .el-radio__label {
    font-size: 1rem;
  }

  .el-cascader {
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



  /deep/ .van-image-preview__index {
    color: red !important;
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

  // /deep/.van-image{
  //   display: flex !important;
  //   justify-content: center !important;
  // }

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
        margin-top: 3vw;
        font-size: .9rem;
        letter-spacing: 1px;

        .d-1 {
          position: relative;

          &>div {
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
            }

            div {
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
</style>
