import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
/* import home from '@/components/home/home'
import dashboard from '@/components/dashboard' */
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录页',
        requireAuth: false
      }
    }
    /* ,
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '首页',
        requireAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: dashboard,
          meta: {
            title: '首页',
            requireAuth: true
          }
        },
        {
          path: '/ss',
          name: 'ss',
          component: dashboard,
          meta: {
            title: '首页ss',
            requireAuth: true
          }
        }
      ]
    } */
  ]
})
