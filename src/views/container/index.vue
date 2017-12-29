<template>
<div>
  <slot name="header">
    <ui-header :title="$route.meta.title"/>
  </slot>
  <div class="content">
    <div class="wrapper">
      <slot></slot>
      <!-- <ui-loading :show-mask="false" v-model="showLoading"></ui-loading> -->
    </div>
  </div>
  <slot name="footer"></slot>
</div>
</template>
<script>
import { UiHeader, UiLoading } from '~'
export default {
  name: 'container',
  components: {
    UiHeader,
    UiLoading
  },
  props: {},
  data() {
    return {
      showLoading: true
    }
  },
  methods: {}
}
</script>
<style lang="scss">
.content {
  top: 128px;
}
.Android {
  .content {
    top: 148px;
  }
}
</style>
