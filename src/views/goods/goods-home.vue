<template>
<div>
<div class="goods-home" v-if="hasLoadEnd">
  <div class="goods-home-bg baseWidth" :style="[{'background-image':'url('+bgImg+')'}]">
    <!-- <img :src="bgImg" alt=""> -->
    </div>
    <div class="orchard baseWidth">
      <!-- <transition name="slideOutLeft">
        <div class="orchard-tips g6 f26" v-if="tips.status">{{tips.list[tips.current].content}}</div>
      </transition>
      <transition name="fade">
        <div class="orchard-notice g6 f26" v-if="notices.status">共{{fruiter.num}}{{fruiter.unitDesc}}</div>
      </transition>   -->
      <img :src="goodsImg" :style="orchardStyle" ref="orchardImg">
    </div>
  <div class="goods-home-bg"
  v-if="!!layerImg"
  :style="[{'background-image':'url('+layerImg+')'}]"></div>
  <ui-header :styles="styles" :title="fruiter.goodsName"/>
  <div class="content">
    <div class="wrapper">
    <div class="weather-bg"></div>
    <div class="mask-layer baseWidth" :style="maskStyle"></div>
    <div class="home rel">
      <div class="abs weather-info">
        <div class="item f26 white tc parent-middle">
          <span class="dib vm" :class="['weather-small--'+baseInfo.weatherType]"></span>
          <span class="dib vm">{{baseInfo.temperature}}°</span></div>
        <div class="item tc rel dn">
          <div class="f26 white pt10">
            <span class="icon-leaf dib vm mr10"></span>
            良</div>
          <div class="icon-pm25 superb"></div>
        </div>
      </div>
      <!--  @click="onOrchard" -->
      <div class="home-main" :style="{height:ht}">
        <dl class="weather">
          <dt class="temperature white">{{fruiter.num*fruiter.sumtotal}}<em class="f32 pl10">{{fruiter.harvestUnitDesc}}</em></dt>
          <dd class="f32 white">预计总产量</dd>
          <dd class="f0 dn">
            <span class="dib vm f32 white">{{baseInfo.weather}}</span>
            <span class="dib vm f32 white">空气优</span>
            <router-link to="/walletHome" class="dib vm f32 white">钱包</router-link>
          </dd>
        </dl>
      </div>
      <div class="home-info">
        <!-- 果树信息 -->
        <dl class="mod-column mod-orchard" :class="{'active':!scrollTop}" :style="modStyle">
          <div class="mod-orchard--bg" :style="orchardBgStyle"></div>
          <dt class="mod-column-hd white f0">
            <span class="f32">{{fruiter.goodsName}}</span>
            <span class="f26 n">（预计产量{{fruiter.sumtotal}}{{fruiter.harvestUnitDesc}}/{{fruiter.unitDesc}}）</span>
          </dt>
          <dd class="mod-column-fd ui-cell white f26">
            <div class="ui-cell__bd pl50">植株年龄：{{fruiter.treeAge}}年</div>
            <div class="ui-cell__bd pl50">拥有总数：{{fruiter.num}}{{fruiter.unitDesc}}</div>
          </dd>
        </dl>
        <!-- 收益信息 -->
        <dl class="mod-column mod-income mt20" :style="modStyle">
          <dt class="mod-column-hd white f0">
            <span class="f32">收益信息</span>
            <span class="f26 n">（累计产量<em class="gfbd14b">{{fruiter.total}}</em>{{fruiter.harvestUnitDesc}}）</span>
            <!-- <span class="f26 n ml20" @click="onNext">下一个阶段</span> -->
          </dt>
          <dd class="mod-column-bd schedule" v-html="scheduleHtml">
          </dd>
          <dd class="mod-column-fd ui-cell white f26">
            <div class="ui-cell__bd pl50">预计产量：{{fruiter.sumtotal}}{{fruiter.harvestUnitDesc}}</div>
            <div class="ui-cell__bd pl50" style="white-space: nowrap;">终止时间：{{fruiter.endUseTime}}</div>
          </dd>
        </dl>
        <!-- 环境信息 -->
        <dl class="mod-column mt20 mod-weather" :style="modStyle">
          <dt class="mod-column-hd white f0">
            <span class="f32">环境信息</span>
          </dt>
          <dd class="mod-column-bd white">
            <!-- 环境天气 -->
            <div class="item ui-cell">
              <div class="ui-cell__hd f26">环境天气</div>
              <div class="ui-cell__bd tr f0">
                <span class="dib" :class="['weather-big--'+baseInfo.weatherType]"></span>
              </div>
              <div class="ui-cell__fd f26 ml20">{{baseInfo.weather}}</div>
            </div>
            <!-- 天气温度 -->
            <div class="item ui-cell">
              <div class="ui-cell__hd f26">天气温度</div>
              <div class="ui-cell__bd f0 pl20">
                <div class="mod-temperature dib">
                <span class="icon-temperature" :style="{'width':(Number(baseInfo.temperature-min)*2)+'%'}"></span>
                </div>
              </div>
              <div class="ui-cell__fd f26 ml20">{{baseInfo.temperature}}℃</div>
            </div>
            <!-- 空气质量 -->
            <div class="item ui-cell" v-if="false">
              <div class="ui-cell__hd f26">空气质量</div>
              <div class="ui-cell__bd f0 pl20">
                <div class="pm250">
                <span class="current">轻度</span>
                <div class="pm250-item" :style="{background:item.color}" v-for="(item,index) in pm250.level" :key="index">
                  <span class="f26">{{item.value}}</span>
                </div>
                </div>
              </div>
              <div class="ui-cell__fd f26 ml20">120</div>
            </div>
            <!-- 日照时间 -->
            <div class="item ui-cell"  v-if="false">
              <div class="ui-cell__hd f26">日照时间</div>
              <div class="ui-cell__bd f0 pl20">
                <div class="sunshine">
                  <span v-for="(item,index) in 11" :key="index"></span>
                </div>
              </div>
              <div class="ui-cell__fd f26 ml20">11h</div>
            </div>
          </dd>
        </dl>
        <!-- 基地信息 -->
        <dl class="mod-column mt20 mb20" :style="modStyle">
          <dt class="mod-column-hd white f0">
            <span class="f32">基地信息</span>
          </dt>
          <dd class="f26 white base-info" v-html="baseInfo.content"></dd>
        </dl>
      </div>
    </div>
    </div>
  </div>
