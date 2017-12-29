<template>
  <header class="header" :class="addClass" @touchmove="onScroller" ref="header">
    <div class="header-bg" :style="styles"></div>
    <div class="titlet-bar">
      <a href="javascript:;" class="btn-goback dib" @click="onGoBack"></a>
      <slot>
        <div class="title" v-html="title"></div>
      </slot>
    </div>
  </header>
</template>
<script>
export default {
  name: 'UiHeader',
  props: {
    title: String,
    addClass: String | Object,
    styles: String | Object
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onScroller(e) {
      e.preventDefault()
    },
    onGoBack() {
      var name = this.$route.name
      if (name === 'WalletHome') {
        if (typeof test !== 'undefined') {
          test.webViewClose()
        } else if (typeof window.webkit !== 'undefined') {
          window.webkit.messageHandlers.webViewClose.postMessage('1111')
        } else {
          this.$router.back()
        }
        // } else if (name === 'LegalizeHome') {
        //   this.$go('/WalletHome')
        // } else if (name === 'WithdrawResult') {
        //   this.$go('/WalletHome')
      } else {
        if (typeof test !== 'undefined') {
          test.canJsGoBack()
        } else if (typeof window.webkit !== 'undefined') {
          window.webkit.messageHandlers.canJsGoBack.postMessage('1111')
        } else {
          this.$router.back()
        }
      }
    }
  },
  created() {},
  mounted() {
    // if (typeof test === 'undefined' || typeof window.webkit === 'undefined') {
    //   this.$refs.header.classList.add('header--dn')
    // }
  }
}
</script>
<style lang="scss">
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.Android {
  .titlet-bar {
    margin-top: 20px;
  }
}
header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
  padding-top: 40px;
  width: 100%;
  font-size: 0;
  .titlet-bar {
    height: 87px;
    line-height: 87px;

    @include ui-1px(#e3e3e3,0 0 1px 0);
  }
  .title {
    text-align: center;
    font-weight: 400;
    font-size: 36px;
  }
  .btn-goback {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0px;
    z-index: 2;
    margin: auto;
    padding: 40px;
    border: 0;
    background: url('../../assets/icon-goback.png') no-repeat;
    background-position: center !important;
    background-size: 19px 33px !important;
  }
}
</style>
