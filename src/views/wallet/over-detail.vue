<template>
  <container>
    <div class="ui-cell bgwh mt20 amount">
      <div class="ui-cell__hd f32">{{overData.priceState==='01'?'入账':'出账'}}金额</div>
      <div class="ui-cell__bd f40 tr plus">{{overData.totalPrice}}</div>
    </div>
    <div class="mt20 amount bgwh">
    <div class="ui-cells">
      <div class="ui-cell pt10 pb10">
        <div class="ui-cell__hd f28 g9">类型</div>
        <div class="ui-cell__bd f30 tr">{{overData.typePrint}}</div>
      </div>
      <div class="ui-cell pt10 pb10" v-if="overData.priceState==='01'">
        <div class="ui-cell__hd f28 g9">账单说明</div>
        <div class="ui-cell__bd f30 tr">{{overData.remark}}</div>
      </div>
      <div class="ui-cell pt10 pb10">
        <div class="ui-cell__hd f28 g9">创建时间</div>
        <div class="ui-cell__bd f30 tr">{{overData.realTime}}</div>
      </div>
      <div class="ui-cell pt10 pb10">
        <div class="ui-cell__hd f28 g9">订单号</div>
        <div class="ui-cell__bd f30 tr">{{overData.code}}</div>
      </div>
    </div>
    <div class="ui-cells">
      <div class="ui-cell pt10 pb10">
        <div class="ui-cell__hd f28 g9">余额</div>
        <div class="ui-cell__bd f30 tr">{{overData.balance}}</div>
      </div>
      <div class="ui-cell pt10 pb10">
        <div class="ui-cell__hd f28 g9">备注</div>
        <div class="ui-cell__bd f30 tr">{{overData.descript}}</div>
      </div>
    </div>
    </div>
  </container>
</template>
<script>
import Container from '../container'
import { mapState } from 'vuex'
export default {
  name: 'OverDetail',
  components: { Container },
  data() {
    return {}
  },
  computed: {
    ...mapState(['overData'])
  },
  methods: {},
  created() {}
}
</script>
<style lang="scss">
.amount {
  padding: 20px;

  @include ui-1px(#e3e3e3,1px 0);
  .ui-cells:not(:first-child) {
    margin-top: 10px;
    padding-top: 10px;

    @include ui-1px(#e3e3e3,1px 0 0 0);
  }
}
.plus {
  color: #30bf6c;
}
</style>
