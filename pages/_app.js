// 用来覆盖nextjs默认的app组件的地方, 
// # Container 已废弃
import App, { Container } from 'next/app'
import Link from "next/link";
import Router from "next/router";
import { Provider } from "react-redux";
import testHoc from '../lib/width-redux'
import Layout from "../components/Layout";
import 'antd/dist/antd.css'
import PageLoading from '../components/PageLoading';
import axios from "axios";
// import store from "../store/store";

// 重写了app组件之后，要手动调用组件的 getInitialProps方法
class MyApp extends App {
    state = {
        loading: false
    }
    startLoading = () => {
        this.setState({
            loading: true
        })
    }
    stopLoading = () => {
        this.setState({
            loading: false
        })
    }
    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.startLoading)
    }
    componentWillUnMount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.startLoading)
    }
    // 相对于原生 getInitialProps ，多了一个 Component参数(页面对应的组件)
    // 推荐： getStaticProps 或 getServerSideProps
    static async getInitialProps(ctx) {
        const { Component } = ctx
        let pageProps
        if (Component.getInitialProps) {
            try {
                pageProps = await Component.getInitialProps(ctx)
            } catch (err) {
                console.log('_app.js_-_Component.getInitialProps', err)
            }

        }

        return {
            pageProps
        }
    }
    handleSearch = () => {
        const github = "https://api.github.com"
        axios.get(`/github/search/repositories?q=react`)
            .then(resp => { console.log("githubSearch", resp) })
            .catch(err => { console.log('axios.get', err) })
    }
    render() {
        // 每个页面都会作为Component传给APP组件
        const { Component, pageProps, reduxStore } = this.props
        return (
            <Provider store={reduxStore}>
                {this.state.loading ? <PageLoading /> : null}
                <Layout>
                    {/* <button onClick={this.handleSearch}>点击请求github---搜索数据</button> */}
                    {/* <Link href="/" ><a>Index</a></Link>
          <Link href="/detail" ><a>detail</a></Link> */}
                    <Component {...pageProps} />
                </Layout>
            </Provider >
        )
    }
}

// export default APP 默认的app组件
export default testHoc(MyApp)