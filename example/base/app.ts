import axios from '../../src/index'

// url拼接参数是数组 /base/get?foo[]=bar&foo[]=bax
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// url拼接参数是对象 拼接为对象字符串encode的数据 /base/get?foo=%7B%22bar%22:%22baz%22%7D
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// url拼接参数是Date类型 拼接的是 date.toISOString() 的结果 /base/get?date=2024-03-23T02:26:15.544Z
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// url拼接参数是特殊字符要保留 空格变为+ /base/get?foo=@:$,+
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 忽略null 或者undefined 属性 /base/get?foo=bar
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})


// 丢弃url中的哈希标记 /base/get?foo=bar2
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar2'
  }
})

// 保留url中已经存在的参数 /base/get?foo=bar&bar=baz
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})


axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})


axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    name: '123',
    age: 18
  }
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    uname: 1,
    age: 2
  },
  // responseType: 'json'
}).then(res => {
  console.log('res____', res);
})