<template>
<container>
  <div class="mod-tips tc" v-if="isNull">
    <div class="m20 p20"></div>
    <div class="dib vm mt20 pt20">
      <div class="data-tips--01 mb20"></div>
      <p class="f28 g9 mt20 pt20">您暂时没有账单记录哦~</p>
    </div>
  </div>
  <scroller @on-scroller="scroller" :loading="isLoadingEnd" v-else>
  <div class="ui-cells bill-items bgwh pl20 pr20" v-if="items.length">
    <router-link
    tag="div"
    class="ui-cell bill-item"
    :to="'/billDetail?id='+item.id"
    v-for="(item,index) in items"
    :key="item.id">
      <div class="ui-cell__hd mr20" :class="['icon-bill--'+icons[Number(item.type)]]"></div>
      <div class="ui-cell__bd ml20">
        <p class="f30 g3">{{item.title}}</p>
        <p class="f24 g9">{{item.createTime}}</p>
      </div>
      <div class="ui-cell__fd f36 plus" v-if="item.priceState==='01'"><p class="f36">+{{item.totalPrice}}</p></div>
      <div class="ui-cell__fd f36 tr" v-else>
        <p class="f36">-{{item.totalPrice}}</p>
        <p :class="['f24',(item.state.length<4)?'text-primary':'g9']" v-if="item.state">{{item.state}}</p>
      </div>
    </router-link>
  </div>
  </scroller>
  <ui-loading v-model="isLoading"/>
</container>
</template>
<script>
import container from '../container'
import { Scroller, UiLoading } from '~'
export default {
  name: 'BillList',
  components: { container, Scroller, UiLoading },
  data() {
    return {
      items: [],
      hasNext: true,
      currentPage: 0,
      isLoading: true,
      isLoadingEnd: false,
      icons: ['02', '', '01', '03'],
      isNull: false
    }
  },
  methods: {
    scroller(diff) {
      if (diff < 10 && this.hasNext && !this.isLoadingEnd) {
        this.currentPage += 1
        this.isLoadingEnd = true
        this.getAjax()
      }
    },
    getAjax() {
      var formData = new FormData()
      formData.append('isDetail', false)
      formData.append('size', 20)
      formData.append('pageNo', this.currentPage)
      this.$axios({
        method: 'post',
        url: '/wap/account/getBill',
        data: formData,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(res => {
        let data = res.data.data
        var status = res.data.status
        var message = res.data.message
        if (status !== '200') {
        } else {
          this.isNull = !data.data.length
          this.hasNext = res.data.data.hasNext
          this.items = this.items.concat(data.data)
          this.$nextTick(function() {
            this.isLoading = false
            this.isLoadingEnd = false
          })
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
.bill-items {
  margin-top: 20px;

  @include ui-1px(#e3e3e3,1px 0);
}
.bill-item {
  box-sizing: border-box;
  padding-top: 4px;
  height: 128px;

  @include ui-1px(#e3e3e3,1px 0 0 0);
  // p:last-child {
  //   padding-top: 10px;
  // }
}
.plus {
  color: #30bf6c;
}
</style>
