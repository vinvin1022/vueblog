
import authService from '../../pages/auth/authService'

const state = {
  memberCellphone: '',
  token: '',
  uid: '',
  userName: '',
  email: '',
  avatarSrc: ''
}

const getters = {
  // 用户信息
  userInfo: state => {
    return state
  }
}

const mutations = {
  // 初始化state
  initUserState (state, params) {
    // Object.keys(state).forEach(key => {
    //   state[key] = params[key]
    // })
    Object.assign(state, params)
  },
  // 清空state
  clearUserState (state) {
    Object.keys(state).forEach(key => {
      state[key] = ''
    })
  }
}

const actions = {
  /**
   * 账号密码登陆
   * @param  {string} {commit} vuex dispatch
   * @param  {object} params 手机号码/密码
   */
  login ({ commit }, params) {
    return new Promise((resolve, reject) => {
      authService.login(params.memberCellphone, params.loginPwd, params.maxAge).then(res => {
        if (res) {
          commit('initUserState', res)
          resolve(res)
        } else {
          reject(res)
        }
      }, err => {
        // console.log(err)
        reject(err)
      })
    })
  },
  // /**
  //  * 账号注册
  //  * @param  {string} {commit} vuex dispatch
  //  * @param  {object} params 手机号码/密码
  //  */
  // register ({ commit }, params) {
  //   return new Promise((resolve, reject) => {
  //     authService.login(params.memberCellphone, params.userName, params.email, params.loginPwd).then(res => {
  //       if (res) {
  //         commit(Object.assign({
  //           type: 'initUserState'
  //         }, res))
  //         resolve(res)
  //       } else {
  //         reject(res)
  //       }
  //     }, err => {
  //       // console.log(err)
  //       reject(err)
  //     })
  //   })
  // },

  /**
   * 登出
   * @param  {string} {commit} vuex dispatch
   * @param  {params} params
   */
  logout ({ commit }, params) {
    return new Promise((resolve, reject) => {
      authService.logout().then(res => {
        commit({
          type: 'clearUserState'
        })
        localStorage.removeItem('vuex')
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
