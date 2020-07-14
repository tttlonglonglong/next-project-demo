import { withRouter } from 'next/router.js'
import Head from 'next/head'
import styled from "styled-components"
import dynamic from "next/dynamic";

// 只有等到执行渲染的时候，才会被真正的加载
const Comp = dynamic(import('../components/Layout'))


// 这样moment 会直接打包进 a.js;如果moment在一半的js有用，另一半没有用，会把这个moment作为公共的依赖，去提取出去
// 每次页面初始化加载的时候都会把moment的代码加载进去，有一些页面加载moment是没有意义的
// 希望用到moment模块的时候才去加载
// import moment from "moment";

const Title = styled.h1`
  color: yellow;
  font-size:40px;
`

const color = '#6f6'
const A = withRouter((props) => {
  return <>
    <Title>This is Title {props.time}</Title>
    <Comp />
    <div>{`process env : ${process.env.customKey}`}</div>
    <a>test css in js : global css</a>
    <div className="user-name">a Page query params:{props.router.query.id}</div>
    <div>{`getInitialProps name: ${props.name}`}</div>
    <style jsx>{
      `.user-name {
        color: blue;
      }`
    }
    </style>
    <style jsx global>{`
      a{
        color: ${color}
      }
    `}</style>
  </>
})

// 服务端执行过，客户端不会在执行，react有hydrate的功能，可以复用服务端渲染返回回来的html，而不需要再去重新生成一次

A.getInitialProps = async (ctx) => {

  // webpack提供的异步加载的方法，执行到加载这一行代码的时候，才去加载moment
  // 使用这种方法加载的moment，没有加载export default的加载进来，而是将整个模块加载进来了
  // 使用的时候要加.default
  const moment = await import('moment')

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'jocky',
        // 1分钟之前
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      })
    })
    console.log('---------------')
  })

  return await promise

}




export default A