<template>
  <container class="bgwh">
    <div class="legalize-result-bg  auto tc">
      <span class="icon-legalize--success dib ml10"></span>
    </div>
    <div class="mt20 pb20"></div>
    <dl class="tc pt10">
      <dt class="f36 text-primary b">认证成功</dt>
      <!-- 恭喜您完成实名认证！ -->
      <dd class="f28 pt20 g9" v-if="from==='withdraw'">
        恭喜您完成实名认证，赶快提现吧</dd>
      <dd class="f28 pt20 g9" v-else-if="!!returnUrl">
        恭喜您完成实名认证，赶快认养吧</dd>
      <dd class="f28 pt20 g9" v-else>恭喜您完成实名认证！</dd>
      <dd class="mt20 pt20"></dd>
      <dd class="mt20 pt20">
        <a v-if="!!returnUrl" class="ui-btn ui-btn-plain--primary ui-btn--small dib pl20 pr20 mt10" href="javascript:;"
        @click="onreplace"
        ><span class="pl20 pr20 f32">&emsp;{{fromJump.title}}&emsp;</span></a>
        <router-link v-else
        :to="fromJump.url" replace
        class="ui-btn ui-btn-plain--primary ui-btn--small dib pl20 pr20 mt10"
        ><span class="pl20 pr20 f32">&emsp;{{fromJump.title}}&emsp;</span></router-link>
        </dd>
    </dl>
  </container>
</template>
<script>
import Container from '../container'
export default {
  name: 'LegalizeResult',
  components: { Container },
  data() {
    return {
      from: '',
      returnUrl: ''
    }
  },
  computed: {
    fromJump() {
      let title = ''
      let url = ''
      if (this.from === 'withdraw') {
        title = '继续提现'
        url = '/withdraw'
      } else if (!!this.returnUrl) {
        title = '继续认养'
        url = this.returnUrl
      } else {
        title = '完成'
        url = '/walletHome'
      }
      return {
        title,
        url
      }
    }
  },
  methods: {
    onreplace() {
      this.$router.back()
      // window.location.replace(this.fromJump.url)
    }
  },
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
    this.from = this.$route.query.from
    this.returnUrl = this.$route.query.returnUrl || ''
  },
  mounted() {
    if (typeof test !== 'undefined') {
      test.refreshUserInfo()
    } else if (typeof window.webkit !== 'undefined') {
      window.webkit.messageHandlers.refreshUserInfo.postMessage('1111')
    }
  }
}
</script>
<style lang="scss">
.bgwh .content {
  background-color: #fff;
}
</style>
