<template>
  <container>
    <div class="ui-cell bgwh p20">
      <div class="ui-cell__bd">
        <p class="f40 text-primary">您还未实名认证</p>
        <p class="g9 f28">便于保障您的账户安全</p>
      </div>
      <div class="ui-cell__fd">
        <span class="dib icon-verified"></span>
      </div>
    </div>
    <!-- 完善基本信息 -->
    <dl>
      <dt class="g3 g6 f28 tc pt20 pb20 n">完善基本信息</dt>
      <dd class="ui-cells base-info bgwh f32">
        <div class="ui-cell">
        <div class="ui-cell__hd pr20">真实姓名</div>
        <div class="ui-cell__bd">
           <ui-input
           name="userName"
           :max="15"
           v-model="userName"
           placeholder="请输入真实姓名"
           @on-blur="onValidate"
           />
        </div>
      </div>
      <div class="ui-cell">
        <div class="ui-cell__hd pr20">身份证号</div>
        <div class="ui-cell__bd">
          <ui-input
           name="userID"
           :max="18"
          v-model="userId"
          placeholder="请输入18位身份证号"
          @on-blur="onValidate"
          />
        </div>
      </div>
      <div class="ui-cell">
        <div class="ui-cell__hd pr20">&emsp;手机号</div>
        <div class="ui-cell__bd">
          <ui-input
           :value="'+86  '+phone"
          disabled
          />
        </div>
      </div>
      <div class="ui-cell">
        <div class="ui-cell__hd pr20">&emsp;验证码</div>
        <div class="ui-cell__bd">
          <ui-input
           type="tel"
           name="code"
           v-model="code"
           :max="6"
           placeholder="短信验证码"
           @on-blur="onValidate"
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
    </dl>
    <!-- 请上传身份证照片 -->
    <form ref="form">
    <dl>
      <dt class="g3 g6 f28 tc pt20 pb20 n">请上传身份证照片</dt>
      <dd class="ui-cell pl20 pr20">
        <div class="ui-cell__bd IDCard-upload" v-for="(item,index) in IDCards" :key="item.id">
          <div class="IDCard-photo">
            <img :src="item.src">
            <input class="vh" :name="item.name" :id="'upload-file--0'+index" type="file" accept="image/*" @change="readFile($event,index)">
            <label class="IDCard-upload__btn parent-middle"
            :class="{'active':!!base64s[index]}" :for="'upload-file--0'+index"
            ></label>
          </div>
          <p class="f32 g3">{{item.title}}</p>
        </div>
      </dd>
    </dl>
    </form>
    <dl class="bgwh mt20 p20 IDCard-tips">
      <dt class="g3 g6 f28 tl pb20 n">请拍摄身份证原件：</dt>
      <dd class="ui-cell">
        <div class="ui-cell__bd">
          <div class="IDCard-tips-status">
            <img src="../../assets/IDCard-bz.png" alt="">
          </div>
          <p class="f24 g6">标准拍摄</p>
        </div>
        <div class="ui-cell__bd">
          <div class="IDCard-tips-status">
            <img src="../../assets/IDCard-bk.png" alt="">
          </div>
          <p class="f24 g6">边框缺失</p>
        </div>
        <div class="ui-cell__bd">
          <div class="IDCard-tips-status">
            <img src="../../assets/IDCard-mh.png" alt="">
          </div>
          <p class="f24 g6">边框缺失</p>
        </div>
        <div class="ui-cell__bd">
          <div class="IDCard-tips-status">
            <img src="../../assets/IDCard-sg.png" alt="">
          </div>
          <p class="f24 g6">闪光强烈</p>
        </div>
      </dd>
      <dd class="m20 p20">
        <a class="ui-btn ui-btn--disabled db f32" href="javascript:;"
        v-if="userName===''||userId===''"
        >提交</a>
        <a class="ui-btn ui-btn--primary db f32" href="javascript:;"
        @click="submitUpload"
        v-else
        >提交</a>
      </dd>
    </dl>
    <ui-toast v-model="toast.state" :content="toast.title"></ui-toast>
    <ui-loading v-model="loading.status">{{loading.tips}}</ui-loading>
    <ui-dialog v-model="dialog.state"
    @on-hide="onHide"
    @on-show="onShow"
    type="dialog"
    :tips="dialog.tips"></ui-dialog>
  </container>
