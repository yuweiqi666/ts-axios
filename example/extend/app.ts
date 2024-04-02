import axios from "../../src";

axios({
  url: '/extend/get',
  method: 'get'
})

axios.request({
  url: '/extend/get',
  method: 'get'
})

axios.get('/extend/get')

axios.post('/extend/post', {
  username: 'zhangsan'
})

axios.delete('/extend/delete')

axios.put('/extend/put', {
  username: 'put'
})

axios.patch('/extend/patch', {
  username: 'patch'
})

axios.head('/extend/head')

axios.options('/extend/options')


axios('/extend/post2', {
  method: 'post',
  data: {
    msg: 'post2'
  }
})


interface ResponseData<T> {
  code: number
  message: string
  result: T
}

interface User {
  name: string
  age: number
}

axios.post<ResponseData<User>>('/extend/user')
  .then(res => {
    console.log('res.data.result.name', res.data.result.name)
  })
