import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export function createStore() {
  return new Vuex.Store({
    state: {
      gToast: {
        state: false,
        time: 0,
        content: '<div><p>网络请求失败</p><p>您的网络好像不是很给力~</p></div>'
      },
      overData: {},
      withdraw: {
        money: '',
        tabIndex: 0,
        userName: '***',
        account: '',
        bankIndex: 0,
        card: '',
        bankName: '中国农业银行',
        address: '',
        code: ''
      }
    },
    mutations: {
      setOverData(state, obj) {
        if (!obj) return false
        state.overData = obj
      },
      setWithdraw(state, obj) {
        if (!obj) return false
        state.withdraw = obj
      },
      setJumpPath(state, path) {
        if (!!path) {
          state.jumpPath = path
        }
      }
    },
    modules: {}
  })
}
