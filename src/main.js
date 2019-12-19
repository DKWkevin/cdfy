// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'
import VXETable from 'vxe-table'
import ElementUI from 'element-ui'
// 变量
import bus from '@/assets/store/bus'
import {delCookie, filterRouter,
  delObjArr, saveObjArr, getObjArr, delObj} from '@/assets/store'
import {get, post} from '@/assets/store/axios'
import '@/assets/store/global'
import store from '@/store'
// CSS
import '@/assets/css/base.css'
import '@/assets/css/home.css'
import 'vxe-table/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'mini'})
Vue.use(VXEUtils, XEUtils)
Vue.use(VXETable)
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$cookieStore = {
  delCookie, filterRouter, delObjArr, saveObjArr, getObjArr, delObj
}
Vue.prototype.$bus = bus

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
    return
  }
  var name = store.state.name
  if (name === '未登录') {
    if (to.meta.requireAuth || to.name == null) {
      next({path: '/', query: {redirect: to.path}})
    } else {
      next()
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
