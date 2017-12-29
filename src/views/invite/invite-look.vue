<template>
<div class="content invite-look">
    <div class="wrapper">
	<div class="">
		<div class="invite-look-content">
			<div class="invite-look-content-t auto">
				<ul>
					<li>实时监控</li>
					<li>一键采摘</li>
					<li>安全加工</li>
					<li>智能物流</li>
				</ul>
			</div>
			<div class="invite-look-content-c">
				<p>想来一次新农业惊喜之旅吗</p>
				<p>您的好友<span>{{petName}}</span>邀请您认养果树</p>
			</div>
			<div class="invite-look-content-b">
				<ul>
					<li></li><li></li><li></li><li></li><li></li><li></li>
					<li></li><li></li><li></li><li></li><li></li><li></li>
					<li></li><li></li><li></li><li></li><li></li>
					<li></li><li></li><li></li><li></li><li></li>
				</ul>
				<div class="b-title">
					<p>加入我们</p>
					<p>共建农业新形态</p>
				</div>
				<div class="b-form">
					<div>
						<div><p></p></div>
						<p><input type="tel" maxlength="11" placeholder="请输入手机号" v-model="phone" @blur="phoneVerification()"/></p>
					</div>
					<div>
						<div><p></p></div>
						<p>
							<input type="number" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入验证码" v-model="verification" @blur="verificationCode()"/>
						</p>
						<p>
							<span v-show="timeShow">{{time}}s</span>
							<input class="getVftion" type="button" :value="cont" v-show="contShow" @click="getVerification()"/>
						</p>
					</div>
					<div>
						<div><p></p></div>
						<p><input type="password" placeholder="6-18位的大小写英文及数字密码" v-model="userPwd" @blur="pwdVerification()"/></p>
					</div>
					<div>
							<button @click="register()" :disabled="isDisabled">注册</button>
					</div>
					<div>
						<p @click="imgShow=!imgShow" class="argChecked" :class="{bgChecked:imgShow}"></p>
						<p class="protocol">我已阅读并同意<router-link to='/protocol' class="agreement">《万果田园用户协议》</router-link></p>
					</div>
				</div>
				<div class="b-b">
					<p>万果田园保留法律范围内的最终解释权</p>
					<p>如有疑问请拨打客服电话<a href="tel:010-83730520">010-83730520</a></p>
				</div>
			</div> 
		</div>
		<ui-toast v-model="toast.state" :content="toast.tips"/>
	</div>
  </div>
</div>
</template>

