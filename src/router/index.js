import Vue from 'vue'
import Router from 'vue-router'

import GoodsHome from '@/views/goods/goods-home'

import WalletHome from '@/views/wallet'

import Withdraw from '@/views/wallet/withdraw'

import ChooseBank from '@/views/wallet/choose-bank'

import Verify from '@/views/wallet/verify'

import LegalizeHome from '@/views/legalize'

import Legalize from '@/views/legalize/legalize'

import Verified from '@/views/legalize/verified'

import LegalizeResult from '@/views/legalize/result'

import WithdrawResult from '@/views/wallet/withdraw-result'

import Over from '@/views/wallet/over'

import OverDetail from '@/views/wallet/over-detail'

import BillList from '@/views/bill/bill-list'

import BillDetail from '@/views/bill/bill-detail'

import About from '@/views/about'

import InviteLook from '@/views/invite/invite-look'

import RegisterSuccess from '@/views/invite/register-success'

import MyInvite from '@/views/invite/my-invite'

import InviteFriends from '@/views/invite/invite-friends'

import Protocol from '@/views/about/protocol'

import Rule from '@/views/invite/rule'

import Market from '@/views/column/market'
import Factory from '@/views/column/factory'
import Warehouse from '@/views/column/warehouse'

import MtncRecord from '@/views/record/mtnc-record'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodsHome',
      meta: { title: '商品主页' },
      component: GoodsHome
    },
    {
      path: '/powerDetail',
      name: 'GoodsHome',
      meta: { title: '商品主页' },
      component: GoodsHome
    },
    {
      path: '/walletHome',
      name: 'WalletHome',
      meta: { title: '我的钱包' },
      component: WalletHome
    },
    {
      path: '/over',
      name: 'Over',
      meta: { title: '余额明细' },
      component: Over
    },
    {
      path: '/overDetail',
      name: 'OverDetail',
      meta: { title: '余额明细' },
      component: OverDetail
    },
    {
      path: '/billList',
      name: 'BillList',
      meta: { title: '我的账单' },
      component: BillList
    },
    {
      path: '/billDetail',
      name: 'BillDetail',
      meta: { title: '账单详情' },
      component: BillDetail
    },
    {
      path: '/legalizeHome',
      name: 'LegalizeHome',
      meta: { title: '实名认证' },
      component: LegalizeHome
    },
    {
      path: '/verified',
      name: 'Verified',
      meta: { title: '实名认证' },
      component: Verified
    },
    {
      path: '/legalize',
      name: 'Legalize',
      meta: { title: '实名认证' },
      component: Legalize
    },
    {
      path: '/legalizeResult',
      name: 'LegalizeResult',
      meta: { title: '实名认证' },
      component: LegalizeResult
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      meta: { title: '提现' },
      component: Withdraw
    },
    {
      path: '/chooseBank',
      name: 'ChooseBank',
      meta: { title: '提现' },
      component: ChooseBank
    },
    {
      path: '/verify',
      name: 'Verify',
      meta: { title: '填写验证码' },
      component: Verify
    },
    {
      path: '/WithdrawResult',
      name: 'WithdrawResult',
      meta: { title: '提现' },
      component: WithdrawResult
    },
    {
      path: '/about',
      name: 'About',
      meta: { title: '关于我们' },
      component: About
    },
    {
      path: '/protocol',
      name: 'Protocol',
      meta: { title: '用户协议' },
      component: Protocol
    },
    {
      path: '/inviteLook',
      name: 'InviteLook',
      meta: { title: '加入万果田园' },
      component: InviteLook
    },
    {
      path: '/registerSuccess',
      name: 'RegisterSuccess',
      meta: { title: '注册成功' },
      component: RegisterSuccess
    },
    {
      path: '/myInvite',
      name: 'MyInvite',
      meta: { title: '我的邀请' },
      component: MyInvite
    },
    {
      path: '/inviteFriends',
      name: 'InviteFriends',
      meta: { title: '邀请好友' },
      component: InviteFriends
    },
    {
      path: '/rule',
      name: 'Rule',
      meta: { title: '环保卫士奖励规则' },
      component: Rule
    },
    {
      name: 'Market',
      path: '/market',
      meta: { title: '万果集市' },
      component: Market
    },
    {
      name: 'Factory',
      path: '/factory',
      meta: { title: '深加工厂' },
      component: Factory
    },
    {
      name: 'Warehouse',
      path: '/warehouse',
      meta: { title: '万果仓库' },
      component: Warehouse
    },
    {
      name: 'MtncRecord',
      path: '/mtncRecord',
      meta: { title: '维护记录' },
      component: MtncRecord
    }
  ]
})
