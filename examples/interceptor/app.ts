import axios from '../../src/index'

interface ResponseType {
  code: number
  message: string
  meta: string
}

axios.interceptors.request.use((config) => {
  console.log("请求拦截器1", config)
  config.headers.test += '1'
  return config
})

axios.interceptors.request.use((config) => {
  console.log("请求拦截器2", config)
  config.headers.test += '2'
  return config
})

const requestInterceptor = axios.interceptors.request.use((config) => {
  console.log("请求拦截器3", config)
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use((res) => {
  console.log("响应拦截器1", res)
  res.data.message += '1'
  return res
})

axios.interceptors.response.use((res) => {
  console.log("响应拦截器2", res)
  res.data.message += '2'
  return res
})

const responseInterceptor = axios.interceptors.response.use((res) => {
  console.log("响应拦截器3", res)
  res.data.message += '3'
  return res
})

axios.interceptors.request.eject(requestInterceptor)
axios.interceptors.response.eject(responseInterceptor)

axios.get<ResponseType>('/interceptor/get', {
  headers: {
    test: ''
  }
})
  .then(res => {
    console.log('拦截器测试返回res最终', res.data.message)
  })