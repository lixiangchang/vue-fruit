<template>
<container>
	<div class="rule-content">
		<div class="reward auto">
			<div class="rule-content-title auto reward-bg"></div>
			<ul class="rule-content-c">
				<li class="auto">
					<img src="../../assets/num-one.png" class="rule-content-c-title">活动期间分享活动链接或者自己的二维码给好友，若好友通过您分享的链接或二维码注册并完成认养，您将获得其认养费用总额的10%作为环保奖励；
				</li>
				<li class="auto">
					<img src="../../assets/num-two.png" class="rule-content-c-title">该名用户进行认养后再分享给其他用户进行认养时，您将获得其他用户认养总额的5%作为间接环保奖励；
				</li>
				<li class="auto">
					<img src="../../assets/num-three.png" class="rule-content-c-title">若您是新用户，请您先完成认养再分享给好友，否则将不会获得环保奖励。
				</li>
			</ul>
		</div>
		<div class="reward-get">
			<div class="rule-content-title auto reward-get-bg"></div>
			<ul class="">
				<li class="auto bdr">您获得的环保奖励会直接进入您的余额中，您可在余额中进行提现操作，详情请到钱包中查看。</li>
			</li>
		</ul>
		<div class="rule-notice">
			<div class="rule-content-title auto reward-noyic-bg"></div>
			<ul class="rule-content-c">
				<li class="auto">
					<img src="../../assets/num-one.png" class="rule-content-c-title">本次活动时间为：2017年11月21日—2018年12月31日；
				</li>
				<li class="auto">
					<img src="../../assets/num-two.png" class="rule-content-c-title">若发现作弊行为，万果田园有权取消您参与活动的资格；
				</li>
				<li class="auto">
					<img src="../../assets/num-three.png" class="rule-content-c-title">万果田园在法律规定的范围内享有本次活动的最终解释权；
				</li>
				<li class="auto mb0">
					<img src="../../assets/num-four.png" class="rule-content-c-title">如果您有任何意见或建议，欢迎致电万果田园客服010-83730520。
				</li>
			</ul>
		</div>
	</div>
</div>
</container>
</template>

<script>
import Container from '../container'
export default {
  name: 'Rule',
  components: { Container }
}
</script>

<style lang="scss" scoped>
.ml50 {
  margin-left: 50px;
}
.rule-content-c .mb0 {
  margin-bottom: 0;
}
.rule-content {
  padding-bottom: 48px;
  width: 100%;
  height: auto;
  background: url(../../assets/rule-bg.png) repeat-y;
  background-size: 100%;
}
.reward {
  padding-top: 60px;
}
.rule-content-title {
  margin-bottom: 44px;
  width: 402px;
  height: 42px;
}
.reward-bg {
  background: url(../../assets/rule-reward.png) no-repeat center center;
  background-size: cover;
}
.reward-get-bg {
  background: url(../../assets/rule-get.png) no-repeat center center;
  background-size: cover;
}
.reward-noyic-bg {
  background: url(../../assets/rule-notice.png) no-repeat center center;
  background-size: cover;
}
.bdr {
  margin-bottom: 44px;
  padding: 30px 46px;
  width: 578px;
  border: 4px solid #79ccb9;
  border-radius: 8px;
  color: #fff;
  font-size: 26px;
}
.rule-content-c {
  li {
    margin-bottom: 60px;
    padding: 30px 46px;
    width: 578px;
    border-radius: 10px;
    background: rgba(23, 117, 96, 0.5);
    color: #fff;
    font-size: 26px;
    .rule-content-c-title {
      float: left;
      margin-top: -50px;
      margin-right: 18px;
      margin-left: -68px;
      width: 100px;
      height: 100px;
      background: #f9f7d0;
      color: #333;
      text-align: center;
      font-size: 70px;
      line-height: 100px;
    }
  }
}
</style>
