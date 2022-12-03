import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    arr: [1, 2, 3, 4]
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date()
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    obj: {
      a: 1,
      b: 2
    } 
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar123',
    bar: null
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    bar: null
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=111',
  params: {
    bar: 222
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'Accept': 'application/json, text/plain, */*'
  },
  responseType: 'json',
  data: {
    name: 'yuweiqi'
  }
})
  .then(res => {
    console.log('res1', res)
  })

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'Accept': 'application/json, text/plain, */*'
  },
  responseType: 'text',
  data: {
    name: 'yuweiqi'
  }
})
  .then(res => {
    console.log('res2', res)
  })


const paramsString = 'q=URLUTILS.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
// post请求提交formdata格式数据自动添加'Content-Type' = 'application/json;charset=utf-8'
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})


