const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res) {
  res.json({
    msg: req.query
  })
})

router.post('/base/post', function(req, res) {
  res.json({
    msg: req.body
  })
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', chunk => {
    if(chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function (req, res) {
  if(Math.random() > 0.5) {
    res.json({
      msg: 'hello world'
    })
  } else {
    res.status(404)
    res.end()
  }
})

router.get('/error/timeout', function (req, res) {
  setTimeout(() => {
    res.json({
      msg: 'hello world timeout'
    })
  }, 3000)
})

router.post('/extend/post', function(req, res) {
  res.json({
    msg: req.body,
    meta: '_extend_post',
    username: 'zhangsan',
    age: 18,
    hobbies: ['code', 'ball', 'pc game']
  })
})

router.put('/extend/put', function(req, res) {
  res.json({
    msg: req.body,
    meta: '_extend_put'
  })
})

router.patch('/extend/patch', function(req, res) {
  res.json({
    msg: req.body,
    meta: '_extend_patch'
  })
})

router.get('/extend/get', function(req, res) {
  res.json({
    meta: '_extend_get'
  })
})

router.options('/extend/options', function(req, res) {
  res.json({
    meta: '_extend_options'
  })
})

router.delete('/extend/delete', function(req, res) {
  res.json({
    meta: '_extend_delete'
  })
})

router.head('/extend/head', function(req, res) {
  res.json({
    meta: '_extend_head'
  })
})


router.get('/interceptor/get', function(req, res) {
  res.json({
    meta: 'test interceptor',
    message: 'success',
    code: 200
  })
})

app.use(router)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})