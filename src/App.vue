<template>
<div>
  <!-- <transition name="fade" mode="out-in"> -->
    <router-view v-wechat-title="$route.meta.title"/>
    <ui-toast class="layer-tips" v-model="gToast.state" :content="gToast.content" :time="gToast.time"></ui-toast>
  <!-- </transition> -->
</div>
</template>
<script>
import { mapState } from 'vuex'
import { UiToast } from '~'
export default {
  name: 'app',
  components: { UiToast },
  data() {
    return {}
  },
  computed: { ...mapState(['gToast']) }
}
</script>
<style lang="scss" src="@/styles/base.scss"/>
<style lang="scss" src="@/styles/anim.scss"/>
<style lang="scss" src="@/styles/wallet.scss"/>
<style lang="scss" src="@/styles/legalize.scss"/>
<style lang="scss" src="@/styles/snap.scss"/>
<style lang="scss">
.layer-tips {
  .ui-toast-main {
    padding: 0;
    width: 410px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 2px 13px rgba(0, 0, 0, 0.59);
    .ui-toast__text {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      height: 200px;
    }
  }
}
</style>
