<template>
  <container>
     <dl class="bgwh legalize mt20">
      <dt class="f32 tc pt20 pb20 n">账户安全认证</dt>
      <dd class="f26 g6 tc">*为了确保您的账户安全需进行实名认证</dd>
      <dd class="ui-cells bgwh f32">
        <div class="ui-cell">
        <div class="ui-cell__hd pr20">真实姓名:</div>
        <div class="ui-cell__bd">
           <ui-input
           name="userName"
           :max="15"
           v-model="userName"
           placeholder="请输入真实姓名"
           @on-blur="validate"
           />
        </div>
      </div>
      <div class="ui-cell">
        <div class="ui-cell__hd pr20">身份证号:</div>
        <div class="ui-cell__bd">
          <ui-input
           name="userID"
           :max="18"
          v-model="userId"
          placeholder="请输入18位身份证号"
          @on-blur="validate"
          />
        </div>
      </div>
      <div class="ui-cell">
        <div class="ui-cell__hd pr20">手机号:</div>
        <div class="ui-cell__bd">
          <ui-input
           :value="'+86  '+phone"
          disabled
          />
        </div>
      </div>
      <div class="ui-cell">
        <div class="ui-cell__hd pr20">验证码:</div>
        <div class="ui-cell__bd">
          <ui-input
           type="tel"
           name="code"
           v-model="code"
           :max="6"
           placeholder="短信验证码"
           @on-blur="validate"
          />
        </div>
        <div class="ui-cell__fd pl10" v-if="SMSActive">
          <a class="ui-btn btn-code dib f28 ui-btn-plain--primary"
          href="javascript:;"
          v-if="second===60||second===0"
          @click="onSMS"
          >发送验证码</a>
          <a class="ui-btn btn-code dib f28 ui-btn-plain--disabled"
          href="javascript:;"
          v-else
          >
          {{second+'秒后重发'}}
          </a>
        </div>
        <div class="ui-cell__fd pl10" v-else>
          <a class="ui-btn btn-code dib f28 ui-btn-plain--disabled"
          href="javascript:;">发送验证码</a>
        </div>
      </div>
      </dd>
      <dd class="m20 p20">
        <div class="m20 p20">
        <a class="ui-btn ui-btn--disabled db f32 mt20 ml20 mr20" href="javascript:;"
        v-if="userName===''||userId===''||code===''"
        >验证</a>
        <a class="ui-btn ui-btn--primary db f32" href="javascript:;"
        v-else
        @click="onSubmit"
        >验证</a></div>
      </dd>
    </dl>
    <ui-toast v-model="toast.state" :content="toast.title"></ui-toast>
    <ui-dialog v-model="dialog.state"
     :tips="dialog.tips"
     type="dialog"
     @on-show="onConfirm"
     @on-hide="onCancel"></ui-dialog>
    <ui-loading v-model="loading.status">{{loading.tips}}</ui-loading>
  </container>
