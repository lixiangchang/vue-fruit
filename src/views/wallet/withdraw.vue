<template>
  <container>
    <div class="ui-cell bgwh pay-mode f0">
      <div class="ui-cell__hd pl20 f26 g6">选择提现方式:</div>
    </div>
    <router-link tag="div" to="/chooseBank" class="ui-cell bgwh pay-mode f0">
      <div class="ui-cell__hd pl20">
        <i class="dib icon-pay-zfb" v-if="withdraw.tabIndex===0"></i>
        <i class="dib icon-pay-bank" v-else></i>
      </div>
      <div class="ui-cell__bd pl20">
        <p class="f30 g3">{{withdraw.tabIndex!==0?withdraw.bankName:'支付宝'}}</p>
        <p class="f24 g9" v-if="withdraw.tabIndex===0">推荐有支付宝账号的用户使用</p>
      </div>
      <div class="ui-cell__fd ion-ios-arrow-right mr20"></div>
    </router-link>
    <dl class="write-money bgwh p20">
      <dt class="f30 pb20">转出金额:</dt>
      <dd class="ui-cell pt20">
        <div class="ui-cell__hd tl g3 money-symbol">¥</div>
        <div class="ui-cell__bd tl g3 f30 money-number ml20">
          <!-- :min="0"
          :max="maxMoney"  -->
          <ui-input
          v-model="withdraw.money"
          type="number"
          :max="999999999"
          :ToFixed="2"
           placeholder="请输入金额" />
        </div>
      </dd>
      <dd class="ui-cell pt20">
        <div class="ui-cell__bd tl g9 f28">可转出 {{maxMoney}}元</div>
        <div class="ui-cell__bd tr gc f28" v-if="maxMoney==0">全部转出</div>
        <div class="ui-cell__bd tr text-primary f28" v-else  @click="onAll">全部转出</div>
      </dd>
    </dl>
    <!-- 支付宝 -->
    <p class="pl20 pt20 f24 g9" v-if="withdraw.tabIndex===0"><i class="ion-ios-information-outline dib vm text-primary f30 lh0"></i>
    <span class="dib vm" v-if="withdraw.money===''">将额外收取手续费{{cashRatio}}%</span>
    <span class="dib vm" v-else-if="parseFloat(withdraw.money)<parseFloat(minMoney)">每次最小提现不得小于{{minMoney}}元</span>
    <span class="dib vm text-primary"  v-else-if="parseFloat(withdraw.money)>parseFloat(maxMoney)">输入金额超出余额</span>
    <!-- 单笔最大额度 -->
    <span class="dib vm text-primary" v-else-if="parseFloat(withdraw.money)>limit.aliMax&&limit.aliMax">输入金额超出单笔额度{{limit.aliMax}}元</span>
    <!-- 单日最大额度 -->
    <span class="dib vm text-primary" v-else-if="parseFloat(withdraw.money)>limit.aliNow&&limit.aliNow">单日累计提现额度{{limit.aliSingleMax}}元，您还剩{{limit.aliNow}}元可提现</span>
    <span class="dib vm" v-else>将额外收取手续费{{calc}}元</span>
    </p>
    <!-- 银行卡 -->
    <p class="pl20 pt20 f24 g9" v-else>
      <i class="ion-ios-information-outline dib vm text-primary f30 lh0" v-if="withdraw.money!==''"></i>
    <span class="dib vm" v-if="withdraw.money===''">&nbsp;</span>
    <span class="dib vm" v-else-if="parseFloat(withdraw.money)<parseFloat(minMoney)">每次最小提现不得小于{{minMoney}}元</span>
    <span class="dib vm text-primary" v-else-if="parseFloat(withdraw.money)>parseFloat(maxMoney)">输入金额超出余额</span>
    <!-- 单笔最大额度 -->
    <span class="dib vm text-primary" v-else-if="parseFloat(withdraw.money)>limit.bankMax&&limit.bankMax">输入金额超出单笔额度{{limit.bankMax}}元</span>
    <!-- 单笔最日额度 -->
    <span class="dib vm text-primary" v-else-if="parseFloat(withdraw.money)>limit.bankNow&&limit.bankNow">单日累计提现额度{{limit.bankSingleMax}}元，您还剩{{limit.bankNow}}元可提现</span>

    <span class="dib vm" v-else>将额外收取手续费{{calc}}元</span>
    </p>
    <div class="m20 p20">&nbsp;</div>
    <div class="m20 p20">
      <a class="ui-btn ui-btn--disabled f34 db"
      v-if="!disabled"
      href="javascript:;"
      >申请提现</a>
      <a class="ui-btn ui-btn--primary f34 db"
      v-else
      href="javascript:;"
      @click="submitForm()"
      >申请提现</a>
      <!-- <router-link class="ui-btn ui-btn--primary f34 db"  to="/verify">申请提现</router-link> -->
    </div>
    <p class="f24 g9 tc">提交申请后，将在2~3个工作日到账</p>
    <ui-toast v-model="toast.state" :content="toast.tips"/>
  </container>
