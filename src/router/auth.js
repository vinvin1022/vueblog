
// 路由懒加载 https://router.vuejs.org/zh-cn/advanced/lazy-loading.html
import store from '../store'

const login = () => import(/* webpackChunkName: "login" */ '../pages/auth/login.vue')
const register = () => import(/* webpackChunkName: "login" */ '../pages/auth/register.vue')
const fourOFour = () => import(/* webpackChunkName: "404" */ '../pages/auth/404.vue') // 需置底

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆'
    },
    component: login
    // beforeEnter: (to, from, next) => {
    //   store.dispatch({
    //     type: 'logout'
    //   }).then(res => {
    //     next()
    //   })
    //   next()
    // }
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: register
  },
  {
    path: '*',
    name: '404',
    meta: {
      title: '404'
    },
    component: fourOFour
  }
]

export default routes
