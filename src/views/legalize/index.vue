<template>
  <container class="legalize-bg">
    <div class="user-info">
      <div class="head-photo">
        <img :src="headerPhoto" alt="">
      </div>
      <div class="legalize-feature" v-if="code===4"></div>
      <div class="legalize-feature legalize-feature--failure" v-else-if="code===3"></div>
      <div class="m20 p20"></div>
      <dl class="mt20 pt20 tc">
        <!-- 正在审核 -->
        <dt class="mt20">{{userName}}</dt>
        <dd>
          <span class="dib vm legalize-icon marked-legalize-success" v-if="code===4"></span>
          <span class="dib vm legalize-icon marked-legalize-failure" v-else-if="code===3||code===2"></span>
        </dd>
        <dd class="f24 g9 mt20 pt10" v-if="code===4||code===2">{{card}}</dd>
        <dd class="f24 g9 mt20 pt10" v-else>&nbsp;</dd>
        <dd class="text-primary f0" v-if="code===3">
          <span class="dib vm icon-legalize--02"></span>
          <span class="dib vm f24 ml10">
            身份信息与证件信息不一致，请重新认证
            <!-- {{tips}} -->
            </span></dd>
      </dl>
      </div>
      <div class="p20"></div>
      <div class="tc m20 p20" v-if="code===3">
        <router-link to="/verified" replace class="ui-btn ui-btn--primary db m20 f36 white" href="javascript:;">重新认证</router-link>
      </div>
      <!-- <div class="tc m20 p20" v-if="code===2">
        <a class="ui-btn ui-btn--primary db m20 f36 white" href="javascript:;"
        >审核中</a>
      </div> -->
    <div class="tc legalize-tips f0">
      <i class="dib vm icon-legalize--08 mr10"></i>
      <span class="dib vm f24 g9">万果田园保障您的账户安全</span>
    </div>
  </container>
</template>
<script>
import headPhoto from '@/assets/headPhoto.png'
import Container from '../container'
export default {
  name: 'legalizeHome',
  components: { Container },
  data() {
    return {
      userName: '',
      card: '',
      code: 0,
      tips: '',
      headerPhoto: ''
    }
  },
  methods: {
    fetchData() {
      this.$axios({
        method: 'get',
        url: '/wap/account/isReal',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          var data = res.data.data.status
          var message = res.data.message
          var status = res.data.status
          this.card = res.data.data.card
          this.quick = res.data.data.quick
          this.code = data
          this.headerPhoto = res.data.data.header || headPhoto
          if (status !== '200') {
            this.toast.state = false
            this.toast.tips = message
            return
          }
          if (data === 1) {
            // 未申请认证
          } else if (data === 2) {
            // 申请认证未审核
            this.userName = '认证中'
          } else if (data === 3) {
            this.tips = message
            this.userName = '认证失败'
            // 实名认证审核未通过
          } else if (data === 4) {
            // 实名认证审核已通过
            if (typeof test !== 'undefined') {
              test.refreshUserInfo()
            } else if (typeof window.webkit !== 'undefined') {
              window.webkit.messageHandlers.refreshUserInfo.postMessage('1111')
            }
            this.userName = res.data.data.name
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
<style lang="scss">
.legalize-tips {
  position: fixed;
  bottom: 26px;
  left: 0;
  width: 100%;
}
.legalize-bg {
  .header-bg {
    display: none;
  }
  .btn-goback {
    background-image: url('../../assets/icon-goback--white.png');
    background-size: cover;
  }
  .titlet-bar {
    color: #fff;
    &:before {
      display: none;
    }
  }
  .user-info {
    position: relative;
    margin-top: 100px;
    margin-right: 30px;
    margin-left: 30px;
    padding-bottom: 70px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  }
}
.head-photo {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  margin: auto;
  width: 166px;
  height: 166px;
  border: 3px solid #ffffff;
  border-radius: 100px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.24);
  transform: translateY(-50%);
  img {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>

