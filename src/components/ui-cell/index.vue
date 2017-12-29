<template>
  <div class="ui-cell">
    <div class="ui-cell__hd"></div>
    <div class="ui-cell__bd"></div>
    <div class="ui-cell__fd"></div>
  </div>
</template>
<script>
export default {
  name: 'UiCell',
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.ui-cell {
  display: flex;
  align-items: center;
}
.ui-cell__bd {
  flex: 1;
}
</style>
