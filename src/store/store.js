import Vue from 'vue'
// 导入vuex状态管理器包
import Vuex from 'vuex'

// 挂载在Vue上
Vue.use(Vuex)

// 浏览器只要一刷新，vuex内保存的数据会丢失
// 定义全局状态存储变量
const state = {
  token: '',
  // 初始化为未登录
  isLogin: false,
  no: '',
  className: '',
  classNo: ''
}

// 用于实时监听state值的变化
const getters = {
  // 用于外部获取token和是否登录信号
  token_getters (state) {
    // 判断是否登录
    if (!state.isLogin) {
      // 如果state的登录信号为否，检查sessionStorage内是否存有isLogin信号
      if (sessionStorage.getItem('isLogin')) {
        // 如果已经登录但是states被浏览器刷新后重置，则重新赋值
        state.isLogin = sessionStorage.getItem('isLogin')
        state.token = sessionStorage.getItem('token')
        return state.token
        // 如果未登录，则返回state中的空token
      } else {
        return state.token
      }
      // 已经登录则直接获取state内的token
    } else {
      return state.token
    }
  },
  no_getters (state) {
    state.no = sessionStorage.getItem('no')
    return state.no
  },
  className_getters (state) {
    state.className = sessionStorage.getItem('className')
    return state.className
  },
  classNo_getters (state) {
    state.classNo = sessionStorage.getItem('classNo')
    return state.classNo
  }
}

// 用于利用vue的双向数据驱动进行值的改变
const mutations = {
  // token的控制
  token_mutations (state, token) {
    // 把token和是否登录信号传入sessionStorage，sessionStorage生命周期为浏览器打开期间
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('isLogin', true)
    // 把token与是否登录信号传入state中保存
    state.token = token
    state.isLogin = true
  },
  no_mutations (state, no) {
    // 把no和是否登录信号传入sessionStorage，sessionStorage生命周期为浏览器打开期间
    sessionStorage.setItem('no', no)
    state.no = no
  },
  className_mutations (state, className) {
    // 把no和是否登录信号传入sessionStorage，sessionStorage生命周期为浏览器打开期间
    sessionStorage.setItem('className', className)
    state.className = className
  },
  classNo_mutations (state, classNo) {
    // 把no和是否登录信号传入sessionStorage，sessionStorage生命周期为浏览器打开期间
    sessionStorage.setItem('classNo', classNo)
    state.classNo = classNo
  }
}

// 用于异步触发mutations里面的方法
const actions = {
  token_actions (context, token) {
    context.commit('token_mutations', token)
  },
  no_actions (context, no) {
    context.commit('no_mutations', no)
  },
  className_actions (context, className) {
    context.commit('className_mutations', className)
  },
  classNo_actions (context, classNo) {
    context.commit('classNo_mutations', classNo)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 导出store对象
export default store
