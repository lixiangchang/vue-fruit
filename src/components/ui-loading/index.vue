<template>
<div class="ui-loading-content">
  <transition name="fade" v-if="ShowMask">
  <div class="ui-mask" v-if="value"></div>
  </transition>
  <transition name="fade">
  <div class="ui-loading" v-if="value">
    <div class="ui-loading-list">
      <div :class="['ui-loading-item','rect'+item]" 
      v-for="(item,index) in 8" 
      :key="index"></div>
    </div>
    <div class="ui-loading-text">
        <slot>加载中</slot>
    </div>
  </div>
</transition>
</div>
</template>
<script>
export default {
  name: 'UiLoading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Boolean,
      default: false
    },
    ShowMask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.ui-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  padding-top: 30px;
  padding-bottom: 30px;
  // width: 200px;
  min-width: 200px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  transform: translate3d(-100px, -100px, 0);
}
.ui-loading-text {
  padding-top: 10px;
  color: #ffffff;
  text-align: center;
  font-size: 20px;
}
.ui-loading-list {
  position: relative;
  margin-right: auto;
  margin-left: auto;
  width: 100px;
  height: 100px;
  transform: scale(0.7);
}
.ui-loading-item {
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #fff;
}

.ui-loading {
  .rect1 {
    top: 50%;
    left: 0;
    margin-top: -5px;
    animation-delay: 0.16s;
  }
  .rect2 {
    top: 20px;
    left: 10px;
    transform: rotate(45deg);
    animation-delay: 0.26s;
  }
  .rect3 {
    top: 10px;
    left: 50%;
    margin-left: -15px;
    transform: rotate(90deg);
    animation-delay: 0.39s;
  }
  .rect4 {
    top: 20px;
    right: 10px;
    transform: rotate(135deg);
    animation-delay: 0.52s;
  }
  .rect5 {
    top: 50%;
    right: 0;
    margin-top: -5px;
    transform: rotate(180deg);
    animation-delay: 0.65s;
  }
  .rect6 {
    right: 10px;
    bottom: 20px;
    transform: rotate(225deg);
    animation-delay: 0.78s;
  }
  .rect7 {
    bottom: 10px;
    left: 50%;
    margin-left: -15px;
    transform: rotate(270deg);
    animation-delay: 0.91s;
  }
  .rect8 {
    bottom: 20px;
    left: 10px;
    transform: rotate(315deg);
    animation-delay: 1.04s;
  }
}
</style>
