<template>
  <div class="login-container" :style="{height: html_height+'px'}">
    <div class="wrap">
      <img src="http://qiniu.tecclub.cn/payo/payou@5x@2x.png" alt="啪友社交">
      <ul>
        <li>
          <!-- <input type="text" placeholder="所在地区"> -->
          <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props"></el-cascader>
          </el-cascader>
          <!-- <div class="iconfont iconxiangxiajiantou"></div> -->
        </li>
        <!-- <li>
          <input type="text" placeholder="所在城市">
          <div class="iconfont iconxiangxiajiantou"></div>
        </li> -->
        <li>
          <input type="text" placeholder="个人编号">
        </li>
        <li class="l-radio">
          <el-radio v-model="radio" label="1" @change="getRadio">男</el-radio>
          <el-radio v-model="radio" label="2" @change="getRadio">女</el-radio>
        </li>
        <li>
          <input type="text" placeholder="邮箱 (请认真填写,方便找回)">
        </li>
      </ul>
      <div class="btn" @click="toIndex">
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
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        html_height: 0,
        radio: '1',
        options2: [{
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
          {
            label: '江苏',
            cities: [{
                label: '南京'
              },
              {
                label: '扬州'
              }
            ]
          }, {
            label: '浙江',
            cities: []
          },
        ],
        props: {
          value: 'label',
          children: 'cities'
        }
      };
    },
    created() {
      this.html_height = this.$global.html_height
    },
    methods: {
      getRadio() {
        if (this.radio == 1) {
          console.log('男')
        } else if (this.radio == 2) {
          console.log('女')
        }
      },
      toIndex() {
        this.$router.push({
          path: '/index'
        })
      },
      handleItemChange(val) {
        console.log('active item:', val);
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    // height: 100%;
    background: url(http://qiniu.tecclub.cn/payo/BG-login@2x.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrap {
      width: 80%;
      margin: auto;
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
          // padding: 1rem 0;
          padding: 5vw 0;
          border-bottom: 1px solid #999;

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
            // padding: 1rem 0 1rem 1rem;
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
</style>
