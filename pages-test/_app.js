// 用来覆盖nextjs默认的app组件的地方, 
// # Container 已废弃
import App, { Container } from 'next/app'
import { Provider } from "react-redux";
import testHoc from '../lib/width-redux'
import Layout from "../components/Layout";
import 'antd/dist/antd.css'
// import store from "../store/store";

// 重写了app组件之后，要手动调用组件的 getInitialProps方法
class MyApp extends App {
  state = {
    useInfo: {
      name: 1
    }
  }

  // 相对于原生 getInitialProps ，多了一个 Component参数(页面对应的组件)
  // 推荐： getStaticProps 或 getServerSideProps
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps
    }
  }
  render() {
    // 每个页面都会作为Component传给APP组件
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container >
        <h3>所有组件都被 APP包裹</h3>
        <Layout>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>

    )
  }
}

// export default APP 默认的app组件
export default testHoc(MyApp)