</template>
<script>
import Container from '../container'
import { UiInput, UiToast } from '~'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Withdraw',
  components: { Container, UiInput, UiToast },
  data() {
    return {
      paymode: {},
      maxMoney: '',
      minMoney: '',
      cashRatio: '',
      limit: {
        aliMax: 0,
        aliNow: 0,
        bankMax: 0,
        bankNow: 0,
        aliSingleMax: 0,
        bankSingleMax: 0
      },

      toast: {
        state: false,
        tips: ''
      }
    }
  },
  computed: {
    ...mapState(['withdraw']),
    disabled() {
      let status = false
      // 支付宝
      if (
        parseFloat(this.calc) >= parseFloat(this.withdraw.money) ||
        parseFloat(this.withdraw.money) > this.maxMoney ||
        this.maxMoney === '' ||
        this.maxMoney === '0.00' ||
        this.withdraw.money === ''
      ) {
        status = false
      } else {
        if (this.withdraw.tabIndex === 0) {
          if (
            (parseFloat(this.withdraw.money) > this.limit.aliSingleMax &&
              this.limit.aliSingleMax) ||
            (parseFloat(this.withdraw.money) > this.limit.aliNow &&
              this.limit.aliNow)
          ) {
            status = false
            console.log(this.limit.aliSingleMax)
          } else {
            status = true
          }
        } else {
          if (
            (parseFloat(this.withdraw.money) > this.limit.bankSingleMax &&
              this.limit.bankSingleMax) ||
            (parseFloat(this.withdraw.money) > this.limit.bankNow &&
              this.limit.bankNow)
          ) {
            status = false
          } else {
            status = true
          }
        }
      }

      return status
    },
    calc() {
      var cashMode = this.withdraw.tabIndex === 0 ? '01' : '00'
      return this.onCalc(this.withdraw.money, this.cashRatio / 100, cashMode)
    }
  },
  watch: {},
  methods: {
    ...mapMutations(['setWithdraw']),
    /**
   * 计算手续费
   * @param price 提现金额，单位元
   * @param cashRatio 提现手续费比例，0.1就是10%
   * @param cashMode 提现方式，"00"银行卡，"01"支付宝（默认只要不是"00"就是支付宝）
   * @returns {number} 返回手续费
   */
    onCalc(price, cashRatio, cashMode) {
      if (cashMode == '00') {
        //银行卡
        if (price <= 10000) {
          return 5.0
        } else if (price <= 100000) {
          // 最多 提现金额是五万 最多每天两笔
          return 10.0
        } else if (price <= 500000) {
          return 15.0
        } else if (price <= 1000000) {
          return 20.0
        } else {
          return (price * 0.00002).toFixed(2)
        }
      } else {
        //支付宝
        //首先计算手续费
        var poundage = price * cashRatio
        if (poundage <= 2) {
          return 2.0
        } else if (poundage >= 25) {
          return 25.0
        }
        //设定只能返回0.5的倍数，不足的向上取整，例如2.3返回2.5,2.7返回3
        var base = parseInt(poundage)
        if (base == poundage || base + 0.5 == poundage) {
          return poundage.toFixed(2)
        } else {
          return poundage > base + 0.5
            ? (base + 1).toFixed(2)
            : (base + 0.5).toFixed(2)
        }
      }
    },
    onAll() {
      this.withdraw.money = this.maxMoney
    },
    submitForm() {
      this.setWithdraw(this.withdraw)
      if (this.withdraw.tabIndex === 0) {
        if (this.withdraw.account === '') {
          this.setToastShow('请选择提现方式!')
          return
        }
      } else {
        // 农行不需要 开户行
        // || this.withdraw.address === ''
        if (this.withdraw.card === '') {
          this.setToastShow('请选择提现方式!')
          return
        }
      }
      this.$go('/verify')
    },
    setToastShow(tips) {
      this.toast.state = true
      this.toast.tips = tips
    },
    getMinCashout() {
      this.$axios({
        method: 'get',
        url: '/wap/account/getMinCashout',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          var data = res.data.data
          this.limit = {
            aliNow: parseFloat(data.aliNow),
            aliMax: parseFloat(data.aliMax),
            aliSingleMax: parseFloat(data.aliSingleMax),
            bankNow: parseFloat(data.bankNow),
            bankMax: parseFloat(data.bankMax),
            bankSingleMax: parseFloat(data.bankSingleMax)
          }
          this.minMoney = data.min
          this.cashRatio = +data.cashRatio * 100
          console.log(this.limit)
        })
        .catch(err => {
          this.setToastShow(err)
        })
    }
  },
  created() {
    this.getMinCashout()
    this.maxMoney = this.$route.query.balance
  }
}
</script>
<style lang="scss">
.icon-mode-pay {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 101px;
  height: 101px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.11);
  transform: translateY(50%);
  img {
    overflow: hidden;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
.mode-withdraw-head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: url('../../assets/bg-withdraw--01.png') no-repeat;
  background-size: cover;
  .ion-close-round {
    position: absolute;
    top: 30px;
    right: 30px;
  }
}
.mode-withdraw-content {
  padding-top: 110px;
  padding-bottom: 60px;
  .ui-cell__bd {
    padding-top: 10px;
    padding-bottom: 10px;

    @include ui-1px(#e3e3e3,0 0 1px 0);
  }
}
/* */
.pay-mode {
  margin-top: 40px;
  padding-top: 20px;
  padding-bottom: 20px;

  @include ui-1px(#e3e3e3,1px 0);
  & ~ & {
    margin-top: 0;
  }
  .ion-ios-arrow-right {
    color: #bebebe;
    font-size: 60px;
    line-height: 0;
  }
}
.write-money {
  margin-top: 40px;
  padding-top: 20px;
  padding-bottom: 20px;

  @include ui-1px(#e3e3e3,1px 0);
}
.money-symbol {
  font-size: 46px;
}
.money-number {
  padding-bottom: 10px;

  @include ui-1px(#ebebeb,0 0 1px 0);
}
</style>
