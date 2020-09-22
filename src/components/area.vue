<template>
  <div class="area-container">
    <van-popup v-model="address_show" position="bottom">
      <van-area title="省份/直辖市" :columns-placeholder="['请选择']" :area-list="areaList" @confirm="getAddress" @cancel="cancelAddress"
        columns-num="1" visible-item-count="5" />
    </van-popup>
  </div>
</template>

<script>
</script>

<style>
</style>
