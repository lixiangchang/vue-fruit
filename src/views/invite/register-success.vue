<template>
	<div class="register-success">
		<div class="rs-content">
			<p></p>
			<p>恭喜您注册成功</p>
			<p>欢迎您加入万果田园</p>
		</div>
		<a class="download-btn db" href="javascript:;" @click="explainSow">立即前往下载</a>
		<div class="bgColor"></div>
		<div class="explain" v-show="isShow">
			<div class="rs-arrow"><img src="../../assets/rs-arrow.png" /></div>
			<div class="rs-browser">
				<p>1.点击右上角</p>
				<p>2.选择<img src="../../assets/rs-browser.png" alt="" />[在浏览器中打开]</p>
			</div>
			<div class="rs-know" @click="isShow=!isShow">
				<img src="../../assets/rs-know.png" alt=""/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'RegisterSuccess',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    explainSow() {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      var ua = u.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        if (isIOS) {
          location.href =
            'https://itunes.apple.com/cn/app/%E4%B8%87%E6%9E%9C%E7%94%B0%E5%9B%AD/id1316878966?mt=8'
        } else {
          this.isShow = true
        }
      } else {
        if (isAndroid) {
          location.href =
            'http://fruit-picture.oss-cn-beijing.aliyuncs.com/fruit/apk/Android/fruit.apk'
        } else if (isIOS) {
          location.href =
            'https://itunes.apple.com/cn/app/%E4%B8%87%E6%9E%9C%E7%94%B0%E5%9B%AD/id1316878966?mt=8'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-success {
  position: relative;
  width: 100%;
  height: 1334px;
  background-color: #ff7635;
  background-image: url(../../assets/register-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  .explain {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .rs-arrow {
      margin-top: 306px;
      margin-left: 480px;
      width: 160px;
    }
    .rs-arrow img {
      width: 100%;
    }
    .rs-browser {
      margin-left: 142px;
      color: #fff;
      font-size: 34px;
    }

    .rs-browser img {
      height: 36px;
      vertical-align: middle;
    }
    .rs-browser p {
      height: 46px;
      line-height: 46px;
    }
    .rs-know {
      margin: 168px auto;
      width: 33.06%;
    }
    .rs-know img {
      width: 100%;
    }
  }
  .rs-content {
    padding-top: 236px;
    text-align: center;
    > p:first-child {
      margin: 0 auto;
      width: 122px;
      height: 122px;
      background: url(../../assets/register-success.png) no-repeat;
      background-size: cover;
    }
    > p:nth-child(2) {
      margin-top: 50px;
      color: #fff;
      font-size: 70px;
    }
    > p:nth-child(3) {
      margin-top: 58px;
      color: #ffdd89;
      font-size: 34px;
    }
  }
  .download-btn {
    margin: 396px auto 0;
    width: 590px;
    height: 90px;
    border-radius: 10px;
    background: #60bb74;
    color: #fdfffd;
    text-align: center;
    font-size: 32px;
    line-height: 90px;
  }
  .bgColor {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    background: #ffdd89;
  }
}
</style>
