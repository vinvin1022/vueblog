
import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

import auth from './auth'
import user from './user'

Vue.use(Router)
const router = new Router({
  routes: [ {
    path: '/',
    name: 'layout',
    redirect: '/user',
    component: () => import(/* webpackChunkName: "layout" */ '../components/layout/layout.vue'),
    children: [...user]
  }, ...auth]
})

// 全局导航守卫 //https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  // document.title = to.meta.title || to.name
  next()
})

export default router
