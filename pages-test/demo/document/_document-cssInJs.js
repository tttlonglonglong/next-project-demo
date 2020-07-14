import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from 'styled-components'


function withLog(Comp) {
  return (props) => {
    console.log(props)
    return <Comp {...props} />
  }
}

// css in js的方案主要是呀解决在服务端渲染当中要去拿到某一个页面具体渲染的出来的css文本，然后加到header里面，去作为html的内容，返回给服务端

class MyDocument extends Document {


  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    console.log("ctx.renderPage", ctx.renderPage)

    try {

      ctx.renderPage = () =>
        originalRenderPage({
          // useful for wrapping the whole react tree
          // App:就是_app.js exoport 出来的 App
          // enhanceApp: (App) => withLog(App),
          enhanceApp: (App) => (props) =>
            // 拿到所有的style的代码
            sheet.collectStyles(<App {...props} />),
          // useful for wrapping in a per-page basis
          // Component 就是 page目录下定义的每一个js文件
          enhanceComponent: (Component) => withLog(Component),
        })


      const props = await Document.getInitialProps(ctx)

      // 高级的自定义方案，像styleComponent这样的css in js 的方案的时候
      // 通过ctx.renderPage 指定成一个新的方法，让它可以在初次渲染的时候，可以执行一些非常重要的东西
      // props.styles:内置的style产生的样式 + style-components产生的样式
      return {
        ...props,
        styles: (
          <>{props.styles}
            {
              // 返回一段collectStyles收集到的style对应到的代码
              sheet.getStyleElement()
            }</>
        )
      }

      // const html = renderToString(sheet.collectStyles(<YourApp />))
      // const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();
    } catch (error) {
      // handle error
      // console.error(error)
    } finally {
      sheet.seal()
    }


  }


  render() {
    return (
      <Html>
        <Head>
          {/* title不应该在这里定义 */}
          {/* <title>My App</title> */}
          <style>{`.test { color : red}`}</style>
        </Head>
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument