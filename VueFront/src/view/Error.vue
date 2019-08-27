<template>
  <div class="error">
    <img src="../assets/img/bg.jpg" alt="">

    <div class="error_ts">
      <p>请使用手机扫码器重新扫描</p>
      <p>店铺提供的二维码进行点餐</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Error',
    data() {
      return {

      }
    },
  }
</script>

<style>
  .error {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .error img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
  .error_ts {
    font-size: .4rem;
    font-weight: bold;
    line-height: 1.5rem;
    text-align: center;
    width: 5.2rem;
    height: 3rem;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(255,255,255,0.4)), to(rgba(255,255,255,1)));
    position: absolute;
    top: 2.2rem;
    left: 1.15rem;
    border-radius: 8px;
  }
</style>
