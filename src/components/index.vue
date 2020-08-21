<template>
  <div class="index-container">
    <div class="address">
      <div>
        <div class="iconfont icondizhi"></div>
        <!-- <p>南京市-江苏省</p> -->
        <el-cascader :options="options2" @active-item-change="handleItemChange" v-model="address"></el-cascader>
      </div>
      <div>
        <div class="iconfont iconshuaxinzhongjieban"></div>
        <p>等级</p>
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
            <img :src="g.imgsrc" alt="">
          </div>
          <div class="liao_btn">
            <div>
              <img src="http://qiniu.tecclub.cn/payo/btn-liaoyixia@2x.png" alt="">
            </div>
          </div>
          <div class="info">
            <div>
              <div>编号: {{ g.id }} {{ g.age }}岁 {{ g.weight }}kg {{ g.height }}cm</div>
              <div>
                <p>详情</p>
                <div class="iconfont iconxiangyou"></div>
              </div>
            </div>
            <div>地址: {{ g.address }}</div>
          </div>
        </div>
      </scroller>

    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        console.log(222222222)
        setTimeout(() => {
          that.$refs.indexscroller.finishInfinite(true);
        }, 1000)
      },
      handleItemChange(val) {
        console.log('active item:', val);
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
        margin: 0.5rem auto 1rem;
        background: white;
        padding: 1rem 0.5rem 0;
        height: 59vh;

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
            top: -23vh;
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
          font-size: .9rem;
          margin-top: 1vh;

          &>div {
            margin: .4rem 0;
          }

          &>div:nth-child(1) {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &>div:nth-child(2) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: orange;
              font-size: .8rem;

              p {
                margin-right: .2rem;
              }

              .iconfont {
                font-size: .7rem;
                font-weight: bold;
              }
            }
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
</style>
