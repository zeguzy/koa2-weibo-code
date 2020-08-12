const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koa_static = require('koa-static')
const path = require('path')

const { isPrd } = require('./utils/env')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const index = require('./routes/index')
const errorViewRouter = require('./routes/view/err')
const user = require('./routes/view/user')
const userApi = require('./routes/api/user')
const utilsApi = require('./routes/api/utils')
const blogViewAPI = require('./routes/view/blog')
const blogsApi = require('./routes/api/blog')


let ERR_CONF = {}
if (isPrd) {
    ERR_CONF = {
        redirect: '/error'
    }
}


// error handler
onerror(app, ERR_CONF)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koa_static(__dirname + '/public'))
app.use(koa_static(path.join(__dirname, '..', 'uploadFiles')))


app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// app.keys = ['shjJH*99_']
// app.use(session({

//   cookie: {
//     path: '/',
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000
//   },
//   store: redisStore({
//     all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
//   })
// }))

//session配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid',
    prefix: 'weibo.sess',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// console.log('开始 debugger')

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(userApi.routes(), userApi.allowedMethods())
app.use(utilsApi.routes(), utilsApi.allowedMethods())
app.use(blogViewAPI.routes(), blogViewAPI.allowedMethods())
app.use(blogsApi.routes(), blogsApi.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())   //404注册到最后面
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
