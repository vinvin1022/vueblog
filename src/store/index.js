import Vue from 'vue'
import Vuex from 'vuex'
// vuex核心概念 https://vuex.vuejs.org/zh-cn/core-concepts.html

import modules from './modules'
// vuex状态持久化插件 https://github.com/robinvdvleuten/vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: modules,
  strict: process.env.NODE_ENV !== 'production', // https://vuex.vuejs.org/zh-cn/strict.html
  plugins: [createPersistedState()]
})

export default store
