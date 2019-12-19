<template>
<div class="puzzle-container">
  <div class="puzzle-header">
    <span class="puzzle-header-left">拖动滑块以完成验证</span>
    <div>
      <span class="re-btn iconfont icon-shuaxin"></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'slideverify'
}
</script>

<style>
  .puzzle-container{
    position: relative;
    display: inline-block;
    padding:15px 15px 28px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 6px;
  }
  .puzzle-header{
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
  .puzzle-header-left{
    color:#333;
  }
  .re-btn{
    font-size:16px;
    cursor: pointer;
    color:#666;
  }
  .iconfont{
    font-family: "iconfont" !important;
    font-size:16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @font-face {
    font-family: "iconfont";
    src: url("../../assets/fonts/iconfont.eot");
    src: url("~element-ui/lib/theme-chalk/fonts/element-icons.woff") format("woff");
  }
  .icon-shuaxin{
    cursor: pointer;
    background: url('../../assets/images/icon_light.png') 0 -437px;
    background-size: 34px 471px
  }
  .slider-btn{
    position:absolute;
    width:44px;
    height:44px;
  }
</style>
