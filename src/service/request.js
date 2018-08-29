
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
  const token = store.getters.userInfo.token
  if (token) {
    config.headers.token = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  store.dispatch('loadingEnd')
  if (response.data.code === 900401) {
    store.commit({
      type: 'clearUserState'
    })
    localStorage.removeItem('vuex')
    router.push('/login')
  }
  return response
}, function (error) {
  Message({
    message: '网络请求失败',
    type: 'error',
    duration: 1000
  })
  return Promise.reject(error)
})

export function post (url, params, config) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, config)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}
