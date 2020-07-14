
// 拓展app组件
export default (Comp) => {
  // return
  function TestHocComp({ Compnent, pageProps, ...rest }) {
    console.log('Compnent', Compnent, 'pageProps', pageProps)
    if (pageProps) {
      pageProps.test = '123'
    }

    return <Comp Compnent={Compnent} pageProps={pageProps} {...rest} />
  }
  TestHocComp.getInitialProps = Comp.getInitialProps
  return TestHocComp
}

