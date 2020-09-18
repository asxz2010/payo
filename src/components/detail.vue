<template>
  <div class="rise-container" :style="{height: html_height+'px'}">
    <div>
      <img :src="imgsrc" alt="PAYO社交">
      <p @click="goBack">返回</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        html_height: 0,
        imgsrc: '' // 图片url
      }
    },
    created() {
      this.html_height = this.$global.html_height
      this.imgsrc = this.$route.query.imgsrc
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      }
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
        letter-spacing: 1px;
        width: 20vw;
        margin: auto;
        border: 1px solid #FFB928;
        border-radius: 1rem;
        color: #FFB928;
        padding: 0.6rem 0;
      }
    }
  }
</style>
