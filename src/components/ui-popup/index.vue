<template>
  <div class="mod-popup">
    <transition name="fade">
      <div class="ui-mask" @click="onexit" v-show="value"></div>
    </transition>
    <transition name="slideInUp">
      <div class="mod-popup-content" v-show="value" :style="styles">
        <slot>sadd</slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'UiPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    height: String,
    width: String,
    position: {
      type: String,
      default: 'bottom'
    },
    HideOnBlur: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    styles() {
      var styleObj = {}
      if (this.width) {
        styleObj.width = this.width
      } else if (this.height) {
        styleObj.height = this.height
      }
      return styleObj
    }
  },
  methods: {
    onexit() {
      this.$emit('on-hide')
    }
  },
  created() {}
}
</script>
<style lang="scss">
.mod-popup {
}

.mod-popup-content {
  position: fixed;
  bottom: 0;
  left: 0;
  max-height: 100%;
  width: 100%;
  background-color: #fff;
}

.slideInUp-enter-active,
.slideInUp-leave-active {
  transition: transform 0.2s;
}

.slideInUp-enter,
.slideInUp-leave-active {
  transform: translate3d(0, 100%, 0);
}
</style>
