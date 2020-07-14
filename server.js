const Koa = require('koa')
const Router = require('koa-router')
const next = require("next");
const session = require("koa-session")
const Redis = require('ioredis')
const KoaBody = require('koa-body')
const atob = require('atob')

const auth = require('./server/auth')
const api = require('./server/api')


const RedisSessionStore = require('./server/session-store')


const dev = process.env.NODE_ENV !== 'production'
// console.log("dev", dev, 'process.env.NODE_ENV', process.env.NODE_ENV)
// 判断环境：正式环境不需要热更之类的功能
const app = next({ dev });
// 处理http请求的响应handle 
// console.log(Object.keys(app), app)
const handle = app.getRequestHandler();


// 创建redis client
const redis = new Redis()

// 设置nodeJs全局增加1个atob方法
global.atob = atob

// page下的页面已经编译完成
app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // cookie 加密的字符串
  server.keys = ['Jocky devalop Github App']

  server.use(KoaBody())

  const SESSION_CONFIG = {
    key: 'jid', // session的key的名称
    // maxAge: 60 * 1000, // 1分钟,过期自动删除
    // 存取session内容，连接数据库存取数据的功能，使用redis去实现
    store: new RedisSessionStore(redis)
  }
  server.use(session(SESSION_CONFIG, server))

  // 用在session之后,上面会同时设置，配置处理github OAuth 的登陆
  auth(server)
  api(server)

  router.get('/a/:id', (ctx) => {
    const id = ctx.params.id
    handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    // 不再使用koa内置的对body的处理，手动返回http响应的内容
    ctx.respond = false
  })
  router.get('/api/user/info', async ctx => {
    // 设置用户的session
    // const user = ctx.session.userInfo
    console.log('/api/user/info', ctx.session.userInfo)
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', "userid:xxxx", {
    //   httpOnly: false
    // })
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })
  server.listen(3000, () => {
    console.log('koa server listening on http://localhost:3000/')
  })
})