</div>
<ui-loading :show-mask="false" v-model="showLoading"/>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { UiHeader, UiLoading } from '~'
import container from '../container'
export default {
  name: 'GoodsHome',
  components: {
    container,
    UiHeader,
    UiLoading
  },
  data() {
    return {
      ht: '',
      min: -10,
      max: 40,
      hasLoadEnd: true,
      showLoading: true,
      scrollTop: 0,
      styles: {
        opacity: 0
      },
      orchardBgStyle: { opacity: 0.8 },
      orchardStyle: {
        opacity: 1
      },
      maskStyle: { opacity: 0 },
      modStyle: {
        'background-color': 'rgba(25,46,64,0)'
      },
      pm250: {
        level: [
          {
            color: '#3ac569',
            value: 50,
            tips: ''
          },
          {
            color: '#fbd14b',
            value: 100,
            tips: ''
          },
          {
            color: ' #ffbc42',
            value: 150,
            tips: ''
          },
          {
            color: '#f17f42',
            value: 200,
            tips: ''
          },
          {
            color: '#a7405b',
            value: 300,
            tips: ''
          },
          {
            color: '#553660',
            value: 500,
            tips: ''
          }
        ],
        current: ''
      },
      tips: {
        status: false,
        current: -1,
        length: 3,
        list: [
          {
            text: `冷暖适宜, 感觉很舒适!1`,
            id: 1
          },
          {
            text: `冷暖适宜, 感觉很舒适!2`,
            id: 2
          },
          {
            text: `冷暖适宜, 感觉很舒适!3`,
            id: 3
          }
        ]
      },
      notices: { status: true },
      income: {
        current: -1,
        items: []
      },
      // 果树信息
      fruiter: {
        baseName: '',
        endUseTime: '',
        goodsName: '',
        num: '',
        sumtotal: '',
        total: '',
        treeAge: '',
        unitDesc: '',
        harvestUnitDesc: ''
      },
      // 天气信息
      baseInfo: {
        temperature: '',
        weatherNum: '',
        content: ''
      },
      // 对话
      bulletinList: [],
      bgImg: '',
      goodsImg: '',
      layerImg: ''
    }
  },
  computed: {
    bounding() {
      var ElementImg = this.$refs.orchardImg
      var rect = ElementImg.getBoundingClientRect()
      return rect
    },
    scheduleHtml() {
      var items = this.income.items
      var len = items.length
      var current = this.income.current
      var html =
        '<div class="income-schedule"><span style="width:' +
        (current + 1) / (len + 2) * 100 +
        '%"></span></div><ui class="schedule-list">' +
        '<li class="schedule-item ell tc"><div class="weight dib">300kg</div><div class="node auto icon-angle--00"><span></span></div><div class="tips tc">认购</div></li>'
      for (var i = 0; i < len; i++) {
        var item = items[i]
        html += `<li class="schedule-item ell tc${current >= i
          ? ' active'
          : ''}"><div class="weight dib">${item.weight}${this.fruiter
          .harvestUnitDesc}</div><div class="node auto icon-angle--0${current >=
        i
          ? len - current + i + 1
          : 0}"><span></span></div></div><div class="tips tc">${item.text.slice(
          0,
          8
        )}</div></li>`
      }
      return (
        html +
        '<li class="schedule-item ell tc"><div class="weight dib">300kg</div><div class="node auto icon-angle--00"><span></span></div><div class="tips tc">终止</div></li></ui>'
      )
    }
  },
  methods: {
    onNext() {
      var len = this.income.items.length + 1
      if (this.income.current >= len) {
        return (this.income.current = 0)
      }
      this.income.current += 1
    },
    onScroll() {
      var ElementHome = document.querySelector('.content')
      ElementHome.addEventListener('scroll', e => {
        this.scrollTop = e.target.scrollTop
      })
    },
    onOrchard(e) {
      var pageX = e.pageX
      var pageY = e.pageY
      var l = this.bounding.left
      var r = this.bounding.right
      var t = this.bounding.top
      var b = this.bounding.bottom
      if (this.scrollTop > 30) return
      if (pageX >= l && pageX < r && pageY >= t && pageY < b) {
        // this.tips.status = false
        // this.$nextTick(function() {

        if (!this.tips.status) {
          this.tips.current += 1
          this.notices.status = false
        } else {
          this.notices.status = true
        }

        this.tips.status = !this.tips.status
        if (this.tips.current >= this.tips.length) {
          this.tips.current = 0
        }
        // })
      }
    },
    schedule() {
      var income = document.querySelector('.income-schedule')
      var items = document.querySelectorAll('.schedule-item')
      var first = items[0]
      var last = items[items.length - 1]
      var firstNode = first.querySelector('.node')
      var firstNodeBoundary = firstNode.getBoundingClientRect()
      var lastNode = last.querySelector('.node')
      var lastNodeBoundary = lastNode.getBoundingClientRect()
      var size = cssrem.currentfontSize
      //  - 10
      income.style.left =
        (firstNodeBoundary.width + firstNode.offsetLeft) / size + 'rem'
      income.style.right =
        (firstNodeBoundary.width + firstNode.offsetLeft) / size + 'rem'
    },
    Ajax() {
      var id = this.$route.query.id
      var current = this.income.current
      var items = this.income.items
      var ugrsList
      this.$axios({
        method: 'get',
        url: '/wap/rights/getUserGoodsRight?id=' + id,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(res => {
          this.$nextTick(function() {
            this.showLoading = false
            this.hasLoadEnd = true
          })
          this.tips.list = res.data.bulletinList
          this.tips.length = res.data.bulletinList.length
          this.fruiter = res.data.rights
          ugrsList = res.data.ugrsList
          this.baseInfo = res.data.base
          var timeType = res.data.base.timeType
          if (timeType === '00') {
            // 白天
            this.bgImg = res.data.base.dayBackground
            this.layerImg = res.data.base.layerDayBackground
            this.goodsImg = res.data.rights.thumbDay
          } else {
            this.bgImg = res.data.base.nightBackground
            this.layerImg = res.data.base.layerNightBackground
            this.goodsImg = res.data.rights.thumbNight
          }

          for (var i = 0; i < ugrsList.length; i++) {
            var item = ugrsList[i]
            var state = item.state
            //暂时 01 显示
            if (state === '01') {
              this.income.current = i
              break
            }
          }
          for (var i = 0; i < ugrsList.length; i++) {
            var item = ugrsList[i]
            var state = item.state
            items.push({
              text: item.expectHarvestTime,
              weight: item.expectHarvest
            })
          }
        })
        .catch()
    }
  },
  watch: {
    scheduleHtml(val) {
      this.$nextTick(function() {
        this.schedule()
      })
    },
    scrollTop() {
      var content = document.querySelector('.content')
      var clientHeight = content.clientHeight
      var diff = (this.scrollTop / clientHeight).toFixed(2)
      diff = diff > 1 ? 1 : diff
      this.styles.opacity = diff > 0.9 ? 0.9 : diff
      this.maskStyle.opacity = diff > 0.68 ? 0.68 : diff

      this.orchardStyle.opacity = 1 - diff
      this.orchardBgStyle.opacity = 1 - diff - 0.2

      if (this.scrollTop > 30) {
        this.tips.status = this.notices.status = false
      }
      this.modStyle.backgroundColor =
        'rgba(25,46,64,' + (diff > 0.8 ? 0.8 : diff) + ')'
      content = clientHeight = diff = null
    }
  },
  created() {
    this.Ajax()
  },
  mounted() {
    this.onScroll()
    document.body.classList.add('goods-bg')

    var ht = document.documentElement.clientHeight
    var eh = parseFloat(
      getComputedStyle(document.querySelector('.header'), false).height
    )
    var d = parseFloat(
      getComputedStyle(document.querySelector('.mod-orchard'), false).height
    )

    this.ht =
      Math.floor(ht - eh - d - cssrem.currentfontSize) /
        cssrem.currentfontSize +
      'rem'
  },
  destroyed() {
    document.body.classList.remove('goods-bg')
    document.body.style.backgroundImage = ''
  }
}
</script>
<style lang="scss" src="@/styles/goods.scss"/>
<style lang="scss">
.Android {
  .content {
    top: 148px !important;
    .mask-layer {
      top: 146px;
    }
  }
}
.pl50 {
  padding-left: 50px;
}
.goods-bg {
  width: 100%;
  height: 100%;

  // background: url('../../assets/bg0.jpg') no-repeat center top;
  // background-attachment: fixed;
  // background-size: 750px 1334px;
}
.goods-home-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
  img {
    width: 100%;
  }
}
.goods-home {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  margin: auto;
  width: 100%;
  height: 100%;
  .content {
    top: 128px;
  }
  .header-bg {
    background-color: #063560;
    background-image: linear-gradient(to top, #152634 0%, #0b1621 100%);
  }
  .titlet-bar:before {
    border-color: rgba(255, 255, 255, 0.1);
  }
  .title {
    margin-left: 75px;
    color: #fff;
    text-align: left;
  }
  .btn-goback {
    background: url('../../assets/icon-goback--white.png') no-repeat;
    background-size: cover;
  }
}
.slideOutLeft-enter-active,
.slideOutLeft-leave-active {
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: translate3d(0, 0, 0);
}

.slideOutLeft-enter,
.slideOutLeft-leave-active {
  opacity: 0;
  transform: translate3d(50%, 0, 0);
}
.weather-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
