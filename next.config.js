const webpack = require('webpack')
const widthCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const config = require('./config')
// const widthLess = require()

const configs = {
  // 编译文件的输出目录
  distDir: 'dest',
  // 是否给每个路由生成Etag，nextjs默认给每个页面都生成etag
  // 一般使用nginx，一般会关闭，生成会有一定的性能损耗
  generateEtags: true,
  // 本地开发时，页面内容的缓存配置；下一次渲染不使用服务端渲染的流程，直接返回内容
  onDemandEntries: {
    // 内容在内存中的缓存的时长(ms)
    maxInactiveAge: 25 * 1000,
    // 同时缓存多少个页面
    pagesBufferLength: 2,
  },
  // pages目录下哪些后缀名的文件会被认为是一个页面，而进行页面的编译
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  target: 'server',
  // 配置buildId：创建build的id，只有对同一个项目进行多节点的部署的时候，才会用到
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID
    }
    // 返回null使用默认unique id
    return null
  },
  // 手动修改webpack config,修改nextjs默认的webpack配置
  webpackl(config, options) {
    return config
  },
  // 修改webpackDevMiddware配置
  webpackDevMiddleware: config => {
    return config
  },
  // 可以在页面上通过 process.env.customKey 获取 value
  env: {
    customKey: 'value'
  },
  // 下面俩个要通过 ‘next/config’ 来读取
  // 只有在服务端渲染时才会获取位置,客户端渲染时无法读到
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSeret: process.env.SECOND_SECRET,
  },
  // 在服务端渲染和客户端渲染都可以获取的配置
  publicRuntimeConfig: {
    staticFolder: '/static',
  }
}

if (typeof require !== "undefined") {
  require.extensions['.css'] = file => { }
}

module.exports = withBundleAnalyzer(widthCss({
  env: {
    customKey: 'value'
  }, webpack(config) {
    // 忽略所有locale 相关的文件(moment相关优化 )
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    return config
  },
  publicRuntimeConfig: {
    GITUB_OAUTH_URL: config.GITUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL
  },
  // 生成打包分析报告
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilenameL: '../bundles/server.html'
    }
  }
  // distDir: 'dist',
  // webpack(config) {
  //   return config
  // }
}))
// module.exports = widthLess(widthCss({}))