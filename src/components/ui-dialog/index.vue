<template>
  <div class="ui-dialog">
    <transition name="fade">
      <div class="ui-mask" 
        v-if="HideOnBlur" 
        @click="onCancel" 
        v-show="value"></div>
      <div class="ui-mask" 
      v-else 
      v-show="value"></div>
    </transition>
    <transition name="zoom">
      <div class="ui-dialog-main f32" v-show="value">
        <slot>
        <!-- <slot name="main"> -->
          <div class="ui-dialog__title g3 b">{{title}}</div>
          <div class="ui-dialog__content g6" v-html="tips"></div>
        <!-- </slot> -->
        <div class="ui-dialog-op f32" v-if="hasAlert">
          <a class="ui-dialog__btn ui-dialog__btn--primary" href="javascript:;" @click="onConfirm">
            {{!!btn&&typeof btn ==='string'?btn:'确认'}}
          </a>
        </div>
        <div class="ui-dialog-op f32" v-else>
          <a class="ui-dialog__btn" href="javascript:;" 
            @click="onCancel">{{btn[0]||'取消'}}</a>
          <a class="ui-dialog__btn ui-dialog__btn--primary" href="javascript:;"   @click="onConfirm">{{btn[1]||'确认'}}</a>
        </div>
        </slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'UiDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String
    },
    type: {
      type: String,
      default: 'Alert'
    },
    HideOnBlur: {
      type: Boolean,
      default: true
    },
    btn: {
      type: String | Array,
      default: ''
    }
  },
  data() {
    return {
      currentValue: ''
    }
  },
  computed: {
    hasAlert() {
      return this.type.toLowerCase() === 'alert'
    }
  },
  methods: {
    onCancel() {
      this.$emit('on-hide')
    },
    onConfirm() {
      this.$emit('on-show')
    }
  },
  created() {
    this.currentValue = this.value || false
  }
}
</script>
<style lang="scss">
.ui-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.6);
}

.ui-dialog {
  position: relative;
}

.ui-dialog-main {
  position: fixed;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin: auto;
  max-width: 600px;
  width: 80%;
  border-radius: 3px;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0 5px 13px 1px rgba(0, 0, 0, 0.18);
  text-align: center;
  transform: translate(-50%, -50%);
}

.ui-dialog__title {
  padding-top: 30px;
}

.ui-dialog__content {
  padding: 30px 20px 50px;
}

.ui-dialog-op {
  display: flex;
  overflow: hidden;
  height: 90px;
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: 18px;
  line-height: 90px;

  @include ui-1px(#ccc,1px 0 0 0);
}

.ui-dialog__btn {
  flex: 1;
  color: #666;

  -webkit-user-select: none;
  &:not(:last-child) {
    @include ui-1px(#ccc, 0 1px 0 0);
  }
  &:active {
    background-color: rgba(238, 238, 238, 0.9);
  }
}

.ui-dialog__btn--primary {
  color: #0bb200;
}
</style>
