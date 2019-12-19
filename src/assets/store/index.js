import home from '@/components/home/home.vue'
/* // 更新cookie内容
export function cookieReload () {
  updateCookie('username', 0.1)
  updateCookie('userid', 0.1)
} */
// 删除cookie
export function delCookie (name) {
  this.setCookie(name, '', -1)
}
// 删除 localStorage
export function delObjArr (name) {
  window.localStorage.removeItem(name)
}
// 删除 localStorage
export function delObj (name) {
  window.localStorage.setItem(name, '')
}
// route读取
export function filterRouter (routers) {
  for (var i = 0; i < routers.length; i++) {
    if (routers[i].component) {
      if (routers[i].component === 'home') {
        routers[i].component = home
      } else {
        routers[i].component = _import(routers[i].component)
      }
      if (routers[i].children && routers[i].children.length) {
        for (var j = 0; j < routers[i].children.length; j++) {
          routers[i].children[j].component = _import(routers[i].children[j].component)
        }
      }
    }
  }
  return routers
}
// 获取 localStorage
export function getObjArr (name) {
  return JSON.parse(window.localStorage.getItem(name))
}
// route地址
export function _import (name) {
  return resolve => require(['@/webContent/' + name + '.vue'], resolve)
}
// 设置localStorage
export function saveObjArr (name, data) {
  window.localStorage.setItem(name, JSON.stringify(data))
}
/*
 // 更新cookie
  export function updateCookie (cname, expiredays) {
    var exdate = new Date()
    exdate.setTime(exdate.getTime() + (expiredays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + exdate.toUTCString()
    var cvalue = getCookie(cname)
    document.cookie = cname + '=' + cvalue + '; ' + expires
  }
*/
