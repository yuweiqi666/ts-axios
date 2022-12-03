import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get'
}).then(res => {
  console.log('res', res)
}).catch(err => {
  console.log('err', err)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => {
    console.log('res', res)
  }).catch(err => {
    console.log('err', err)
  })
}, 5000)



axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('res', res)
}).catch((err: AxiosError) => {
  console.log('err', err.isAxiosError)
})