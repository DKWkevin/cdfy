import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getCookie('token') === '' ? '未登录' : getCookie('token'),
    name: getCookie('name') === '' ? '' : getCookie('name')
  },
  mutations: {
    login (state, data) {
      state.token = data.token
      state.name = data.name
      setCookie('token', data.token, 100)
      setCookie('name', data.name, 100)
    }
  }
})
// 获取cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cname, cvalue, expiredays) {
  var exdate = new Date()
  exdate.setTime(exdate.getTime() + (expiredays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + exdate.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires
}
