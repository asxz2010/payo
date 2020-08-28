<template>
  <div class="info-container">
    <img src="http://py.tecclub.cn/boy-archives/archives/20200106145404323750.png" alt="PAYO社交" :style="{height:html_height+'px'}">
  </div>
</template>

<script>
  export default{
    data(){
      return {
        html_height: 0
      }
    },
    created(){
      this.html_height = this.$global.html_height
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
