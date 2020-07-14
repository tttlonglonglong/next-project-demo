import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {

  static async getInitialProps(ctx) {

    console.log("ctx.renderPage", ctx.renderPage)

    const initialProps = await Document.getInitialProps(ctx)
    // 高级的自定义方案，像styleComponent这样的css in js 的方案的时候
    // 通过ctx.renderPage 指定成一个新的方法，让它可以在初次渲染的时候，可以执行一些非常重要的东西
    return { ...initialProps }
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