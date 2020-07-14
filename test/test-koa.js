const Koa = require('koa')
const Router = require('koa-router')

const dev = process.env.NODE_ENV !== 'production'
console.log("dev", dev, 'process.env.NODE_ENV', process.env.NODE_ENV)


// 处理http请求的响应handle 
// console.log(Object.keys(app), app)
// const handle = app.getRequestHandler();

// page下的页面已经编译完成
// app.prepare().then(() => {
//   const server = new Koa()

//   server.use(async (ctx, next) => {
//     await handle(ctx.req, ctx.res)
//     ctx.respond = false
//   })

//   server.listen(3000, () => {
//     console.log('koa server listening on 3000')
//   })
// })



const server = new Koa()
const router = new Router()

// 这里的参数id，是router加到ctx上面的
router.get('/test/:id', (ctx) => {
  const path = ctx.path
  const method = ctx.method
  // ctx.body = `<p>koa router</p> method:${method} path:${path} params:${ctx.params.id}`
  ctx.body = {
    success: true,
  }
  ctx.set('Content-Type', 'application/json')
})

router.get('/delete/user', async (ctx, next) => {
  console.log("ctx.query", ctx.query, 'ctx.request.query', ctx.request.query)
  ctx.session = null
  ctx.body = "delete session success"
})
router.post('/post/user', async (ctx, next) => {
  let str = ''
  ctx.req.on('data', (data) => { str += data })

  ctx.session = null
  ctx.body = "post session success"
})



server.use(async (ctx, next) => {
  const path = ctx.path
  const method = ctx.method
  ctx.body = `<span>Initial response</span> method:${method} path:${path}`
  // 要执行下一个中间件，要在中间件中执行  await next()
  await next()
})

server.use(router.routes())


server.listen(3000, () => {
  console.log('koa server listening on 3000')
})