</template>
<script>
import Container from '../container'
import { UiInput, UiToast, UiDialog, UiLoading } from '~'
export default {
  name: 'Legalize',
  components: {
    Container,
    UiInput,
    UiToast,
    UiDialog,
    UiLoading
  },
  data() {
    return {
      // SMSActive: false,
      from: '',
      returnUrl: '',
      loading: {
        status: false,
        tips: '提交中...'
      },
      dialog: {
        state: false,
        tips: '<p class="f28">抱歉，您认证次数过于频繁，</p><p class="f28">请进入人工审核通道</p>'
      },
      toast: {
        state: false,
        title: ''
      },
      second: 60,
      userName: '',
      userId: '',
      code: '',
      phone: ''
    }
  },
  computed: {
    SMSActive() {
      var state = false
      if (this.checkID(this.userId) && this.userName.length > 1) {
        state = true
      } else {
        state = false
      }
      return state
    }
  },
  watch: {
    userName(val) {
      var str = val.match(/[\u4E00-\u9FA5]/g)
      str = !!str ? str.join('') : ''
      this.$nextTick(function() {
        this.userName = str
      })
    },
    userId(val) {
      var str = val.match(/[0-9,X]/g)
      str = !!str ? str.join('') : ''
      this.$nextTick(function() {
        this.userId = str
      })
    },
    code(val) {
      var str = val.match(/[0-9]/g)
      str = !!str ? str.join('') : ''
      this.$nextTick(function() {
        this.code = str
      })
    }
  },
  methods: {
    onConfirm() {
      this.$replace('/verified')
      this.dialog.state = false
    },
    onCancel() {
      this.$router.go(-1)
    },
    setDialogShow(tips) {
      this.dialog.state = true
      this.dialog.tips = tips
    },
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
          this.toast.title = message
        }
      })
    },
    countdown() {
      this.second -= 1
      if (this.second <= 0 && this.time) {
        this.second = 60
        return clearTimeout(this.time)
      }
      this.time = setTimeout(this.countdown, 1000)
    },
    onSMS() {
      this.$axios({
        method: 'get',
        url: '/wap/account/sendCertSms',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(res => {
        var data = res.data.data.result
        var state = data.state
        var message = data.message
        if (state === '1') {
          this.countdown()
        } else {
          if (this.time) {
            clearTimeout(this.time)
            setTimeout(() => {
              this.second = 60
            }, 800)
          }
          this.toastShow(message)
        }
      })
    },
    onSubmit() {
      // this.$replace('/legalizeResult?' + this.from + this.returnUrl)
      if (!this.validate()) {
        return false
      }
      if (this.loading.status) {
        return false
      }
      this.loading.status = true
      var form = new FormData()
      form.append('name', this.userName)
      form.append('card', this.userId)
      form.append('code', this.code)
      this.$axios({
        method: 'post',
        url: '/wap/account/applyCert',
        data: form,
        timeout: 8000,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(res => {
          var data = res.data.data
          var status = res.data.status
          var tips = ''
          if (data === 2) {
            // this.setDialogShow('你现在需进行人工审核,约需3个工作日!')
            this.dialog.state = true
            this.dialog.tips = '您现在需进行人工审核,约需3个工作日!'
          } else {
            if (data === 0) {
              // tips = '认证成功!'
              this.$replace('/legalizeResult?' + this.from + this.returnUrl)
            } else if (data === 1) {
              // 认证失败
              tips = '真实姓名或身份证号错误，请核验!'
            } else if (data === 3) {
              tips = '参数错误'
            } else if (data === 4) {
              // tips = '您已经完成实名认证!'
              this.$replace('/legalizeResult?' + this.from + this.returnUrl)
            } else if (data === 5) {
              tips = '验证码错误!'
            } else if (data === 6) {
              tips = '身份证号已被使用!'
            } else {
              // tips = '认证失败!'
              // this.$go('/legalizeResult?' + this.from)
            }
            this.loading.status = false
            this.$nextTick(function() {
              this.toastShow(tips)
            })
          }
        })
        .catch(err => {
          this.loading.status = false
          this.$nextTick(function() {
            this.toastShow('提交失败!')
          })
        })
    },
    toastShow(tips) {
      this.toast.state = true
      this.toast.title = tips
    },
    validate(e, value) {
      if (e !== undefined) {
        var ele = e.target
        if (value === '') {
          var tips =
            ele.name === 'userName'
              ? '姓名不能为空!'
              : ele.name === 'userID' ? '身份证号不能为空!' : '验证码不能为空!'
          this.toastShow(tips)
        } else {
          if (ele.name === 'userName') {
            if (value.length === 1) {
              this.toastShow('姓名最少两个汉字!')
            }
          }
          if (ele.name === 'userID') {
            var is = this.checkID(value)
            if (!is) {
              this.toastShow('请输入正确的身份证号!')
            }
          }
        }
      } else {
        if (this.userName === '') {
          this.toastShow('姓名不能为空!')
          return false
        } else if (this.userName.length === 1) {
          this.toastShow('姓名最少两个汉字!')
          return false
        } else if (this.userId === '') {
          this.toastShow('身份证号不能为空!')
          return false
        } else if (!!this.userId && !this.checkID(this.userId)) {
          this.toastShow('请输入正确的身份证号!')
          return false
        } else if (this.code === '') {
          this.toastShow('验证码不能为空!')
          return false
        } else if (this.code.length < 6) {
          this.toastShow('验证码不能少于6位字符!')
          return false
        }
        return true
      }
    },
    checkID(ID) {
      var city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
      var birthday =
        ID.substr(6, 4) +
        '/' +
        Number(ID.substr(10, 2)) +
        '/' +
        Number(ID.substr(12, 2))
      var d = new Date(birthday)
      var newBirthday =
        d.getFullYear() +
        '/' +
        Number(d.getMonth() + 1) +
        '/' +
        Number(d.getDate())
      var currentTime = new Date().getTime()
      var time = d.getTime()
      var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var i,
        residue,
        sum = 0
      if (!/^\d{17}(\d|x)$/i.test(ID)) return false
      if (city[ID.substr(0, 2)] === undefined) return false
      if (time >= currentTime || birthday !== newBirthday) return false
      for (i = 0; i < 17; i++) {
        sum += ID.substr(i, 1) * arrInt[i]
      }
      residue = arrCh[sum % 11]
      if (residue !== ID.substr(17, 1)) return false
      return true
    }
  },
  created() {
    this.from = this.$route.query.from
    this.from = !!this.from ? 'from=' + this.from : ''
    this.returnUrl = this.$route.query.returnUrl || ''
    this.returnUrl = !!this.returnUrl ? 'returnUrl=' + this.returnUrl : ''

    this.getPhone()
  }
}
</script>
<style lang="scss" scoped>
.legalize {
  padding-top: 30px;
  padding-bottom: 50px;

  @include ui-1px(#e3e3e3,1px 0);
  dt {
    color: #30bf6c;
  }
  .btn-code {
    padding-right: 20px;
    padding-left: 20px;
    height: 57px;
    border-radius: 6px;
    line-height: 57px;
  }
  .ui-cells {
    margin-top: 120px;
    .ui-cell {
      margin-bottom: 30px;
      padding-right: 50px;
      padding-left: 50px;
    }
    .ui-cell__hd {
      width: 150px;
      text-align: right;
    }
    .ui-cell__bd {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;

      @include ui-1px(#e3e3e3,0 0 1px 0);
    }
  }
}
</style>
