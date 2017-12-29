<template>
	<container>
		<ui-header slot="header">
      <div class="title">
        {{$route.meta.title}}
        <!-- <router-link class="abs f32 g0 ml50" to="/rule">规则</router-link> -->
      </div>
    </ui-header>
    <scroller @on-scroller="scroller" :loading="isLoadingEnd">
		<div class="my-invite-top">
			<!-- <p class="reward">环保奖励（元）</p> -->
			<p class="reward">&nbsp;</p>
			<!-- <p class="bonus">{{bonus}}</p> -->
      <!-- <p class="bonus">&nbsp;</p> -->
			<p>您已成功邀请了{{count}}名环保卫士一同养树，</p>
			<p>地球有你，绿意盎然</p>
		</div>
		<div class="my-invite-content">
			<div class="my-invite-content-t">
				<!-- <div>进账时间</div> -->
				<!-- <div>产生用户</div> -->
				<!-- <div>金额（元）</div> -->
        <div>时间</div>
        <div>用户</div>
			</div>
				<ul v-if="data.length">
					<li v-for="(item,index) in data" :key="index">
						<div>{{item.createTime}}</div>
						<div class="ell">{{item.friendName}}</div>
						<!-- <div>{{item.money}}</div> -->
					</li>
				</ul>
		</div>
    </scroller>
    <div class="Placeholder"></div>
		<footer slot="footer" @click="onGoBack()">
			立即邀请
		</footer>
	</container>
</template>

<script>
import Container from "../container";
import { UiHeader, Scroller } from "~";
import { mapState, mapMutations } from "vuex";
import shareImg from "@/assets/shareimg.png";
export default {
  name: "MyInvite",
  components: { Container, UiHeader, Scroller },
  data() {
    return {
      bonus: "0.00",
      hasNext: true,
      count: "0",
      data: [],
      currentPage: 1,
      hasNext: true,
      isLoadingEnd: false,
      isLoading: false
    };
  },
  methods: {
    onGoBack() {
      var infoData = {
        url: "inviteLook?code=",
        title: "邀请好友拿环保奖励",
        description: "活动期间邀请好友完成认养，可获得好友认养费用一定比例的环保奖励",
        imgUrl:
          "http://fruit-picture.oss-cn-beijing.aliyuncs.com/fruit/share/shareimg.png"
      };
      if (typeof test !== "undefined") {
        test.shareWeb(JSON.stringify(infoData));
      } else if (typeof window.webkit !== "undefined") {
        window.webkit.messageHandlers.shareWeb.postMessage(infoData);
      } else {
      }
    },
    scroller(diff) {
      if (diff === 0 && !this.isLoading) {
        this.currentPage += 1;
        this.isLoadingEnd = true;
        this.getAjax();
      }
    },
    getAjax() {
      let _self = this;
      this.isLoading = true;
      this.$axios({
        method: "get",
        url:
          "/wap/usercount/countUserCommissions?page=" +
          this.currentPage +
          "&showNum=15",
        headers: { "X-Requested-With": "XMLHttpRequest" }
      }).then(res => {
        if (res.data.result.state == "1") {
          _self.count = res.data.downUser || "0";
          if (res.data.dataList.length > 0) {
            _self.data = this.data.concat(res.data.dataList);
            _self.bonus = res.data.money;
            this.$nextTick(function() {
              this.isLoadingEnd = false;
              this.isLoading = false;
            });
          } else {
            this.$nextTick(function() {
              this.isLoadingEnd = false;
            });
          }
        }
      });
    }
  },
  created() {
    this.getAjax();
  }
};
</script>

<style lang="scss" scoped>
.ml50 {
  margin-left: 212px;
}
.my-invite-top {
  width: 100%;
  height: 470px;
  background: url(../../assets/my-invite.png) no-repeat center center;
  background-size: cover;
  color: #6e7783;
  text-align: center;
  font-size: 28px;
  .reward {
    padding-top: 110px;
  }
  .bonus {
    color: #f9953c;
    font-size: 70px;
    line-height: 110px;
  }
}
.my-invite-content {
  background: #fff;
  color: #666;
  text-align: center;
  .my-invite-content-t {
    display: flex;
    justify-content: space-around;
    height: 90px;
    border-bottom: 1px solid #eee;
    font-size: 28px;
    line-height: 90px;
    div:nth-child(1) {
      width: 280px;
    }
    div:nth-child(2) {
      width: 280px;
    }
    div:nth-child(3) {
      width: 190px;
    }
  }
  ul {
    padding: 22px 0;
    font-size: 26px;
    li {
      display: flex;
      justify-content: space-around;
      height: 66px;
      line-height: 66px;
      div:nth-child(1) {
        width: 280px;
      }
      div:nth-child(2) {
        width: 280px;
      }
      div:nth-child(3) {
        width: 190px;
      }
    }
  }
}
.Placeholder {
  width: 100%;
  height: 98px;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 98px;
  background: #30bf6c;
  color: #fff;
  text-align: center;
  font-size: 34px;
  line-height: 98px;
}
</style>