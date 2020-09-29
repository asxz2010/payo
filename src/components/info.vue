<template>
  <div class="info-container">
    <img v-if="imgsrc.length>0" :src="imgsrc" alt="PAYO社交" :style="{height:html_height+'px'}">
    <img v-else src="../assets/images/girl.jpg" alt="PAYO社交" :style="{height:html_height+'px'}">
  </div>
</template>

<script>
  export default{
    data(){
      return {
        html_height: 0,
        imgsrc: ''  // 档案图片
      }
    },
    created(){
      this.html_height = this.$global.html_height
      this.imgsrc = this.$route.query.imgsrc
    }
  }
</script>

<style scoped lang="scss">
  .info-container {
    img {
      width: 100%;
    }
  }
</style>
