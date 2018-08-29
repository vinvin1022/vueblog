
// eventbus 事件中心，跨组件通信  https://github.com/vuejs/vue/issues/2873 How to Deal with Deprecation of $dispatch and $broadcast?

export default (Vue) => {
  const eventHub = new Vue()
  Vue.prototype.$bus = {
  /**
   * @param {any} event 第一个参数是事件对象，第二个参数是接收到消息信息，可以是任意类型
   * @method $on  事件订阅, 监听当前实例上的自定义事件。https://cn.vuejs.org/v2/api/#vm-on
   * @method $off  取消事件订阅，移除自定义事件监听器。  https://cn.vuejs.org/v2/api/#vm-off  https://github.com/vuejs/vue/issues/3399
   * @method $once  事件订阅, 监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。 https://cn.vuejs.org/v2/api/#vm-once
   * @method $emit  事件广播, 触发当前实例上的事件。 https://cn.vuejs.org/v2/api/#vm-emit
   */
    $on (...event) {
      eventHub.$on(...event)
    },
    $off (...event) {
      eventHub.$off(...event)
    },
    $once (...event) {
      eventHub.$emit(...event)
    },
    $emit (...event) {
      eventHub.$emit(...event)
    }
  }
}
// 注意事项：1.事件订阅必须在事件广播前注册；2.取消事件订阅必须跟事件订阅成对出现。
// 基本使用：
// a组件
/*
    beforeDestroy () {
      this.$bus.$emit('testing', color)
    }
*/
// b组件
/*  created () {
      this.$bus.$on('testing', (res) => { console.log(res) })
    },
    beforeDestroy () {
      this.$bus.$off('testing')
    }
*/
