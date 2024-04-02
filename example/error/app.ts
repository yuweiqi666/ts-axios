import axios, { AxiosError } from '../../src/index'

// 模拟非200响应
axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log('res', res);
  })
  .catch((err: AxiosError) => {
    console.log('err', err.response);
  })

// 模拟请求超时
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log('res timeout', res);
  })
  .catch((err: AxiosError) => {
    console.log('err timeout', err.code);
  })


// 模拟404
axios({
  method: 'get',
  url: '/error/123'
})
  .then(res => {
    console.log(res);
  })
  .catch((err: AxiosError) => {
    console.log('err123', err);

  })

// 模拟网络错误 要把浏览器控制面板network设置为offline来验证
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log('res', res);
    })
    .catch((err: AxiosError) => {
      console.log('err 网络错误', err);
    })
}, 5000)