<template>
  <div class="mod-scroller">
    <slot name="default"></slot>
    <slot name="tips">
      <div class="loading-tips f28 g6 tc pt20 pb20" v-if="loading">
        <div class="dib vm">数据加载中</div>
        <div class="spinner dib vm">
          <div class="bounce1 dib vm"></div>
          <div class="bounce2 dib vm"></div>
          <div class="bounce3 dib vm"></div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'Scroller',
  props: {
    loading: Boolean
  },
  data() {
    return {}
  },
  methods: {
    onScroller(e) {
      var _this = e.target || e
      var cht = _this.clientHeight
      var sht = _this.scrollHeight
      var top = _this.scrollTop
      var diff = sht - cht - top
      this.$emit('on-scroller', diff, top, _this)
      _this = cht = sht = top = diff = null
    }
  },
  created() {},
  mounted() {
    var eContent = document.querySelector('.content')
    var scroller = this.onScroller.bind(this)
    // eContent.removeEventListener('scroll', onScroller)
    eContent.addEventListener('scroll', scroller)
  },
  updated() {
    // var eContent = document.querySelector('.content')
    // this.onScroller(eContent)
  }
}
</script>
<style lang="scss" scoped>
.spinner > div {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #666;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.spinner .bounce1 {
  animation-delay: -0.32s;
}
.spinner .bounce2 {
  animation-delay: -0.16s;
}
@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
