const Koa = require('koa')
const Router = require('koa-router')
const next = require("next");
const session = require("koa-session")
const Redis = require('ioredis')
const auth = require('./server/auth')
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


// page下的页面已经编译完成
app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // cookie 加密的字符串
  server.keys = ['Jocky devalop Github App']
  const SESSION_CONFIG = {
    key: 'jid', // session的key的名称
    // maxAge: 60 * 1000, // 1分钟,过期自动删除
    // 存取session内容，连接数据库存取数据的功能，使用redis去实现
    store: new RedisSessionStore(redis)
  }
  server.use(session(SESSION_CONFIG, server))
  // 用在session之后,配置处理github OAuth 的登陆
  auth(server)
  server.use(async (ctx, next) => {
    // console.log(ctx.cookies.get('id'))
    // // 获取用户数据
    // // 比如调用`model.getUserById(id)`
    // ctx.session = ctx.session || {}
    // ctx.session.user = {
    //   username: 'Jocky',
    //   age: 18
    // }
    // if (!ctx.session.user) {
    //   // 如果session中没有用户信息，就设置一个用户信息
    //   ctx.session.user = {
    //     name: 'jocky',
    //     age: 18
    //   }
    // } else {
    console.log(`session is: ${ctx.session.toString()}`)
    // }
    await next()
  })

  router.get('/a/:id', (ctx) => {
    const id = ctx.params.id
    handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })
    // 不再使用koa内置的对body的处理，手动返回http响应的内容
    ctx.respond = false
  })
  router.get('/set/user', async (ctx, next) => {
    ctx.session.user = {
      name: 'jocky',
      age: ''
    }
    ctx.body = "set session success"
  })
  router.get('/delete/user', async (ctx, next) => {
    console.log('ctx.request.query', ctx.request.query)
    ctx.session = null
    ctx.body = "delete session success"
  })
  router.get('/pots/user', async (ctx, next) => {
    console.log('ctx.request.query', ctx.request.query)
    ctx.session = null
    ctx.body = "delete session success"
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', "userid:xxxx", {
    //   httpOnly: false
    // })
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on http://localhost:3001/')
  })
})

