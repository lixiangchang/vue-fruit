<template>
  <container class="wallet-home1">
    <ui-header slot="header">
      <div class="title">
        {{$route.meta.title}}
        <router-link class="abs white f28" to="/over">明细</router-link>
      </div>
    </ui-header>
    <div class="wallet-main">
    <dl class="wallet-over f0">
      <dt class="f26 white">我的余额(元):</dt>
      <dd class="white over" v-if="balance!==''"><em>¥</em><span>{{balance}}</span></dd>
      <dd class="white over" v-else><span>&nbsp;</span></dd>
      <dd>
        <a href="javascript:;" class="ui-btn ui-btn-plain--default dib f30" @click="onLegalize"><em class="pl20 pr20 ml20 mr20">点我提现</em></a>
      </dd>
    </dl>
    <div class="wallet-info">
      <div class="ui-cell wallet-child">
      <div class="ui-cell__bd f0">
        <router-link class="dt pct100" to="/billList">
        <i class="dib vm icon-wallet--01"></i>
        <div class="dib vm tl ml20">
          <p class="f30 g3">我的账单</p>
          <p class="f24 g9 pt10">看消费 查收益</p>
        </div>
        <span class="code icon rel dib vm ml20"></span>
        </router-link>
      </div>
      <div class="ui-cell__bd f0" @click="pathSwitch('')">
        <i class="dib vm icon-wallet--02"></i>
        <div class="dib vm tl ml20 f0">
          <p class="f30 g3">实名认证</p>
          <div class="f24 g9 pt10">核身份&nbsp;绑安全</div>
        </div>
        <span class="code icon rel dib vm ml20"></span>
      </div>
    </div>
    </div>
    <!-- 通知 -->
    <!-- <div class="pt10"></div>
    <div class="notice mt20 f0">
      <div class="title tc f0"><i class="icon-wallet--04 dib vm mr20"></i><span class="dib vm f28">安全、信赖、保障</span></div>
      <div class="notice-list">
        <ul class="rel" v-if="brokerage.length">
          <li class="notice-item" v-for="(item,index) in brokerage" :key="item.id" :class="{
            'active':currentIndex===index||nextIndex===index,
            'prev':prevIndex===index,
            'current':currentIndex===index,
            'next':nextIndex===index
          }">{{item.content}}</li>
        </ul>
      </div>
    </div> -->
    <!-- 邀请好友 -->
    <!-- <router-link to="/inviteFriends" tag="div" class="invite-friends parent-middle mt20 f0 tc">
      <i class="dib vm icon-wallet--03"></i>
      <div class="dib vm tl ml20 pl20">
        <p class="f30 g3">邀请好友，赢取更多奖励</p>
        <p class="f24 g9 pt10">重磅福利，等你来拿~</p>
      </div>
      <span class="ml20 mr20 pl20 pr20"></span>
      <span class="code icon rel dib vm"></span>
    </router-link> -->
  </div>
  <ui-loading v-model="loading.state"></ui-loading>
  <ui-dialog :class="['legalize1',{'err':!attest.code}]" v-model="attest.status"  @on-hide="onHide"
      :type="attest.type"
      :tips="attest.tips"
      :btn="attest.btn"
      @on-show="onShow"></ui-dialog>
      <ui-toast v-model="toast.state" :time="toast.time" :content="toast.tips"/>
  </container>
