<template>
<transition name="fade">
  <div class="ui-toast" v-if="currentValue">
    <div class="ui-toast-main">
      <div class="ui-toast__text f30" v-html="content"><slot></slot></div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'UiToast',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String
    },
    type: {
      type: Number,
      default: 1
    },
    time: { type: Number, default: 2000 },
    content: String
  },
  data() {
    return {
      currentValue: undefined
    }
  },
  watch: {
    currentValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.currentValue = val
      this.autoClose()
    }
  },
  methods: {
    onShow() {
      this.currentValue = false
      this.$nextTick(function() {
        this.currentValue = true
      })
    },
    autoClose() {
      if (this.time === 0) return
      clearTimeout(this.times)
      this.times = setTimeout(() => {
        this.currentValue = false
      }, this.time)
    }
  },
  created() {
    this.currentValue = this.value
  }
}
</script>
<style lang="scss">
.ui-toast {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 90%;
  height: 0;
  text-align: center;
}
.ui-toast-main {
  display: inline-block;
  padding: 20px 40px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%);
}
.ui-toast__text {
  color: #ffffff;
}
</style>
