<template>
  <container>
    <div class="tab ui-cell tc bgwh">
      <div class="ui-cell__bd f32" 
      :class="{'active': index == tab.current}"
      v-for="(item,index) in tab.items" 
      @click="onTab(index)"
      :key="item.id">{{item.title}}</div>
    </div>
    <div class="tab-content bgwh mt10">
      <div class="items" v-if="tab.current===0" key="0">
          <dl class="tc">
            <dt class="f32 g30bf6c">请填写支付宝账户</dt>
            <dd class="f22 g9 pt20">(请您认真填写，以确保信息的准确性）</dd>
          </dl>
          <div class="m20 p10"></div>
          <div class="ui-cell pl20 pr20">
            <div class="ui-cell__hd f28 g6">&emsp;真实姓名:</div>
            <div class="ui-cell__bd ml20 pl10">
              <ui-input class="ui-1px-b f26 pt20 pb20 g3" 
              disabled
              v-model="userName"
              />
            </div>
          </div>
          <div class="ui-cell pl20 pr20">
            <div class="ui-cell__hd f28 g6">支付宝账号:</div>
            <div class="ui-cell__bd ml20 pl10">
              <ui-input class="ui-1px-b f26 pt20 pb20" 
              placeholder="请填写支付宝邮箱/手机号码"
              v-model="withdraw.account"
              @on-blur="onValidate"
              />
            </div>
          </div>
      </div>
      <div class="items" v-else  key="1">
          <dl class="tc">
            <dt class="f32 g30bf6c">请填写银行账户</dt>
            <dd class="f22 g9 pt20">(请您认真填写，以确保信息的准确性）</dd>
          </dl>
          <div class="m20 p10"></div>
          <div class="ui-cell pl20 pr20">
            <div class="ui-cell__hd f28 g6">收款人姓名:</div>
            <div class="ui-cell__bd ml20 pl10">
              <ui-input class="ui-1px-b f26 pt20 pb20 g3" 
              disabled 
              v-model="userName"        
              />
            </div>
          </div>
          <div class="ui-cell pl20 pr20">
            <div class="ui-cell__hd f28 g6">银行卡卡号:</div>
            <div class="ui-cell__bd ml20 pl10">
              <ui-input class="ui-1px-b f26 pt20 pb20" 
              type="number"
              placeholder="请输入您的银行卡号"
              v-model="withdraw.card"
              name="bankCard"
              @on-blur="onValidate"              
              />
            </div>
          </div>
          <div class="ui-cell pl20 pr20">
            <div class="ui-cell__hd f28 g6">&emsp;所属银行:</div>
            <div class="ui-cell__bd ml20 pl10" @click="popup.state=true">
              <ui-input class="ui-1px-b f26 pt20 pb20"
              placeholder="请选择银行"
              disabled
              v-model="withdraw.bankName"
              />
            </div>
          </div>
          <div class="ui-cell pl20 pr20" v-if="false">
            <div class="ui-cell__hd f28 g6">开户行名称:</div>
            <div class="ui-cell__bd ml20 pl10">
              <ui-input class="ui-1px-b f26 pt20 pb20" 
              placeholder="请输入您的支行名称"
              name="bankName"
              v-model="withdraw.address"
              @on-blur="onValidate"              
              />
            </div>
          </div>
      </div>
      <div class="mt20 pt20 tc">
        <a class="ui-btn ui-btn--primary mt20 pr20 pl20 dib f0" href="javascript:;"
        @click="onDefine"
        >
          <span class="f34 pl20 pr20">
            &emsp;&emsp;&emsp;&emsp;确定&emsp;&emsp;&emsp;&emsp;</span></a>
        </div>
    </div>
    <ui-popup v-model="popup.state" @on-hide="popup.state=false">
      <div class="ui-cells choose-bank">
        <div class="ui-cell p20" v-for="(item,index) in banks.items" :key="index"
        @click="onChooseBank(index)"
        >
          <div class="ui-cell__hd ml20" :class="item.className"></div>
          <div class="ui-cell__bd f32 pl20 ml20">{{item.title}}</div>
          <div class="ui-cell__fd">
            <i class="dib ion-ios-circle-filled lh0"
            :class="{'ion-ios-circle-outline':banks.current!==index}"
            ></i>
          </div>
        </div>
      </div>
    </ui-popup>
    <ui-toast v-model="toast.state" :content="toast.tips"></ui-toast>
  </container>
</template>
<script>
import Container from '../container'
import { UiInput, UiPopup, UiToast } from '~'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ChooseBank',
  components: { Container, UiInput, UiPopup, UiToast },
  data() {
    return {
      toast: { state: false, tips: '' },
      userName: '',
      tab: {
        current: 0,
        items: [
          {
            id: 1,
            title: '支付宝'
          },
          {
            id: 2,
            title: '银行卡'
          }
        ]
      },
      popup: {
        state: false
      },
      banks: {
        current: 0,
        items: [
          // {
          //   className: 'icon-bank--icbc',
          //   title: '中国工商银行'
          // },
          {
            className: 'icon-bank--abc',
            title: '中国农业银行'
          }
          // {
          //   className: 'icon-bank--ccb',
          //   title: '中国建设银行'
          // },
          // {
          //   className: 'icon-bank--boc',
          //   title: '中国银行'
          // }
        ]
      }
    }
  },
  computed: { ...mapState(['withdraw']) },
  methods: {
    ...mapMutations(['setWithdraw']),
    toastShow(tips) {
      this.toast.state = true
      this.toast.tips = tips
    },
    getRealName() {
      this.$axios({
        method: 'get',
        url: '/wap/account/getRealName',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(res => {
        var data = res.data.data
        var status = res.data.status
        var message = res.data.message
        this.userName = data
        if (status !== '200') {
          this.toast.state = false
          this.toast.tips = message
        }
      })
    },
    onDefine() {
      var index = this.tab.current
      if (this.onValidate()) {
        this.withdraw.tabIndex = index
        this.setWithdraw(this.withdraw)
        this.$router.back()
      }
    },
    onValidate(e, value) {
      if (e !== undefined) {
        var ele = e.target
        if (this.tab.current === 0) {
          if (value === '') {
            this.toastShow('请填写支付宝账号!')
            return false
          } else {
            if (!this.zfbValidate(value)) {
              return false
            }
          }
        } else {
          if (ele.name === 'bankCard' && value === '') {
            this.toastShow('请输入您的银行卡号!')
            return false
          } else {
            var is = this.CheckBankNo(value)
            if (!is) {
              return false
            }
          }
          if (ele.name === 'bankName' && value === '') {
            this.toastShow('请输入您的支行名称!')
            return false
          }
        }
      } else {
        if (this.tab.current === 0) {
          if (this.withdraw.account === '') {
            this.toastShow('请填写支付宝账号!')
            return false
          } else {
            var is = this.zfbValidate(this.withdraw.account)
            if (!is) {
              return false
            }
          }
        } else {
          if (this.withdraw.card === '') {
            this.toastShow('请输入您的银行卡号!')
            return false
          } else {
            var is = this.CheckBankNo(this.withdraw.card)
            if (!is) {
              return false
            }
          }
          // if (this.withdraw.address === '') {
          //   this.toastShow('请输入您的支行名称!')
          //   return false
          // }
        }
      }
      return true
    },
    zfbValidate(value) {
      var re, is
      re =
        value.indexOf('@') > -1
          ? /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
          : /^1\d{10}$/

      if (!re.test(value)) {
        this.toastShow('请填写正确的支付宝账号!')
        return false
      }
      return true
    },
    onTab(index) {
      this.tab.current = index
      this.withdraw.tabIndex = index
    },
    onChooseBank(index) {
      this.banks.current = index
      this.withdraw.bankIndex = index
      this.withdraw.bankName = this.banks.items[index].title
      this.popup.state = false
    },
    CheckBankNo(bankno) {
      var bankno = bankno.replace(/\s/g, '')
      if (bankno.length < 16 || bankno.length > 19) {
        this.toastShow('银行卡号长度必须在16到19之间!')
        return false
      }
      var num = /^\d*$/ //全数字
      if (!num.exec(bankno)) {
        this.toastShow('银行卡号必须全为数字')
        return false
      }
      //开头6位
      var strBin =
        '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
      if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
        this.toastShow('银行卡号开头6位不符合规范')
        return false
      }
      //Luhn校验
      if (!this.luhnCheck(bankno)) {
        this.toastShow('银行卡号不符合规范')
        return false
      }
      return true
    },
    luhnCheck(bankno) {
      var lastNum = bankno.substr(bankno.length - 1, 1) //取出最后一位（与luhn进行比较）

      var first15Num = bankno.substr(0, bankno.length - 1) //前15或18位
      var newArr = new Array()
      for (var i = first15Num.length - 1; i > -1; i--) {
        //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1))
      }
      var arrJiShu = new Array() //奇数位*2的积 <9
      var arrJiShu2 = new Array() //奇数位*2的积 >9

      var arrOuShu = new Array() //偶数位数组
      for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {
          //奇数位
          if (parseInt(newArr[j]) * 2 < 9)
            arrJiShu.push(parseInt(newArr[j]) * 2)
          else arrJiShu2.push(parseInt(newArr[j]) * 2)
        } else arrOuShu.push(newArr[j]) //偶数位
      }

      var jishu_child1 = new Array() //奇数位*2 >9 的分割之后的数组个位数
      var jishu_child2 = new Array() //奇数位*2 >9 的分割之后的数组十位数
      for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
      }

      var sumJiShu = 0 //奇数位*2 < 9 的数组之和
      var sumOuShu = 0 //偶数位数组之和
      var sumJiShuChild1 = 0 //奇数位*2 >9 的分割之后的数组个位数之和
      var sumJiShuChild2 = 0 //奇数位*2 >9 的分割之后的数组十位数之和
      var sumTotal = 0
      for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m])
      }

      for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n])
      }

      for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
      }
      //计算总和
      sumTotal =
        parseInt(sumJiShu) +
        parseInt(sumOuShu) +
        parseInt(sumJiShuChild1) +
        parseInt(sumJiShuChild2)

      //计算luhn值
      var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10
      var luhn = 10 - k

      if (lastNum == luhn) {
        // console.log('验证通过')
        return true
      } else {
        // layer.msg('银行卡号必须符合luhn校验')
        return false
      }
    }
  },
  created() {
    this.getRealName()
  }
}
</script>
<style lang="scss">
.tab-content {
  .ui-input {
    box-sizing: border-box;
    padding-left: 20px;
  }
}
</style>

<style lang="scss" scoped>
.g30bf6c {
  color: #30bf6c;
}
.tab {
  padding-top: 30px;
  padding-bottom: 30px;

  .ui-cell__bd:not(:last-child) {
    @include ui-1px(#e3e3e3,0 1px 0 0);
  }
  .active {
    position: relative;
    color: #30bf6c;
    &:after {
      position: absolute;
      right: 20px;
      bottom: -70%;
      left: 20px;
      margin: auto;
      height: 6px;
      border-radius: 5px 6px 0 0;
      background-color: #30bf6c;
      content: '';
    }
  }
}
.tab-content {
  padding-top: 50px;
  padding-bottom: 50px;

  @include ui-1px(#e3e3e3, 1px 0);
}
.ui-1px-b {
  @include ui-1px(#e3e3e3, 0 0 1px 0);
}
.choose-bank {
  .ui-cell {
    @include ui-1px(#e3e3e3, 1px 0);
    i {
      color: #df5150;
    }
  }
}
.items .ui-cell {
  padding-top: 5px;
  padding-bottom: 5px;
}
@each $item in icbc, ccb, boc, abc {
  .icon-bank--#{$item} {
    background-image: url('../../assets/bank-#{$item}.png');
    background-size: cover;
  }
}
</style>