</template>
<script>
import container from '../container'
import { UiHeader, UiDialog, UiToast, UiLoading } from '~'
export default {
  name: 'WalletHome',
  components: {
    container,
    UiHeader,
    UiDialog,
    UiToast,
    UiLoading
  },
  data() {
    return {
      loading: { state: false },
      isOpen: false,
      prevIndex: -1,
      nextIndex: 1,
      currentIndex: 0,
      isToast: false,
      toast: {
        state: false,
        time: 0,
        tips: 'Hello'
      },
      attest: {
        code: 100,
        type: 'dialog',
        status: false,
        tips: '为了保障您的账户安全，即日起万果田园提现功能仅限实名认证用户使用',
        btn: ['忽略', '去认证']
      },
      balance: '',
      brokerage: [],
      quick: true
    }
  },
  computed: {},
  watch: {
    isToast(val) {}
  },
  methods: {
    pathSwitch(from) {
      from = from || ''
      var pather = ''
      if (this.attest.code === 100) {
        this.isReal()
        return false
      }

      if (this.attest.code === 4) {
        pather = '/legalizeHome'
      } else {
        if (this.quick) {
          // 快捷实名认证
          pather = '/legalize?' + from
        } else {
          if (this.attest.code === 1) {
            // 申请认证未审核
            pather = '/verified?' + from
          } else if (this.attest.code === 2) {
            // 申请认证审核中
            pather = '/legalizeHome'
          } else if (this.attest.code === 3) {
            // 实名认证审核未通过
            pather = '/legalizeHome'
          }
        }
      }
      return this.$go(pather)
    },
    getNotice() {
      this.$axios({
        method: 'get',
        url: '/wap/rights/getNews',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          var data = res.data
          var bulletinList = data.bulletinList
          this.brokerage = bulletinList
          if (bulletinList.length) {
            this.onNext()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 实名认证状态
    isReal() {
      this.loading.state = true
      this.$axios({
        method: 'get',
        url: '/wap/account/isReal',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          var data = res.data.data.status
          var message = res.data.message
          var status = res.data.status
          this.quick = res.data.data.quick
          this.attest.code = data
          if (status !== '200') {
            this.toast.state = false
            this.toast.tips = message
            return
          }
          this.loading.state = false
          // if (data === 1) {
          //   // 未申请认证
          // } else if (data === 2) {
          //   // 申请认证未审核
          // } else if (data === 3) {
          //   // 实名认证审核未通过
          //   this.attest.code = 0
          // } else if (data === 4) {
          //   // 实名认证审核已通过
          //   this.attest.code = 1
          // }

          if (data === 1) {
            this.attest.tips = '您还未实名认证，为了保障您的权益与账户安全，请尽快完成实名认证。'
            this.attest.type = 'dialog'
            this.attest.btn = ['忽略', '去认证']
          } else if (data === 2) {
            this.attest.tips = '您的实名认证正在审核中，审核将在72个小时内完成，请您耐心等待。'
            this.attest.type = 'alert'
            this.attest.btn = '确定'
          } else if (data === 4) {
            this.attest.tips = '成功!'
            this.attest.type = 'alert'
            this.attest.btn = '确定'
          } else if (data === 3) {
            this.attest.tips = '您的实名认证暂未通过审核，请重新上传信息，平台最快在24小时内审核完成。'
            this.attest.btn = ['忽略', '重新上传']
          } else {
            this.attest.code = 0
            this.attest.tips = message
            this.attest.type = 'alert'
            this.attest.btn = '确定'
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAjax() {
      this.$axios({
        method: 'get',
        url: '/wap/account/getUserAccount',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          var data = res.data.data
          var status = res.data.status
          var message = res.data.message
          this.balance = data.balance
          if (status !== '200') {
            this.toast.state = false
            this.toast.tips = message
          }
        })
        .catch(err => {
          this.toast.time = 1000
          this.toast.state = false
        })
    },
    onLegalize() {
      if (this.attest.code === 100) {
        this.isReal()
        return false
      }
      if (this.attest.code === 4) {
        this.$go('/Withdraw?balance=' + this.balance)
      } else {
        this.attest.status = true
        // this.pathSwitch('from=withdraw')
      }
    },
    onShow() {
      if (this.attest.code === 1 || this.attest.code === 3) {
        // 需要实名认证
        if (this.quick) {
          this.$go('/legalize?from=withdraw')
        } else {
          this.$go('/verified')
        }
      } else if (this.attest.code === 2) {
        // 审核中
        this.attest.status = false
      }
    },
    onHide() {
      this.attest.status = false
    },
    onNext() {
      this.prevIndex = this.currentIndex
      this.currentIndex += 1
      if (this.brokerage.length - 1 < this.currentIndex) {
        this.currentIndex = 0
      }
      this.nextIndex = this.currentIndex + 1

      if (this.brokerage.length <= this.nextIndex) {
        this.nextIndex = 0
      }
      this.times = setTimeout(this.onNext, 3000)
    },
    roll() {}
  },
  beforeRouteLeave(to, from, next) {
    var name = to.name
    if (name === 'WithdrawResult' || name === 'LegalizeResult') {
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
    this.isReal()
    this.getNotice()
  },
  mounted() {
    this.getAjax()
    document.body.classList.add('wallet-bg')
  },
  destroyed() {
    document.body.classList.remove('wallet-bg')
  }
}
</script>

<style lang="scss">
.wallet-home1 {
  .header-bg,
  .titlet-bar:before {
    display: none;
  }
  .titlet-bar {
    color: #fff;
    a.abs {
      top: 0;
      right: 20px;
      bottom: 0;
      margin: auto;
    }
    &:after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      margin: auto;
      background: url('../../assets/bg-01.png') no-repeat center bottom;
      background-size: cover;
      content: '';
    }
  }
  .btn-goback {
    background: url('../../assets/icon-goback--white.png') no-repeat;
    // background-size: cover;
  }
}

.wallet-main {
  position: relative;
  // padding-top: 128px;
  padding-top: 0;
}
.wallet-over {
  padding-top: 40px;
  text-align: center;
  .over {
    padding-top: 30px;
    padding-bottom: 30px;
    font-weight: 600;
    em {
      padding-right: 8px;
      font-size: 42px;
    }
    span {
      font-size: 62px;
    }
  }
}
.wallet-info {
  position: relative;
  margin-top: 40px;
  width: 750px;
  // height: 185px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}
.user-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  width: 174px;
  height: 174px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 27px 1px rgba(0, 0, 0, 0.06);
  transform: translateY(-50%);
  & ~ div {
    margin-top: 110px;
  }
  img {
    overflow: hidden;
    width: 137px;
    height: 137px;
    border-radius: 50%;
  }
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    margin: auto;
    width: 152px;
    height: 152px;
    border: 2px solid #e3e3e3;
    border-radius: 50%;
    content: '';
  }
}
.amount-of-money {
  color: #f9953c;
  font-weight: 400;
  font-size: 44px;
  line-height: 90px;
}

.legalize1 {
  .ui-dialog-main {
    overflow: visible;
  }
  &.err {
    .ui-dialog__title {
      &:before {
        background: url('../../assets/icon-err.png') no-repeat;
        background-size: cover;
      }
    }
  }
  .ui-dialog__title {
    height: 80px;
    &:before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      display: inline-block;
      margin: auto;
      background: url('../../assets/icon-audit.png') no-repeat;
      background-size: cover;
      content: '';
      transform: translate(-10px, -50%);
    }
  }
}
</style>
