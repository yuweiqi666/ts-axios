import axios from '../../src/index'

interface ResponseType {
  age: number
  hobbies: number[]
  meta: string
  msg: {
    msg: string
  }
  username: string
}

axios<ResponseType>({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
}).then(res => {
  console.log('res', res.data)
})

axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi123123'
  }
})


axios.post('/extend/post', {
  msg: 'hi'
})

axios.put('/extend/put', {
  msg: 'hi'
})

axios.patch('/extend/patch', {
  msg: 'hi'
})

axios.get('/extend/get')

axios.delete('/extend/delete')

axios.options('/extend/options')

axios.head('/extend/head')