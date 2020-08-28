<template>
  <div class="rise-container" :style="{height: html_height+'px'}">
    <div>
      <img src="http://qiniu.tecclub.cn/2019/09/26/12_d63b0777bcbb0713e01e1bbb670f1d11.jpg" alt="PAYO社交">
      <p>添加 PAYO社交 客服微信详情咨询{{html_height}}</p>
    </div>
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

      p {
        text-align: center;
        font-size: .9rem;
        letter-spacing: 1px;
      }
    }
  }
</style>
