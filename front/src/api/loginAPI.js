//loginAPI定义登陆部分的接口
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://47.103.9.254:8000'
  : 'http://localhost:8000'

//登陆
export const login = (params) => {
  return axios.post('/login', params).then(res => res.data)
}
