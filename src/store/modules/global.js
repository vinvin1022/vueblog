
/* 此js文件用于存储公用的vuex状态 */

const state = {
  loading: true // 网络请求状态
//   transition:''
}

const getters = {
  // 用户信息
  globalState: state => {
    return state
  }
}

const mutations = {
  // 初始化state
  initGlobalState (state, params) {
    Object.keys(state).forEach(key => {
      state[key] = params[key]
    })
  }
}

const actions = {

  loadingStart ({ commit }) {
    commit('initGlobalState', {loading: true})
  },

  loadingEnd ({ commit }) {
    commit('initGlobalState', {loading: false})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
