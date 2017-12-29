<template>
<container>
  <div class="mod-tips tc" v-if="isNull">
    <div class="m20 p20"></div>
    <div class="dib vm mt20 pt20">
      <div class="data-tips--01 mb20"></div>
      <p class="f28 g9 mt20 pt20">您暂时没有明细记录哦~</p>
    </div>
  </div>
  <scroller @on-scroller="scroller" :loading="isLoadingEnd" v-else>
  <div class="ui-cells over-items bgwh pl20 pr20" v-if="items.length">
    <div class="ui-cell over-item" 
    v-for="(item,index) in items" 
    :key="index"
    @click="onSetItem(index)"
    >
      <div class="ui-cell__bd mr20 ovh">
        <div class="f30 g3 ell">{{item.title}}</div>
        <p class="f26 g9">{{item.createTime}}</p>
      </div>
      <div class="ui-cell__fd tr">
        <div class="f36"
         :class="{'plus':item.priceState==='01'}"
        >{{item.priceState==='01'?'+':'-'}}{{item.totalPrice}}</div>
        <p class="f24 g6">余额：{{item.balance}}</p>
        </div>
    </div>
  </div>
  </scroller>
  <ui-loading v-model="isLoading"/>
  <ui-toast v-model="toast.state" :content="toast.tips" :time="toast.time"></ui-toast>
</container>
</template>
<script>
import Container from '../container'
import { Scroller, UiLoading, UiToast } from '~'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Over',
  components: { Container, Scroller, UiLoading, UiToast },
  data() {
    return {
      hasNext: true,
      toast: {
        state: false,
        time: 2000,
        tips: ''
      },
      isLoading: true,
      isLoadingEnd: false,
      currentPage: 0,
      items: [],
      currentItem: {},
      isNull: false
    }
  },
  computed: {
    ...mapState([])
  },
  methods: {
    ...mapMutations(['setOverData']),
    onSetItem(index) {
      this.currentItem = this.items[index]
      this.setOverData(this.currentItem)
      this.$go('/overDetail')
    },
    scroller(diff) {
      if (diff === 0 && this.hasNext && !this.isLoadingEnd) {
        this.currentPage += 1
        this.isLoadingEnd = true
        this.getAjax()
      }
    },
    setToastShow(tips, time = 2000) {
      this.toast.state = true
      this.toast.tips = tips
      this.toast.time = time
    },
    getAjax() {
      var formData = new FormData()
      formData.append('isDetail', true)
      formData.append('size', 20)
      formData.append('pageNo', this.currentPage)
      this.$axios({
        method: 'post',
        url: '/wap/account/getBill',
        data: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        let data = res.data.data
        var status = res.data.status
        var message = res.data.message
        if (status === '200') {
          this.hasNext = res.data.data.hasNext
          this.items = this.items.concat(data.data)
          this.isNull = !this.items.length
          // if (!this.hasNext) {
          //   return
          // }
          // if (this.items.length === 0) {
          //   this.setToastShow('没有数据!', 0)
          // }
          this.$nextTick(function() {
            this.isLoading = false
            this.isLoadingEnd = false
          })
        } else {
        }
      })
    }
  },
  created() {
    this.getAjax()
  }
}
</script>
<style lang="scss">
.over-items {
  margin-top: 20px;

  @include ui-1px(#e3e3e3,1px 0);
}
.over-item {
  padding-top: 20px;
  padding-bottom: 20px;

  @include ui-1px(#e3e3e3,1px 0 0 0);
}
.plus {
  color: #30bf6c;
}
</style>