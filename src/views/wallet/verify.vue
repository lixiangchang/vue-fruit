<template>
  <container>
  <div class="bgwh tc verify">
    <p class="f26" v-if="false">我们已经发送了<em class="g3cc375">验证码 </em>到您手机</p>
    <p class="f26" v-else>&nbsp;</p>
    <p class="f44 pt20 mt10">+86 <span>{{phone}}</span></p>
    <div class="verify-form ui-cell mt20 pt20">
      <div class="ui-cell__hd f28 pl20 pr20">验证码</div>
      <div class="ui-cell__bd pl20">
        <ui-input class="f26 pt20 pb20"
        type="tel"
        v-model="withdraw.code"
        placeholder="请输入验证码"
        :max="6"
         @on-blur="validator"/>
      </div>
      <div class="ui-cell__fd pr20">
        <a class="ui-btn btn-code dib f28 ui-btn-plain--primary"
        href="javascript:;"
        @click="submitSMS"
        v-if="is">发送验证码</a>
        <a class="ui-btn btn-code dib f28 ui-btn-plain--disabled"
          href="javascript:;"
          v-else>
          {{second+'秒后重发'}}
          </a>
      </div>
    </div>
    <div>
      <p class="f26 pt20">&nbsp;{{tips}}&nbsp;</p>
    </div>
    <div class="m20 p20"></div>
    <div class="m20 p20"></div>
    <div class="f0 m20">
      <a class="ui-btn ui-btn--primary db f34" href="javascript:;"
      @click="submitWithdraw"
      >申请提现</a>
    </div>
  </div>
  <ui-toast v-model="toast.state" :content="toast.tips"/>
  </container>
</template>
<script>
import Container from '../container'
import { UiInput, UiToast } from '~'
import { mapState } from 'vuex'
export default {
  name: 'Verify',
  components: { Container, UiInput, UiToast },
  data() {
    return {
      toast: {
        state: false,
        tips: ''
      },
      second: 60,
      phone: '',
      is: true,
      tips: ''
    }
  },
  computed: { ...mapState(['withdraw']) },
  watch: {
    'withdraw.code'(val) {
      var str = val.match(/[0-9]/g)
      str = !!str ? str.join('') : ''
      this.$nextTick(function() {
        this.withdraw.code = str
      })
    }
  },
  methods: {
    getPhone() {
      this.$axios({
        method: 'get',
        url: '/wap/account/getPhone',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(res => {
        var data = res.data.data
        var status = res.data.status
        var message = res.data.message
        this.phone = data
        if (status !== '200') {
          this.toast.state = false
          this.toast.tips = message
        }
      })
    },
    setToastShow(tips) {
      this.toast.state = true
      this.toast.tips = tips
    },
    validator(e, val) {
      if (this.withdraw.code === '') {
        this.setToastShow('验证码不能为空!')
        return false
      } else if (this.withdraw.code.length < 6) {
        this.setToastShow('验证码不能少于6位字符!')
        return false
      }
      return true
    },
    onResend() {
      this.second = 60
    },
    countdown() {
      this.second -= 1
      if (this.second <= 0 && this.time) {
        this.is = true
        this.second = 60
        return clearTimeout(this.time)
      }
      this.time = setTimeout(this.countdown, 1000)
    },
    submitSMS() {
      this.$axios({
        method: 'get',
        url: '/wap/account/sendSms',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(res => {
        var data = res.data.data.result
        var state = data.state
        var message = data.message
        if (state === '1') {
          this.is = false
          // 成功
          this.countdown()
          this.tips = ''
        } else {
          if (this.time) {
            clearTimeout(this.time)
          }
          this.is = true
          this.tips = message
          setTimeout(() => {
            this.tips = ''
          }, 2000)
        }
      })
    },
    submitWithdraw() {
      if (!this.validator()) {
        return false
      }
      var mode = this.withdraw.tabIndex === 0 ? '01' : '00'
      var formData = new FormData()
      formData.append('price', this.withdraw.money)
      formData.append('cashMode', mode)
      formData.append('alipayAccount', this.withdraw.account)
      formData.append('bankCard', this.withdraw.card)
      formData.append('bankName', this.withdraw.bankName)
      formData.append('code', this.withdraw.code)
      this.$axios({
        method: 'post',
        url: '/wap/account/cashApply',
        data: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        var data = res.data.data
        var code = 0,
          tips = ''
        if (data === 0) {
          code = 1
          this.$replace('/WithdrawResult?code=1&tips=提现成功!')
        } else {
          code = 0
          if (data === 5) {
            this.setToastShow('验证码输入错误!')
          } else {
            if (data === 2) {
              tips = '目前系统不支持提现!'
            } else if (data === 3) {
              tips = '提现金额小于系统允许最小提现金额!'
            } else if (data === 4) {
              tips = '钱包余额不足!'
            }
            this.$replace('/WithdrawResult?code=' + code + '&tips=' + tips)
          }
        }
      })
    }
  },
  created() {
    this.getPhone()
    this.withdraw.code = ''
    // this.submitSMS()
    // this.countdown()
  }
}
</script>
<style lang="scss">
.verify {
  margin-top: 20px;
  padding-top: 40px;
  padding-bottom: 40px;

  @include ui-1px(#e3e3e3,1px 0);
  .btn-code {
    padding-right: 20px;
    padding-left: 20px;
    height: 57px;
    border-radius: 6px;
    line-height: 57px;
  }
  .f44 {
    font-size: 44px;
  }
}
.g3cc375 {
  color: #3cc375;
}
.gf04141 {
  color: #f04141;
}
.verify-form {
  margin-right: 75px;
  margin-left: 75px;
  border-bottom: 1px solid #3cc375;
  &:before,
  &:after {
    position: absolute;
    bottom: 0;
    width: 1px;
    height: 6px;
    background-color: #3cc375;
    content: '';
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
}
</style>
