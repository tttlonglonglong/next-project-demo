import createStore from "../store/store";
import { Component } from "react";

// 判断是否是服务端的情况
const isServer = typeof window === 'undefined'
const _NEXT_REUDX_STORE_ = '_NEXT_REUDX_STORE_'

// 客户端路由切换的时候，能够将store保存下来
function getOrCreateStore(initialState) {
  // 服务端渲染的时候，每次都去创建新的store
  if (isServer) {
    return createStore(initialState)
  }
  // 将客户端的store保存，客户端渲染的时候使用同一个store
  if (!window[_NEXT_REUDX_STORE_]) {
    window[_NEXT_REUDX_STORE_] = createStore(initialState)
  }
  return window[_NEXT_REUDX_STORE_]
}

export default (Comp) => {
  class WithReduxApp extends Component {
    // 这个store在客户端渲染的时候也能用，因为是存储在state上的
    constructor(props) {
      // 这里要调用super方法
      super(props)
      // constructor的时候，又去创建了一遍store，因为 getInitialProps 返回的内容会序列化成字符串，在页面拿到
      // getInitialProps在服务端渲染的时候，返回的对象最终会被序列化成一个字符串卸载html当中返回客户端，然后客户端再去读取这段字符串，然后转化成js对象，再去在客户端生成一个store
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }
    render() {
      const { Compnent, pageProps, ...rest } = this.props
      if (pageProps) {
        pageProps.test = '123'
      }

      return <Comp Compnent={Compnent} pageProps={pageProps} {...rest} reduxStore={this.reduxStore} />
    }
  }


  // 无论服务端渲染还是客户端渲染，都会执行
  // 在此方法中创建的变量，在执行完成后都会销毁；下一次执行的时候，又会重新创建
  // getInitialProps返回的内容，会序列化成字符串在页面上
  // getInitialProps 在每次页面切换的时候也会被调用
  // 所以在前端路由的时候，我们需要去保证整个应用只有一个store对象，而不是每次都创建一个新的store对象，所以放construct比较合适
  // 如果每次都创建store对象，那它每次都是初始化的状态，不是维持了更新记录的store；所以客户端的时候要在window上创建一个变量去保存store
  WithReduxApp.getInitialProps = async (ctx) => {

    let reduxStore

    if (isServer) {
      // 只有服务端渲染的时候，才会存在
      const { req } = ctx.ctx
      const session = req.session
      // console.log("session.userInfo", session.userInfo)
      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo
          // user: {
          //   name: 'jocky',
          //   age: 18
          // }
        })
      } else {
        reduxStore = getOrCreateStore()
      }
    } else {
      // 客户端的时候
      reduxStore = getOrCreateStore()
    }


    // 初始化store
    // const reduxStore = getOrCreateStore()

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }

    // 将store作为props返回
    return {
      ...appProps,
      // 这里不能直接返回一个reduxStore，reduxStore是一个store对象，里面会有很多方法，很难序列化成一个字符串，然后在客户端又反序列化出来
      // 这里选择序列化state
      initialReduxState: reduxStore.getState()
    }
  }
  return WithReduxApp
}