</template>
<script>
import Container from '../container'
import { UiInput, UiToast, UiLoading, UiDialog } from '~'
export default {
  name: 'Verified',
  components: { Container, UiInput, UiToast, UiLoading, UiDialog },
  data() {
    return {
      dialog: {
        state: false,
        tips: '<p class="f32 g3">您还未完成实名认证，确认</p><p class="f32 g3">要退出吗？</p>'
      },
      loading: {
        status: false,
        tips: '提交中...'
      },
      toast: {
        state: false,
        title: ''
      },
      imgtype: '',
      userName: '',
      userId: '',
      IDCards: [
        {
          id: 1,
          name: 'imgFront',
          src: require('@/assets/IDCard-front.png'),
          title: '上传人像页照片'
        },
        {
          id: 2,
          name: 'imgCon',
          src: require('@/assets/IDCard-obverse.png'),
          title: '上传国徽页照片'
        }
      ],
      base64s: ['', ''],
      files: ['', ''],
      phone: '',
      code: '',
      second: 60
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
    onBack() {},
    onHide() {
      this.dialog.state = false
    },
    onShow() {},
    submitUpload() {
      this.onValidate()
    },
    countdown() {
      this.second -= 1
      if (this.second <= 0 && this.time) {
        this.second = 60
        return clearTimeout(this.time)
      }
      this.time = setTimeout(this.countdown, 1000)
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
    onSMS() {
      this.$axios({
        method: 'get',
        url: '/wap/account/sendCertApplyByHuman',
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
    submitPhoto() {
      this.loading.status = true
      var formData = new FormData()
      formData.append('imgFront', this.files[0])
      formData.append('imgCon', this.files[1])
      this.$axios({
        method: 'post',
        url: '/wap/user/cardPic',
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          var state = res.data.result.state
          var message = res.data.result.message
          if (state === '1') {
            this.submitData(res.data.imgFront, res.data.imgCon)
          } else {
            this.toastShow('身份证上传失败!')
          }
        })
        .catch(err => {
          this.loading.status = false
          this.$nextTick(function() {
            this.toastShow('上传失败!')
          })
        })
    },
    submitData(imgFront, imgCon) {
      var form = new FormData()
      form.append('name', this.userName)
      form.append('idcard', this.userId)
      form.append('code', this.code)
      form.append('type', '00')
      form.append('imgFront', imgFront)
      form.append('imgCon', imgCon)
      this.$axios({
        method: 'post',
        url: '/wap/account/applyCertification',
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
          // 4 已实名认证
          if (data === 0) {
            // 申请成功
            this.$replace('/legalizeHome')
            return
          } else if (data === 1) {
            // 验证码 错误
            tips = '验证码错误!'
          } else if (data === 2) {
            // 参数错误
          } else if (data === 3) {
            // 身份证已经有人使用
            tips = '身份证已经有人使用!'
          } else if (data === 4) {
            // 已实名认证
            tips = '已完成实名认证!'
          }

          this.loading.status = false
          this.$nextTick(function() {
            this.toastShow(tips)
          })
        })
        .catch(err => {
          this.loading.status = false
          this.$nextTick(function() {
            this.toastShow('上传失败!')
          })
        })
    },
    onValidate(e, value) {
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
        } else if (this.base64s[0] === '') {
          this.toastShow('请上传人像页照片!')
          return false
        } else if (this.base64s[1] === '') {
          this.toastShow('请上传国徽页照片!')
          return false
        }
        this.submitPhoto()
      }
    },
    // 实名认证状态
    isReal() {
      this.$axios({
        method: 'get',
        url: '/wap/account/isReal',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          var data = res.data.data
          var message = res.data.message
          var status = res.data.status
          var istatus = data.status
          var card = data.card
          var name = data.name
          if (status !== '200') {
            this.toast.state = false
            this.toast.tips = message
            return
          }
          this.userName = name
          this.userId = card
        })
        .catch(err => {
          console.log(err)
        })
    },
    toastShow(tips) {
      this.toast.state = true
      this.toast.title = tips
    },
    readFile(e, index) {
      var target = e.target
      var file = target.files[0]
      if (!file) return
      this.imgtype = file.type
      var fileRead = new FileReader()
      fileRead.onload = fre => {
        var base64 = fre.target.result
        this.reduceImg(base64, index)
        this.IDCards[index].src = base64
        this.base64s[index] = base64
      }
      fileRead.readAsDataURL(file)
    },
    reduceImg(file, index) {
      var image = new Image()
      var _this = this
      image.onload = function() {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        var imgW, imgH, imgWidth, imgHeight, nBase64, clientWidth, scale
        clientWidth = document.body.clientWidth
        imgW = image.width
        imgH = image.height
        scale = 1
        imgWidth = clientWidth * scale
        if (imgWidth < imgW) {
          imgHeight = imgWidth / imgW * imgH
        } else {
          imgWidth = imgW
          imgHeight = imgH
        }
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight)
        nBase64 = canvas.toDataURL(_this.imgtype, 0.5)
        _this.files[index] = _this.dataURLtoBlob(nBase64)
      }
      image.src = file
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
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
    this.isReal()
    this.getPhone()
  }
}
</script>
<style lang="scss">
.base-info {
  @include ui-1px(#f1f1f1,1px  0);
  &.ui-cells {
    padding: 0;
  }
  .ui-cell {
    margin-right: 20px;
    margin-left: 20px;
    padding-top: 24px;
    padding-bottom: 24px;

    @include ui-1px(#f1f1f1,1px 0 0 0);
  }
  .btn-code {
    padding-right: 20px;
    padding-left: 20px;
    height: 57px;
    border-radius: 6px;
    line-height: 57px;
  }
}

.IDCard-upload {
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
.IDCard-photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-bottom: 10px;
  margin-left: auto;
  width: 260px;
  height: 164px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.IDCard-upload__btn {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  &.active {
    &:before {
      display: none;
    }
  }
  &:before {
    display: inline-block;
    width: 108px;
    height: 108px;
    border-radius: 50%;
    background: #30bf6c url('../../assets/icon-plus.png') no-repeat center;
    background-size: 40px;
    content: '';
    vertical-align: middle;
  }
}
.IDCard-tips {
  .ui-cell__bd {
    text-align: center;
    &:not(:first-child) {
      .IDCard-tips-status:after {
        background: url('../../assets/icon-error.png') no-repeat;
        background-size: cover;
      }
    }
  }
}
.IDCard-tips-status {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-bottom: 50px;
  margin-left: auto;
  width: 148px;
  height: 112px;
  background-color: #f9f9f9;
  &:after {
    position: absolute;
    right: 0;
    bottom: -5px;
    left: 0;
    display: block;
    margin: auto;
    background: url('../../assets/icon-correct.png') no-repeat;
    background-size: cover;
    content: '';
    transform: translateY(100%);
  }
  img {
    max-width: 118px;
    max-height: 76%;
  }
}
</style>
