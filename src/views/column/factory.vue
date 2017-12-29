<template>
<container class="bg-snap--03">
  <div class="snap-column">
    <div class="features f0 tr">
      <span class="features-item icon-snap--05"></span>
      <span class="features-item icon-snap--06"></span>
    </div>
    <dl class="dt">
      <dt class="snap-column__title"><span>深加工厂介绍</span></dt>
      <dd class="snap-column__text">万果深加工厂为用户提供优质深加工产品，采用机器视觉技术识别加工对象的大小、形状、颜色特征并自动分级；采用自循环分段式烘干技术加工果干，针对不同批次的加工对象合理控温、控湿、控时；采用低温浓缩蒸发技术加工果蔬汁，保持原有风味并留存营养。</dd>
    </dl>
  </div>
</container>
</template>
<script>
import Container from '../container'
export default {
  name: 'Factory',
  components: { Container }
}
</script>
<style lang="scss" scoped>
.snap-column__title {
  position: relative;
  white-space: nowrap;
  span {
    position: absolute;
    right: -80px;
    bottom: 0;
  }
}
</style>
