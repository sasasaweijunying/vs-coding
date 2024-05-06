import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index.js'
import store from './store'
import Cookie from 'js-cookie'
import './api/mock'


Vue.config.productionTip = false

Vue.use(Element)


// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (to.name !== 'login' && !token) {
    // 如果要访问的路由不是 'login' 并且没有 token，则重定向到 'login' 路由
    next({ name: 'login' })
  } else if (to.name === 'login' && token) {
    // 如果要访问的路由是 'login' 并且存在 token，则重定向到 'home' 路由
    next({ name: 'home' })
  } else {
    // 其他情况下，继续正常导航
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')

