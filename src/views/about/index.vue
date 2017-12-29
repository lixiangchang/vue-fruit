<template>
<container>
  <dl class="tc mt20 pt20">
    <dt><img src="../../assets/logo.png" width="83" alt=""></dt>
    <dd class="f28 g6 mt20">当前版本<em class="version pl20">V{{$route.query.version}}</em></dd>
  </dl>
  <div class="m20 p20 f28 g6 mian">
    <p>果犇农业科技（北京）有限公司主营水果、蔬菜、中草药、干果、茶饮、粮食、调料等相关农产品，囊括研发育种、土地管理、科学种植、智能仓储、深加工配送、成品展销、田园度假等全产业链集群，通过全程把关，为消费者提供一个放心、满意的“绿色”消费环境。</p>
    <p class="mt10">万果田园APP是由果犇公司推出的“体验式农业”手机软件，用户可足不出户，就能享受农耕雅趣，收获优质、实惠、安全的高档农产。还能在千里之外，参与、监督并经营农产品及其加工品的生产、储运和销售环节。</p>
  </div>
  <div class="Copyright tc f24 g9">
    <p>果犇公司 版权所有</p>
    <p>Copyright &copy; 2017 Guoben.All Rights Reserved</p></div>
</container>
</template>
<script>
import Container from '../container'
export default {
  name: 'About',
  components: { Container }
}
</script>
<style lang="scss" scoped>
.mian {
  text-indent: 56px;
}
.version {
  color: #30bf6c;
}
.Copyright {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
}
</style>
