const github_base_url = "https://api.github.com"
const axios = require('axios')
const { requestGithub } = require('../lib/api')

module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    // 处理客户端与github 交互的请求
    if (path.startsWith('/github/')) {
      console.log('server-api-js', ctx.request.body)
      const session = ctx.session
      const githubAuth = session && session.githubAuth
      const headers = {}
      if (githubAuth && githubAuth.access_token) {
        headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
      }
      const result = await requestGithub(
        method,
        ctx.url.replace('/github/', '/'),
        ctx.request.body || {},
        headers
      ).catch(err => { console.log('requestGithub---请求失败', err) })
      ctx.status = result.status
      ctx.body = result.data
    } else {
      // 非 /github/ 的请求
      await next()
    }
  })
}

// module.exports = (server) => {
//   // 代理github请求的中间件
//   server.use(async (ctx, next) => {
//     const path = ctx.path
//     if (path.startsWith('/github/')) {
//       // 获取githubAuth 信息
//       const githubAuth = ctx.session.githubAuth
//       // ctx.path：只是请求路径
//       const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`
//       // 判断githubAuth里面是否又token
//       const token = githubAuth && githubAuth.access_token
//       let headers = {}
//       if (token) {
//         headers['Authorization'] = `${githubAuth.token_type} ${token}`
//       }
//       // 代理到了github请求，准备开始处理
//       console.log("代理到了github请求，准备开始处理")
//       try {
//         const result = await axios({
//           method: 'GET',
//           url: githubPath,
//           headers
//         })
//         // getaddrinfo ENOTFOUND api.github.comsearch
//         console.log('代理github请求返回的结果', "result.status", result.status, "result.data", result.data)
//         if (result.status === 200) {
//           ctx.body = result.data
//           ctx.set('Content-Type', 'application/json')
//         } else {
//           ctx.status = result.status
//           ctx.body = {
//             suscess: false
//           }

//           ctx.set('Content-Type', 'application/json')
//         }
//       } catch (err) {
//         ctx.body = {
//           suscess: false
//         }
//         ctx.set('Content-Type', 'application/json')
//         console.error(err)
//       }

//     } else {
//       await next()
//     }
//   })
// }