<template>
	<container>
		<ui-header slot="header">
      <div class="title">
        {{$route.meta.title}}
        <!-- <router-link class="abs f32 g0 ml50" to="/rule">规则</router-link> -->
      </div>
    </ui-header>
    <div class="invite-bg">
	    <div class="describe">
	    	<!-- 我们会拿出您邀请用户认养总额的一部分来表彰您对环保事业所做出的贡献... -->
        地球有你，绿意盎然，赶快为您的好友送上一份环保邀请，邀请Ta和你一同做绿地的环保卫士吧
	    </div>
    	<!-- <p><router-link to="/rule">点击查看规则&gt;</router-link></p> -->
    </div>
    <div class="invite-bg-btm" slot="footer">
  		<div @click="onGoBack()">
  			立即邀请
  		</div>
    </div>
    
	</container>
</template>

<script>
import Container from '../container'
import { UiHeader } from '~'
export default {
  name: 'InviteFriends',
  components: { Container, UiHeader },
  methods: {
    onGoBack() {
      var infoData = {
        url: 'inviteLook?code=',
        title: '邀请好友拿环保奖励',
        description: '活动期间邀请好友完成认养，可获得好友认养费用一定比例的环保奖励',
        imgUrl:
          'http://fruit-picture.oss-cn-beijing.aliyuncs.com/fruit/share/shareimg.png'
      }

      if (typeof test !== 'undefined') {
        test.shareWeb(JSON.stringify(infoData))
      } else if (typeof window.webkit !== 'undefined') {
        window.webkit.messageHandlers.shareWeb.postMessage(infoData)
      } else {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ml50 {
  margin-left: 212px;
}

.invite-bg {
  position: relative;
  width: 100%;
  height: 1678px;
  // background: url(../../assets/invite-bg.jpg) no-repeat center center;
    background: url(../../assets/invite-bg1.jpg) no-repeat center center;
  background-size: cover;
  .describe{
		width: 450px;
		font-size: 30px;
		color: #a7944f;
		line-height: 40px;
		position: absolute;
		bottom: 360px;
		left: 152px;
	}
  > p {
    position: absolute;
    bottom: 232px;
    width: 100%;
    text-align: center;
    font-size: 32px;
    a {
      color: #ffbc58;
    }
  }
}
.invite-bg-btm {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 180px;
  background: url(../../assets/invite-bg-btm.png) no-repeat center center;
  background-size: cover;
  div {
    margin: 40px auto;
    width: 628px;
    height: 92px;
    border-radius: 28px;
    background: #ffbc58;
    color: #794e29;
    text-align: center;
    font-size: 44px;
    line-height: 92px;
  }
}
</style>