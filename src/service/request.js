
// 引入网络请求库 https://github.com/axios/axios

import axios from 'axios'
import store from '../store'
import router from '../router'
import {Message} from 'element-ui'

// axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.baseURL = process.env.BASE_URL

axios.interceptors.request.use((config) => {
  store.dispatch('loadingStart')
  console.log('1', store.getters.globalState.loading)
  const token = store.getters.userInfo.token
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  console.log('4', store.getters.globalState.loading)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  store.dispatch('loadingEnd')
  console.log('2', store.getters.globalState.loading)
  if (response.data.code === 900401) {
    store.commit({
      type: 'clearUserState'
    })
    localStorage.removeItem('vuex')
    router.push('/login')
  }
  return response
}, function (error) {
  console.log('3', store.getters.globalState.loading)

  if (axios.isCancel(error)) {
    // throw new axios.Cancel('cancel request')
    // return {status: '', code: 200, text: '取消请求了', data: []}
  } else {
    Message({
      message: '网络请求失败',
      type: 'error',
      duration: 1000
    })
  }
  // store.dispatch('loadingEnd')
  return Promise.reject(error)
})

const CancelToken = axios.CancelToken
let sources = new Map()

const request = function (url, params, config, method) {
  return new Promise((resolve, reject) => {
    axios[method](url, params, Object.assign({}, config, {
      cancelToken: new CancelToken(function executor (c) {
        sources.set(url, c)
      })
    })).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

const post = (url, params, config = {}) => {
  return request(url, params, config, 'post')
}

const get = (url, params, config = {}) => {
  return request(url, params, config, 'get')
}

export {sources, post, get}
