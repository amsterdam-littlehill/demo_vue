import axios from 'axios'
import { MessageBox } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: '', // api的base_url
  withCredentials: true, // 是否允许带cookie
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 15000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    console.log('拦截器中:' + config.data)
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    MessageBox.alert(error.message, '提示', {
      confirmButtonText: '确定',
      showCancelButton: false,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default service
