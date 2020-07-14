
import Link from 'next/link'
import Router from 'next/router'
import { Button } from "antd";



const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError', // err.cancelled
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})



export default () => {

  function gotoTestB() {
    // Router.push('/demo/url-path/b?id=1')
    // Router.push({
    //   pathname: '/demo/url-path/b',
    //   query: {
    //     id: 2
    //   }
    // })
    // link as
    Router.push({
      pathname: '/demo/url-path/b',
      query: {
        id: 2
      }
    }, "/test/b/2")
  }
  return (
    <div>
      <Link href="/a?id=1"><div>parent<div>childlren1</div><Button>Link</Button></div></Link>
      <Button onClick={() => { gotoTestB() }}>Router</Button>
      <Link href="/a?id=1" as="/a/1"><Button>Link as</Button></Link>
      <Link href="#aaaaaa" ><Button>Link hash</Button></Link>
    </div >
  )
}