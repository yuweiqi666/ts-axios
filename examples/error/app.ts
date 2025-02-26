import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log('res', res)
  })
  .catch((err: AxiosError) => {
    console.log('err', err.message)
    console.log('err', err.config)
    console.log('err', err.code)
    console.log('err', err.request)
    console.log('err', err.response)

  })

// axios({
//   method: 'get',
//   url: '/error/get'
// })
//   .then(res => {
//     console.log('res', res)
//   })
//   .catch(err => {
//     console.log('err', err)
//   })

// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   })
//     .then(res => {
//       console.log('res', res)
//     })
//     .catch(err => {
//       console.log('err', err)
//     })
// }, 5000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// })
//   .then(res => {
//     console.log('res timeout', res)
//   })
//   .catch(err => {
//     console.log('err timeout', err)
//   })