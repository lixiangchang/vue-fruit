<template>
  <container>
    <div class="m20 p20"></div>
    <div class="m20 p20"></div>
    <div class="f0 tc m20 p20">
      <img class="ml20" v-if="code==1" src="../../assets/icon-success.png" width="262" alt="">
      <img class="ml20" v-else src="../../assets/icon-failure.png" width="249" alt="">
    </div>
    <div class="m20 p20"></div>
    <div class="m20 p20"></div>
    <div v-if="code==1">
      <p class="withdraw-result-tips f38 text-primary tc">提交成功</p>
      <p class="f24 g9 tc m20 p20">到账时间约需1~3个工作日</p>
      <div class="m20 p20">
        <router-link to="/walletHome" replace class="ui-btn ui-btn--primary db" href="javascript:;">完成</router-link>
      </div>
    </div>
    <div v-else>
      <p class="withdraw-result-tips f38 text-primary tc">{{tips}}</p>
      <!-- <p class="f24 g9 tc m20 p20">抱歉，您可以重新提交申请</p> -->
      <div class="m20 p20">
        <router-link to="/withdraw" replace class="ui-btn ui-btn--primary db" href="javascript:;">重新提交</router-link>
      </div>
    </div>
  </container>
</template>
<script>
import Container from '../container'
export default {
  name: 'WithdrawResult',
  components: { Container },
  data() {
    return {
      code: 1,
      tips: '',
      status: false
    }
  },
  methods: {},
  beforeRouteLeave(to, from, next) {
    if (to.fullPath === '/walletHome') {
      if (typeof test !== 'undefined') {
        test.webViewClose()
      } else if (typeof window.webkit !== 'undefined') {
        window.webkit.messageHandlers.webViewClose.postMessage('1111')
      } else {
        next()
      }
    } else {
      next()
    }
  },
  created() {
    this.code = this.$route.query.code
    this.tips = this.$route.query.tips
  }
}
</script>