<script>
import Container from '../container'
import { mapState, mapMutations } from 'vuex'
import { UiToast } from '~'
import md5 from 'js-md5'
export default {
  name: 'InviteLook',
  components: { Container, UiToast },
  data() {
    return {
      toast: { state: false, tips: '' },
      imgShow: false,
      phone: '',
      verification: '',
      userPwd: null,
      cont: '获取验证码',
      time: 60,
      contShow: true,
      timeShow: false,
      petName: '',
      userId: null,
      isDisabled: false
    }
  },
  methods: {
    toastShow(tips) {
      this.toast.state = true
      this.toast.tips = tips
    },
    register() {
      if (!/^1[34578]\d{9}$/.test(this.phone) || this.phone == '') {
        this.toastShow('手机号码有误，请重填')
      } else if (
        !/^\d{6}$/.test(this.verification) ||
        this.verification == ''
      ) {
        this.toastShow('验证码有误，请重填')
      } else if (
        !/^[0-9A-Za-z]{6,18}$/.test(this.userPwd) ||
        this.userPwd == ''
      ) {
        this.toastShow('密码格式有误，请重填')
      } else if (this.imgShow == false) {
        this.toastShow('请您阅读万果田园用户注册协议')
      } else {
        this.isDisabled = true
        var formData = new FormData()
        formData.append('phone', this.phone)
        formData.append('type', 'invite')
        formData.append('smsCode', this.verification)
        formData.append('pwd', md5(this.userPwd))
        formData.append('userId', this.userId)
        this.$axios({
          method: 'post',
          url: '/wap/invite',
          data: formData,
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }).then(res => {
          if (res.data.result.state == '1') {
            this.$go('/registerSuccess')
          } else {
            this.toastShow(res.data.result.message)
          }
          this.isDisabled = false
        })
      }
    },
    getVerification() {
      if (!/^1[34578]\d{9}$/.test(this.phone) || this.phone == '') {
        this.toastShow('手机号码有误，请重填')
      } else {
        let vftionObj = {
          phone: this.phone,
          type: 'invite'
        }
        this.$axios({
          url: '/wap/send',
          method: 'post',
          params: vftionObj,
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }).then(res => {
          if (res.data.result.state == '1') {
            this.timeShow = true
            this.contShow = false
            let _self = this
            let timer = null
            timer = setInterval(function() {
              _self.time--
              if (_self.time < 0) {
                clearInterval(timer)
                _self.time = 60
                _self.timeShow = false
                _self.contShow = true
              }
            }, 1000)
          } else {
            this.toastShow(res.data.result.message)
          }
        })
      }
    },
    phoneVerification() {
      if (this.phone == '') {
        this.toastShow('手机号不能为空')
      } else if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.toastShow('手机号码有误，请重填')
      }
    },
    verificationCode() {
      if (this.verification == '') {
        this.toastShow('验证码不能为空')
      } else if (!/^\d{6}$/.test(this.verification)) {
        this.toastShow('验证码有误，请重填')
      }
    },
    pwdVerification() {
      if (this.userPwd == '') {
        this.toastShow('密码不能为空')
      } else if (!/^[0-9A-Za-z]{6,18}$/.test(this.userPwd)) {
        this.toastShow('密码格式有误，请重填')
      }
    }
  },
  created() {
    let _self = this
    var code = this.$route.query.code
    this.$axios({
      method: 'get',
      url: '/wap/getScanCode?code=' + code,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).then(res => {
      if (res.data.result.state == '1') {
        _self.petName = res.data.userInfo.petName
        _self.userId = res.data.userInfo.id
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.invite-look {
  top: 0 !important;
}
.invite-look-content {
  width: 100%;
  .invite-look-content-t {
    position: relative;
    background: url(../../assets/bg-invite-look-1.png) no-repeat center center;
    background-size: cover;
    ul {
      position: absolute;
      top: 55%;
      display: flex;
      justify-content: space-between;
      margin-left: 18%;
      width: 480px;
      height: 290px;
      color: #682c2f;
      font-weight: bold;
      font-size: 26px;
      line-height: 36px;
    }
  }
  .invite-look-content-c {
    height: 136px;
    color: #b09a4f;
    text-align: center;
    font-size: 30px;
    span {
      color: #a13d55;
      font-weight: bold;
    }
  }
  .invite-look-content-b {
    position: relative;
    background: #e47557;
    ul {
      position: absolute;
      top: -10px;
      display: flex;
      justify-content: space-around;
      width: 100%;
      li {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #e47557;
      }
    }
    .b-title {
      padding: 30px 0;
      height: 105px;
      color: #fff;
      text-align: center;
      p:first-child {
        font-size: 40px;
        line-height: 76px;
      }
      p:last-child {
        font-size: 30px;
        line-height: 45px;
      }
    }
    .b-form {
      margin-left: 30px;
      padding: 20px 55px;
      width: 580px;
      border-radius: 20px;
      background: #e9eabe;
      input {
        outline: none;
        border: none;
        background: #e9eabe;
        font-size: 28px;
      }
      :-moz-placeholder {
        color: #b09a4f;
        font-size: 28px;
      }
      ::-moz-placeholder {
        color: #b09a4f;
        font-size: 28px;
      }
      input:-ms-input-placeholder {
        color: #b09a4f;
        font-size: 28px;
      }
      input::-webkit-input-placeholder {
        color: #b09a4f;
        font-size: 28px;
      }
      > div {
        display: flex;
        width: 594px;
        height: 80px;
        border-bottom: 1px solid #b09e56;
        line-height: 80px;
        div:first-child {
          width: 54px;
        }
      }
      > div:first-child {
        p:first-child {
          margin: 34px auto 0;
          width: 20px;
          height: 26px;
          background: url(../../assets/icon-invite-phone.png) no-repeat center
            center;
          background-size: cover;
        }
      }
      > div:nth-child(2) {
        input {
          width: 358px;
        }
        p:first-child {
          margin: 36px auto 0;
          width: 24px;
          height: 22px;
          background: url(../../assets/icon-invite-verification.png) no-repeat
            center center;
          background-size: cover;
        }
        > p:last-child {
          margin-top: 24px;
          width: 170px;
          height: 36px;
          border-left: 1px solid #b09a4f;
          color: #e37657;
          text-align: center;
          font-size: 28px;
          line-height: 36px;
        }
        .getVftion {
          width: 100% !important;
          border: none;
          color: #e37657;
        }
      }
      > div:nth-child(3) {
        input {
          width: 400px;
        }
        p:first-child {
          margin: 30px auto 0;
          width: 22px;
          height: 28px;
          background: url(../../assets/icon-invite-password.png) no-repeat
            center center;
          background-size: cover;
        }
      }
      > div:nth-child(4) {
        margin-top: 46px;
        border: none;
        box-shadow: 0 10px 10px rgba(241, 127, 38, 0.4);
        button {
          width: 100%;
          height: 82px;
          outline: none;
          border: none;
          border-radius: 8px;
          background: #f5b410;
          color: #fff;
          text-align: center;
          font-size: 32px;
          line-height: 82px;
        }
      }
      > div:last-child {
        margin: 32px 0 20px 0;
        height: 36px;
        border: none;
        color: #666;
        font-size: 24px;
        line-height: 36px;
        .argChecked {
          margin: 0 20px;
          width: 26px;
          height: 26px;
          border: 1px solid #000;
          border-radius: 50%;
        }
        .protocol {
          width: 520px;
          /*line-height: 66px;*/
          .agreement {
            color: #e47557;
          }
        }

        img {
          margin: 0;
          width: 26px;
          height: 26px;
          vertical-align: top;
        }
      }
    }
    .b-b {
      padding: 30px 50px;
      width: 590px;
      height: 100px;
      color: #a7405b;
      font-size: 24px;
      p {
        line-height: 32px;
        a {
          color: #e9eabe;
        }
      }
    }
  }
}
.bgChecked {
  background: url(../../assets/icon-invite-read.png) no-repeat center center;
  background-size: cover;
}
.protocol {
  white-space: nowrap;
}
</style>