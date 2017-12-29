<template>
<container>
  <div class="bgwh dt pct100">
    <dl class="pt20 mt20">
      <dt class="tc f0"><i class="dib vm mr10" :class="['icon-bill--'+icons[Number(item.type)]]"></i>
        <span class="f32 dib vm" v-if="item.type==='00'">付款金额</span>
        <span class="f32 dib vm" v-else-if="item.type==='01'">收款金额</span>
        <span class="f32 dib vm" v-else-if="item.type==='02'">收款金额</span>
        <span class="f32 dib vm" v-else-if="item.type==='03'">出账金额</span>
      </dt>
      <dd class="f52 tc mt20">{{item.priceState==='01'?'+':'-'}}{{item.totalPrice}}</dd>
      <dd class="f26 g9 tc mt20">{{item.descript}}</dd>
    </dl>
  <div class="m20 p20"></div>
  <div class="ui-cells bill-detail" v-if="item.type==='03'">
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">服务费用</div>
      <div class="ui-cell__bd f30 tr">{{item.poundage}}</div>
    </div>
  </div>
  <!-- 出账金额 -->
  <div class="ui-cells bill-detail" v-if="item.type==='03'">
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">提现说明</div>
      <div class="ui-cell__bd f30 tr">{{item.remark}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">提现状态</div>
      <div class="ui-cell__bd f30 tr">{{item.status}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">提现到</div>
      <div class="ui-cell__bd f30 tr">{{item.account}}</div>
    </div><div class="ui-cell">
      <div class="ui-cell__hd f28 g9">账单分类</div>
      <div class="ui-cell__bd f30 tr">{{item.typePrint}}</div>
    </div>
  </div>
  <!-- 付款金额 -->
  <div class="ui-cells bill-detail" v-else-if="item.type==='00'">
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">付款方式</div>
      <div class="ui-cell__bd f30 tr">{{item.payMode}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">商品说明</div>
      <div class="ui-cell__bd f30 tr">{{item.remark}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">账单分类</div>
      <div class="ui-cell__bd f30 tr">{{item.typePrint}}</div>
    </div>
  </div>
  <!-- 收款金额 -->
  <div class="ui-cells bill-detail" v-else>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">付款方</div>
      <div class="ui-cell__bd f30 tr">{{item.payCompany}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">账单说明</div>
      <div class="ui-cell__bd f30 tr">{{item.remark}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">邀请好友</div>
      <div class="ui-cell__bd f30 tr">{{item.friend}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">账单分类</div>
      <div class="ui-cell__bd f30 tr">{{item.typePrint}}</div>
    </div>
  </div>
  <div class="ui-cells bill-detail">
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">创建时间</div>
      <div class="ui-cell__bd f30 tr">{{item.createTime}}</div>
    </div>
    <div class="ui-cell">
      <div class="ui-cell__hd f28 g9">订单号</div>
      <div class="ui-cell__bd f30 tr">{{item.code}}</div>
    </div>
  </div>
  </div>
  <ui-loading v-model="isLoading"/>
</container>
</template>
<script>
import Container from '../container'
import { UiLoading } from '~'
export default {
  name: 'BillDetail',
  components: { Container, UiLoading },
  data() {
    return {
      icons: ['02', '', '01', '03'],
      isLoading: true,
      item: {}
    }
  },
  methods: {
    getAjax() {
      var id = this.$route.query.id
      this.$axios({
        method: 'get',
        url: '/wap/account/getCommission/' + id,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      }).then(res => {
        let data = res.data.data
        this.item = data
        this.$nextTick(function() {
          this.isLoading = false
        })
      })
    }
  },
  created() {
    this.getAjax()
  }
}
</script>
<style lang="scss">
.f52 {
  font-size: 52px;
}
.bill-detail {
  margin-right: 20px;
  margin-left: 20px;

  @include ui-1px(#e3e3e3,0 0 1px 0);
  .ui-cell {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
</style>
