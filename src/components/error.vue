<template>
  <div class="err-container" :style="{height:html_height+'px'}">
    <div>
      <img src="@/assets/images/err.png" alt="">
      <p>很抱歉，您的会员信息有误，请联系微信客服!</p>
    </div>
    <p>客服微信号: <span>1236547</span></p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        html_height: 0
      }
    },
    created() {
      this.html_height = this.$global.html_height
    }
  }
</script>

<style scoped lang="scss">
  .err-container {
    width: 100%;
    background: white;
    position: relative;
    letter-spacing: 1px;
    text-align: center;

    &>div {
      position: absolute;
      top: 20vh;
      left: 50%;
      margin-left: -40vw;
      width: 80vw;

      img {
        display: block;
        width: 75%;
        margin: auto;
      }

      p {
        line-height: 1.7rem;
      }
    }



    &>p {
      position: absolute;
      bottom: 20vh;
      width: 100%;
      span{
        color: #FFB929;
      }
    }
  }
</style>
