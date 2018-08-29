
// 路由懒加载 https://router.vuejs.org/zh-cn/advanced/lazy-loading.html

const user = () => import(/* webpackChunkName: "login" */ '../pages/user/index.vue')

const routes = [
  {
    path: 'user',
    name: 'user',
    meta: {
      title: '个人中心'
    },
    component: user
  }
]

export default routes
