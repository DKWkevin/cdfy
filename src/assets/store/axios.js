import axios from 'axios'

axios.defaults.timeout = 10000

axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export function get (url, param = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param}).then(res => {
      resolve(res)
    }).then(err => {
      reject(err)
    })
  })
}
export function post (url, param = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, {params: param}).then(res => {
      resolve(res)
    }).then(err => {
      reject(err)
    })
  })
}
