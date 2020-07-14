// 处理在gitInitialProps中要去请求接口，既要在客户端执行，又要在服务端执行
const axios = require('axios')

const github_base_url = 'https://api.github.com'

async function requestGithub(method, url, data, headers) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
    headers
  })
}

const isServer = typeof window === "undefined"
async function request({ method = "GET", url, data = {}, headers }, req, res) {
  if (!url) {
    throw Error('url must provide')
  }
  console.log("isServer", typeof window, typeof window === "undefined")
  if (isServer) {
    // 服务端的请求要加 token头部字段
    const session = req.session
    const githubAuth = session.githubAuth || {}
    const headers = {}
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
    }
    console.log('api-util-url', url)
    return await requestGithub(method, url, data, headers)
  } else {
    // 客户端不直接请求github服务器，请求自己的koa服务
    // 客户端的请求:token 只在服务端添加，不在客户端暴露
    // url: /search/repos
    return await axios({
      method,
      url: `/github${url}`,
      data
    })
  }
}

module.exports = {
  request,
  requestGithub
}